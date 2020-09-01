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
    startFollowing: {
      id: '',
      username: '',
      count: 0,
    },
    stopFollowing: {
      id: '',
      username: '',
      count: 0,
    },
    isLoadingFollow: false,
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
      case 'startFollowing':
        draft.startFollowing.id = action.value.id;
        draft.startFollowing.username = action.value.username;
        draft.startFollowing.count++;
        return;
      case 'stopFollowing':
        draft.stopFollowing.username = action.value.username;
        draft.stopFollowing.id = action.value.id;
        draft.stopFollowing.count++;
        return;
      case 'updateFollowState': {
        const index = draft.followers.map(follower => follower._id).indexOf(action.value);

        if (action.process == 'add') {
          draft.followers[index].loggedInUserFollowsVisited = true;
        } else {
          draft.followers[index].loggedInUserFollowsVisited = false;
        }

        return;
      }
      case 'isLoadingFollow':
        draft.isLoadingFollow = action.value;
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

  // ADD FOLLOW
  useEffect(() => {
    if (state.startFollowing.count) {
      followDispatch({ type: 'isLoadingFollow', value: true });
      const request = Axios.CancelToken.source();

      try {
        (async function addFollow() {
          await Axios.post(
            `/addFollow/${state.startFollowing.username}`,
            { token: appState.user.token },
            {
              CancelToken: request.token,
            }
          );

          followDispatch({ type: 'isLoadingFollow', value: false });

          followDispatch({
            type: 'updateFollowState',
            value: state.startFollowing.id,
            process: 'add',
          });
        })();
      } catch (error) {
        // FAIL SILENTLY
        console.log(error);
      }

      return () => request.cancel();
    }
  }, [state.startFollowing.count]);

  // REMOVE FOLLOW
  useEffect(() => {
    if (state.stopFollowing.count) {
      followDispatch({ type: 'isLoadingFollow', value: true });
      const request = Axios.CancelToken.source();

      (async function stopFollowing() {
        try {
          await Axios.post(
            `/stopFollowing/${state.stopFollowing.username}`,
            { token: appState.user.token },
            { cancelToken: request.token }
          );

          followDispatch({ type: 'isLoadingFollow', value: false });

          followDispatch({ type: 'updateFollowState', value: state.stopFollowing.id });
        } catch (error) {
          // FAIL SILENTLY
          console.log(error);
        }
      })();

      return () => request.cancel();
    }
  }, [state.stopFollowing.count]);

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
                  <div className="flex justify-between items-center">
                    <div>
                      <Link to={`/profile/${follower.author.username}`} className="font-medium">
                        {follower.author.firstName} {follower.author.lastName}
                      </Link>
                      <div className="flex flex-wrap items-center text-sm">
                        <p className="mr-2">@{follower.author.username}</p>
                        {appState.loggedIn && follower.visitedUserFollowslogged && (
                          <p className="text-pink-500 font-semibold italic p-1">Follows you</p>
                        )}
                      </div>
                    </div>

                    {appState.loggedIn &&
                      follower.loggedInUserFollowsVisited &&
                      follower.author.username != '' && (
                        <button
                          className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-3 py-1 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                          type="button"
                          style={{ transition: 'all .15s ease' }}
                          onClick={() =>
                            followDispatch({
                              type: 'stopFollowing',
                              value: {
                                id: follower._id,
                                username: follower.author.username,
                              },
                            })
                          }
                        >
                          {state.isLoadingFollow ? (
                            <div className="flex items-center">
                              <i className="fa text-2xl fa-spinner fa-spin"></i>{' '}
                              <spa className="ml-2">Unfollowing...</spa>
                            </div>
                          ) : (
                            'Stop Following'
                          )}
                        </button>
                      )}
                    {appState.loggedIn &&
                      appState.user.username != follower.author.username &&
                      !follower.loggedInUserFollowsVisited &&
                      follower.author.username != '' && (
                        <button
                          className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                          type="button"
                          style={{ transition: 'all .15s ease' }}
                          onClick={() =>
                            followDispatch({
                              type: 'startFollowing',
                              value: {
                                id: follower._id,
                                username: follower.author.username,
                              },
                            })
                          }
                        >
                          {state.isLoadingFollow ? (
                            <div className="flex items-center">
                              <i className="fa text-2xl fa-spinner fa-spin"></i>{' '}
                              <spa className="ml-2">Following..</spa>
                            </div>
                          ) : (
                            'Follow'
                          )}
                        </button>
                      )}
                  </div>
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
