import React, { useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import LoadingDotsAnimation from '../shared/LoadingDotsAnimation';
import FollowPageHeader from './FollowPageHeader';
import Page from '../layouts/Page';
import StateContext from '../../contextsProviders/StateContext';
import PropTypes from 'prop-types';
import { followBtnCSS, stopFollowBtnCSS } from '../../helpers/CSSHelpers';

function Followers({ history }) {
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
        draft.startFollowing.isLoading = action.value.username;
        return;
      case 'stopFollowing':
        draft.stopFollowing.username = action.value.username;
        draft.stopFollowing.id = action.value.id;
        draft.stopFollowing.count++;
        draft.stopFollowing.isLoading = action.value.username;
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

  if (state.isFetchingProfileData || state.isFetchingFollowers) {
    return <LoadingDotsAnimation />;
  }

  return (
    <Page
      title={`People following ${state.profileUser.profileFirstName} ${state.profileUser.profileLastName}`}
    >
      <div className="w-full sm:max-w-lg lg:max-w-xl mx-auto">
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
                    <Link to={`/profile/${follower.author.username}`}>
                      <p className="font-medium">
                        {follower.author.firstName} {follower.author.lastName}
                      </p>
                      <div className="flex flex-wrap items-center text-sm">
                        <p className="mr-2">@{follower.author.username}</p>
                        {appState.loggedIn && follower.visitedUserFollowslogged && (
                          <p className="js-brown font-semibold italic p-1">Follows you</p>
                        )}
                      </div>
                    </Link>
                    {/* FOLLOW BUTTON */}
                    {appState.loggedIn &&
                      appState.user.username != follower.author.username &&
                      !follower.loggedInUserFollowsVisited &&
                      follower.author.username != '' && (
                        <button
                          className={followBtnCSS}
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
                          {state.startFollowing.isLoading == follower.author.username ? (
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
                      follower.loggedInUserFollowsVisited &&
                      follower.author.username != '' && (
                        <button
                          className={stopFollowBtnCSS}
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
                          {state.stopFollowing.isLoading == follower.author.username ? (
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
                  <Link to={`/profile/${follower.author.username}`}>
                    <p>{follower.author.about.bio}</p>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Page>
  );
}

Followers.propTypes = {
  history: PropTypes.object,
};

export default Followers;
