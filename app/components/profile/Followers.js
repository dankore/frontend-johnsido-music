import React, { useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import LoadingDotsAnimation from '../shared/LoadingDotsAnimation';
import FollowPageHeader from './FollowPageHeader';
import Page from '../layouts/Page';
import StateContext from '../../contextsProviders/StateContext';

function Followers() {
  const appState = useContext(StateContext);
  const initialState = {
    username: useParams().username,
    profileUser: {},
    followers: [],
    isFetchingProfileData: false,
    isFetchingFollowers: false,
  };

  function followReducer(draft, action) {
    switch (action.type) {
      case 'fetchVisistedProfileInfo':
        draft.profileUser = action.value;
        return;
      case 'fetchVisistedProfileFollowers':
        draft.followers = action.value;
        return;
      case 'isFetchingProfileData':
        if (action.process == 'starts') {
          draft.isFetchingProfileData = true;
        } else {
          draft.isFetchingProfileData = false;
        }
        return;
      case 'isFetchingFollowers':
        if (action.process == 'starts') {
          draft.isFetchingFollowers = true;
        } else {
          draft.isFetchingFollowers = false;
        }
        return;
    }
  }

  const [state, followDispatch] = useImmerReducer(followReducer, initialState);

  // FETCH VISISTED PROFILE INFO
  useEffect(() => {
    const request = Axios.CancelToken.source();

    try {
      followDispatch({ type: 'isFetchingProfileData', process: 'starts' });
      (async function fetchProfileInfo() {
        const response = await Axios.post(`/profile/${state.username}`, {
          CancelToken: request.token,
        });

        followDispatch({ type: 'isFetchingProfileData' });

        console.log(response.data);

        if (response.data) {
          followDispatch({ type: 'fetchVisistedProfileInfo', value: response.data });
        } else {
          // FAIL SILENTLY
          history.push('/404');
        }
      })();
    } catch (error) {
      console.log(error);
    }

    return () => request.cancel();
  }, [state.username]);

  // FETCH FOLLOWERS
  useEffect(() => {
    const request = Axios.CancelToken.source();

    try {
      followDispatch({ type: 'isFetchingFollowers', process: 'starts' });
      (async function fetchFollowers() {
        const response = await Axios.post(
          `/profile/${state.username}/followers`,
          { loggedInUserId: appState.user._id },
          {
            CancelToken: request.token,
          }
        );

        followDispatch({ type: 'isFetchingFollowers' });
        console.log({ followers: response.data.followers });

        if (response.data.status) {
          followDispatch({ type: 'fetchVisistedProfileFollowers', value: response.data.followers });
        } else {
          // FAIL SILENTLY
          console.log(response.data);
        }
      })();
    } catch (error) {
      console.log(error);
    }

    return () => request.cancel();
  }, [state.username]);

  if (state.isFetchingProfileData || state.isFetchingFollowers) {
    return <LoadingDotsAnimation />;
  }

  return (
    <Page title="people following">
      <div className="w-full sm:max-w-lg lg:max-w-xl mx-auto bg-yellow-300">
        <FollowPageHeader profileUser={state.profileUser} />
        {state.followers.map((follower, index) => {
          return (
            <div key={index} className=" block relative border bg-white p-2">
              <div className="flex">
                <div className="flex mr-1">
                  <Link to={`/profile/${follower.author.username}`}>
                    <img
                      src={follower.author.avatar}
                      className="w-8 h-8 rounded-full"
                      alt="profile pic"
                    />
                  </Link>
                </div>
                <div
                  className="w-full px-2"
                  style={{
                    overflowWrap: 'break-word',
                    minWidth: 0 + 'px',
                    backgroundColor: '#F2F3F5',
                  }}
                >
                  <div className="flex justify-between">
                    <Link to={`/profile/${follower.author.username}`} className="font-medium">
                      {follower.author.firstName} {follower.author.lastName}
                    </Link>
                    <button>Follow</button>
                  </div>
                  <p>@{follower.author.username}</p>
                  <p>{follower.author.about.bio}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Page>
  );
}

export default Followers;
