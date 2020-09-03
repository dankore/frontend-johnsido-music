import React, { useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import LoadingDotsAnimation from '../shared/LoadingDotsAnimation';
import FollowPageHeader from './FollowPageHeader';
import Page from '../layouts/Page';
import StateContext from '../../contextsProviders/StateContext';
import PropTypes from 'prop-types';
import { followBtnCSS, stopFollowBtnCSS, linkCSS } from '../../helpers/CSSHelpers';

function FollowTemplate({ history, type }) {
  const appState = useContext(StateContext);
  const initialState = {
    username: useParams().username,
    profileUser: {},
    follows: [], // FOLLOWERS OR FOLLWOING
    isFetchingProfileData: false,
    isFetchingFollows: false,
    startFollowing: {
      id: '',
      username: '',
      count: 0,
      isLoading: '',
    },
    stopFollowing: {
      id: '',
      username: '',
      count: 0,
      isLoading: '',
    },
  };

  function followReducer(draft, action) {
    switch (action.type) {
      case 'fetchVisistedProfileInfo':
        draft.profileUser = action.value;
        return;
      case 'fetchVisistedProfileFollows':
        draft.follows = action.value;
        return;
      case 'isFetchingProfileData':
        if (action.process == 'starts') {
          draft.isFetchingProfileData = true;
        } else {
          draft.isFetchingProfileData = false;
        }
        return;
      case 'isFetchingFollows':
        if (action.process == 'starts') {
          draft.isFetchingFollows = true;
        } else {
          draft.isFetchingFollows = false;
        }
        return;
      case 'startFollowing':
        draft.startFollowing.id = action.value.id;
        draft.startFollowing.username = action.value.username;
        draft.startFollowing.count++;
        draft.startFollowing.isLoading = action.value.username;
        return;
      case 'stopFollowing':
        draft.stopFollowing.username = action.value.username;
        draft.stopFollowing.id = action.value.id;
        draft.stopFollowing.count++;
        draft.stopFollowing.isLoading = action.value.username;
        return;
      case 'updateFollowState': {
        const index = draft.follows.map(follower => follower._id).indexOf(action.value);

        if (action.process == 'add') {
          draft.follows[index].loggedInUserFollowsVisited = true;
        } else {
          draft.follows[index].loggedInUserFollowsVisited = false;
        }

        return;
      }
      case 'stopLoadingFollow':
        if (action.process == 'add') {
          draft.startFollowing.isLoading = '';
        }

        if (action.process == 'remove') {
          draft.stopFollowing.isLoading = '';
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
    const param = type == 'followers' ? 'followers' : 'following';

    try {
      followDispatch({ type: 'isFetchingFollows', process: 'starts' });
      (async function fetchFollows() {
        const response = await Axios.post(
          `/profile/${state.username}/${param}`,
          { loggedInUserId: appState.user._id },
          {
            CancelToken: request.token,
          }
        );

        followDispatch({ type: 'isFetchingFollows' });

        if (response.data.status) {
          followDispatch({ type: 'fetchVisistedProfileFollows', value: response.data.follows });
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

          followDispatch({ type: 'stopLoadingFollow', process: 'add' });

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
      const request = Axios.CancelToken.source();

      (async function stopFollowing() {
        try {
          await Axios.post(
            `/stopFollowing/${state.stopFollowing.username}`,
            { token: appState.user.token },
            { cancelToken: request.token }
          );

          followDispatch({ type: 'stopLoadingFollow', process: 'remove' });

          followDispatch({ type: 'updateFollowState', value: state.stopFollowing.id });
        } catch (error) {
          // FAIL SILENTLY
          console.log(error);
        }
      })();

      return () => request.cancel();
    }
  }, [state.stopFollowing.count]);

  function noFollow() {
    return state.follows.length < 1 && type == 'followers' ? (
      appState.user.username == state.profileUser.profileUsername ? (
        <span className="block text-center">You don&apos;t have followers yet.</span>
      ) : (
        <span className="block text-center">
          {' '}
          {state.profileUser.profileFirstName} {state.profileUser.profileLastName} does not have
          followers yet.
        </span>
      )
    ) : appState.user.username == state.profileUser.profileUsername ? (
      <span className="block text-center">You are not following anyone.</span>
    ) : (
      <span className="block text-center">
        {' '}
        <span className="block text-center">
          {state.profileUser.profileFirstName} {state.profileUser.profileLastName} is not following
          anyone.
        </span>
      </span>
    );
  }

  if (state.isFetchingProfileData || state.isFetchingFollows) {
    return <LoadingDotsAnimation />;
  }

  const title =
    type == 'followers'
      ? `People following ${state.profileUser.profileFirstName || '..'} ${
          state.profileUser.profileLastName || '..'
        }`
      : `People followed by ${state.profileUser.profileFirstName || '..'} ${
          state.profileUser.profileLastName || '..'
        }`;

  return (
    <Page title={title}>
      <div className="w-full sm:max-w-lg lg:max-w-xl mx-auto">
        <FollowPageHeader profileUser={state.profileUser} />
        {state.follows.length > 0 &&
          state.follows.map((follow, index) => {
            return (
              <div key={index} className="block relative border bg-white p-2">
                <div className="flex">
                  <Link
                    className={`flex mr-1 ${linkCSS}`}
                    to={`/profile/${follow.author.username}`}
                  >
                    <img
                      src={follow.author.avatar}
                      className="w-8 h-8 rounded-full"
                      alt="profile pic"
                    />
                  </Link>
                  <div
                    className="w-full px-2"
                    style={{
                      overflowWrap: 'break-word',
                      minWidth: 0 + 'px',
                      backgroundColor: '#fff',
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <Link className={linkCSS} to={`/profile/${follow.author.username}`}>
                        <p className="font-medium">
                          {follow.author.firstName} {follow.author.lastName}
                        </p>
                        <div className="flex flex-wrap items-center text-sm">
                          <p className="mr-2">@{follow.author.username}</p>
                          {appState.loggedIn && follow.visitedUserFollowslogged && (
                            <p className="text-green-600 bg-green-100 italic px-1">Follows you</p>
                          )}
                        </div>
                      </Link>
                      {/* FOLLOW BUTTON */}
                      {appState.loggedIn &&
                        appState.user.username != follow.author.username &&
                        !follow.loggedInUserFollowsVisited &&
                        follow.author.username != '' && (
                          <button
                            className={followBtnCSS}
                            type="button"
                            style={{ transition: 'all .15s ease' }}
                            onClick={() =>
                              followDispatch({
                                type: 'startFollowing',
                                value: {
                                  id: follow._id,
                                  username: follow.author.username,
                                },
                              })
                            }
                          >
                            {state.startFollowing.isLoading == follow.author.username ? (
                              <div className="flex items-center justify-center">
                                <i className="fa text-sm fa-spinner fa-spin"></i>{' '}
                              </div>
                            ) : (
                              <span>
                                Follow <i className="fas fa-user-plus"></i>
                              </span>
                            )}
                          </button>
                        )}

                      {appState.loggedIn &&
                        follow.loggedInUserFollowsVisited &&
                        follow.author.username != '' && (
                          <button
                            className={stopFollowBtnCSS}
                            type="button"
                            style={{ transition: 'all .15s ease' }}
                            onClick={() =>
                              followDispatch({
                                type: 'stopFollowing',
                                value: {
                                  id: follow._id,
                                  username: follow.author.username,
                                },
                              })
                            }
                          >
                            {state.stopFollowing.isLoading == follow.author.username ? (
                              <div className="flex items-center justify-center">
                                <i className="fa text-sm fa-spinner fa-spin"></i>{' '}
                              </div>
                            ) : (
                              <span>
                                Stop Following <i className="fas fa-user-times"></i>
                              </span>
                            )}
                          </button>
                        )}
                    </div>
                    <Link className={linkCSS} to={`/profile/${follow.author.username}`}>
                      <p>{follow.author.about.bio}</p>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        {/* NO FOLLOWS */}
        {noFollow()}
      </div>
    </Page>
  );
}

FollowTemplate.propTypes = {
  history: PropTypes.object,
  type: PropTypes.string.isRequired,
};

export default FollowTemplate;
