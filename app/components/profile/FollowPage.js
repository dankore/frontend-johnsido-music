import React, { useEffect } from 'react';
import Axios from 'axios';
import { useImmerReducer } from 'use-immer';
import { useParams, withRouter, Link } from 'react-router-dom';
import Page from '../layouts/Page';
import PropTypes from 'prop-types';
import LoadingDotsAnimation from '../shared/LoadingDotsAnimation';

function FollowPage({ history }) {
  const initialState = {
    username: useParams().username,
    profileUser: {},
    isFetchingProfileData: false,
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

  if (state.isFetchingProfileData) {
    return <LoadingDotsAnimation />;
  }

  return (
    <Page title="Follow Page">
      <div className="max-w-4xl mx-auto">
        <ul className="flex justify-between bg-gray-200 p-3">
          <li>
            <Link exact to={`/profile/${state.profileUser.profileUsername}/followers`}>
              Followers
            </Link>
          </li>

          <li>
            <Link to={`/profile/${state.profileUser.profileUsername}/following`}>Following</Link>
          </li>
        </ul>
      </div>
    </Page>
  );
}

FollowPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(FollowPage);
