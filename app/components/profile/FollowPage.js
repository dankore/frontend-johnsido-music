import React, { useEffect } from 'react';
import Axios from 'axios';
import { useImmerReducer } from 'use-immer';
import { useParams, NavLink, Switch, Route, withRouter } from 'react-router-dom';
import Page from '../layouts/Page';
import PropTypes from 'prop-types';
import Followers from './Followers';
import LoadingDotsAnimation from '../shared/LoadingDotsAnimation';

function FollowPage({ history }) {
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
        const response = await Axios.post(`/profile/${state.username}/followers`, {
          CancelToken: request.token,
        });

        followDispatch({ type: 'isFetchingFollowers' });
        console.log(response.data.followers);

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
    <div>
      <div className="max-w-4xl mx-auto">
        <ul className="flex justify-between bg-gray-200 p-3">
          <li>
            <NavLink exact to={`/profile/${state.profileUser.profileUsername}/followers`}>
              Followers
            </NavLink>
          </li>

          <li>
            <NavLink to={`/profile/${state.profileUser.profileUsername}/following`}>
              Following
            </NavLink>
          </li>
        </ul>
        <Page title="Follow Page">
          <Switch>
            <Route exact path="/profile/:username/followers">
              {/* <Page title="Followers"> */}
              <Followers followers={state.followers} />
              {/* </Page> */}
            </Route>
          </Switch>
        </Page>
      </div>
    </div>
  );
}

FollowPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(FollowPage);
