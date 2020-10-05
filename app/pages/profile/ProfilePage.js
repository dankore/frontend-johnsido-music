import React, { useEffect, useContext } from 'react';
import { useParams, withRouter, Link } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import PropTypes from 'prop-types';
import Page from '../../components/layouts/Page';
import LoadingDotsAnimation from '../../components/shared/LoadingDotsAnimation';
import StateContext from '../../contextsProviders/StateContext';
import { followBtnCSS, stopFollowBtnCSS, linkCSS } from '../../helpers/CSSHelpers';
import UserNotActive from '../../components/shared/UserNotActive';

function ProfilePage({ history }) {
  const appState = useContext(StateContext);
  const { username } = useParams();
  const initialState = {
    user: {
      profileUsername: '...',
      profileFirstName: '...',
      profileLastName: '...',
      profileAvatar: '',
      profileEmail: '',
      profileAbout: { bio: '', musicCategory: '', city: '' },
      isFollowing: false,
      counts: {
        followerCount: 0,
        followingCount: 0,
        commentsCount: 0,
      },
    },
    networkError: {
      hasError: false,
      message: '',
    },
    isFetching: false,
    startFollowingCount: 0,
    stopFollowingCount: 0,
    isLoadingFollow: false,
  };

  function profileReducer(draft, action) {
    switch (action.type) {
      case 'addProfileUserInfo':
        draft.user = action.value;
        return;
      case 'isFetchingStarts':
        draft.isFetching = true;
        return;
      case 'isFetchingEnds':
        draft.isFetching = false;
        return;
      case 'startFollowing':
        draft.startFollowingCount++;
        return;
      case 'stopFollowing':
        draft.stopFollowingCount++;
        return;
      case 'addFollow':
        draft.user.isFollowing = true;
        draft.user.counts.followerCount++;
        return;
      case 'removeFollow':
        draft.user.isFollowing = false;
        draft.user.counts.followerCount--;
        return;
      case 'isLoadingFollow':
        draft.isLoadingFollow = action.value;
        return;
      case 'networkError':
        draft.networkError.hasError = true;
        draft.networkError.message = 'Network error';
        return;
    }
  }

  const [state, profileDispatch] = useImmerReducer(profileReducer, initialState);

  // FETCH PROFILE DATA
  useEffect(() => {
    const request = Axios.CancelToken.source();
    profileDispatch({ type: 'isFetchingStarts' });
    try {
      (async function getProfileInfo() {
        const response = await Axios.post(
          `/profile/${username}`,
          { token: appState.user.token },
          {
            CancelToken: request.token,
          }
        );

        profileDispatch({ type: 'isFetchingEnds' });

        if (response.data) {
          profileDispatch({ type: 'addProfileUserInfo', value: response.data });
        } else {
          history.push('/404');
        }
      })();
    } catch (error) {
      // FAIL SILENTLY
      profileDispatch({ type: 'networkError' });
    }
    return () => request.cancel();
  }, [username]);

  // ADD FOLLOW
  useEffect(() => {
    if (state.startFollowingCount) {
      profileDispatch({ type: 'isLoadingFollow', value: true });
      const request = Axios.CancelToken.source();

      (async function addFollow() {
        try {
          await Axios.post(
            `/addFollow/${state.user.profileUsername}`,
            { token: appState.user.token },
            {
              CancelToken: request.token,
            }
          );
          profileDispatch({ type: 'isLoadingFollow', value: false });
          profileDispatch({ type: 'addFollow' });
        } catch (error) {
          // FAIL SILENTLY
          console.log(error);
        }
      })();

      return () => request.cancel();
    }
  }, [state.startFollowingCount]);

  // REMOVE FOLLOW
  useEffect(() => {
    if (state.stopFollowingCount) {
      profileDispatch({ type: 'isLoadingFollow', value: true });
      const request = Axios.CancelToken.source();

      (async function stopFollowing() {
        try {
          await Axios.post(
            `/stopFollowing/${state.user.profileUsername}`,
            { token: appState.user.token },
            { cancelToken: request.token }
          );

          profileDispatch({ type: 'isLoadingFollow', value: false });
          profileDispatch({ type: 'removeFollow' });
        } catch (error) {
          // FAIL SILENTLY
          console.log(error);
        }
      })();

      return () => request.cancel();
    }
  }, [state.stopFollowingCount]);

  if (state.isFetching) {
    return <LoadingDotsAnimation />;
  }

  return (
    <Page title={`${state.user.profileFirstName} ${state.user.profileLastName}'s profile`}>
      <main className="profile-page">
        {state.networkError.hasError && <div>{state.networkError.message}</div>}
        <section className="relative block" style={{ height: '500px' }}>
          <div
            className="absolute top-0 w-full h-full bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span className="absolute w-full h-full bg-black opacity-50"></span>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 top-auto w-full overflow-hidden pointer-events-none"
            style={{ height: '70px', transform: 'translateZ(0)' }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-gray-300">
          {/* USER IS ACTIVE */}
          {state.user.profileActive && (
            <div className="container px-4 mx-auto">
              <div className="relative flex flex-col w-full min-w-0 mb-6 -mt-64 break-words bg-white rounded-lg shadow-xl">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    {/* IMAGE */}
                    <div className="flex justify-center w-full px-4 lg:w-3/12 lg:order-2">
                      <div className="relative">
                        <img
                          alt="Profile avatar"
                          src={state.user.profileAvatar}
                          className="absolute h-auto -m-16 -ml-20 align-middle border-none rounded-full shadow-xl lg:-ml-16"
                          style={{ maxWidth: '150px' }}
                        />
                      </div>
                    </div>
                    {/* FOLLOW BUTTON */}
                    <div className="w-full px-4 lg:w-4/12 lg:order-3 lg:text-right lg:self-center">
                      <div className="flex justify-center px-3 py-6 mt-32 lg:justify-end lg:mt-0">
                        {appState.loggedIn &&
                          appState.user.username != state.user.profileUsername &&
                          !state.user.isFollowing &&
                          state.user.profileUsername != '' && (
                            <button
                              className={followBtnCSS}
                              type="button"
                              style={{ transition: 'all .15s ease' }}
                              onClick={() => profileDispatch({ type: 'startFollowing' })}
                            >
                              {state.isLoadingFollow ? (
                                <div className="flex items-center justify-center">
                                  <i className="text-sm fa fa-spinner fa-spin"></i>{' '}
                                </div>
                              ) : (
                                <span>
                                  Follow <i className="fas fa-user-plus"></i>
                                </span>
                              )}
                            </button>
                          )}
                        {appState.loggedIn &&
                          appState.user.username != state.user.profileusername &&
                          state.user.isFollowing &&
                          state.user.profileusername != '' && (
                            <button
                              className={stopFollowBtnCSS}
                              type="button"
                              style={{ transition: 'all .15s ease' }}
                              onClick={() => profileDispatch({ type: 'stopFollowing' })}
                            >
                              {state.isLoadingFollow ? (
                                <div className="flex items-center justify-center">
                                  <i className="text-sm fa fa-spinner fa-spin"></i>{' '}
                                </div>
                              ) : (
                                <span>
                                  Unfollow <i className="fas fa-user-times"></i>
                                </span>
                              )}
                            </button>
                          )}
                      </div>
                    </div>
                    {/* LINKS */}
                    <div className="w-full px-4 lg:w-4/12 lg:order-1">
                      <div className="flex justify-center py-4 pt-8 lg:pt-4">
                        <div className="p-3 mr-4 text-center">
                          <Link
                            to={`/profile/${state.user.profileUsername}/followers`}
                            className={`text-sm text-gray-500 ${linkCSS}`}
                          >
                            <span className="block text-xl font-bold tracking-wide text-gray-700 uppercase">
                              {state.user.counts.followerCount}
                            </span>
                            {state.user.counts.followerCount > 1 ? 'Followers' : 'Follower'}
                          </Link>
                        </div>
                        <div className="p-3 mr-4 text-center">
                          <Link
                            to={`/profile/${state.user.profileUsername}/following`}
                            className={`text-sm text-gray-500 ${linkCSS}`}
                          >
                            <span className="block text-xl font-bold tracking-wide text-gray-700 uppercase">
                              {state.user.counts.followingCount}
                            </span>
                            Following
                          </Link>
                        </div>
                        <div className="p-3 text-center lg:mr-4">
                          <Link
                            to={`/profile/${state.user.profileUsername}/songs`}
                            className={`text-sm text-gray-500 ${linkCSS}`}
                          >
                            <span className="block text-xl font-bold tracking-wide text-gray-700 uppercase">
                              89
                            </span>
                            Songs
                          </Link>
                        </div>
                        <div className="p-3 text-center lg:mr-4">
                          <Link
                            to={`/profile/${state.user.profileUsername}/comments`}
                            className={`text-sm text-gray-500 ${linkCSS}`}
                          >
                            <span className="block text-xl font-bold tracking-wide text-gray-700 uppercase">
                              {state.user.counts.commentsCount}
                            </span>
                            {state.user.counts.commentsCount > 1 ? 'Comments' : 'Comment'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 text-center">
                    <h3 className="text-4xl font-semibold leading-normal text-gray-800">
                      {state.user.profileFirstName} {state.user.profileLastName}
                    </h3>
                    <p className="mb-2">@{state.user.profileUsername}</p>
                    <div className="flex items-center justify-center text-sm font-bold leading-normal text-gray-500 uppercase">
                      {state.user.profileAbout.city && (
                        <div className="mr-5">
                          <i className="mr-2 text-lg text-gray-500 fas fa-map-marker-alt"></i>
                          {state.user.profileAbout.city}
                        </div>
                      )}

                      {state.user.profileAbout.musicCategory && (
                        <div className="">
                          <i className="mr-2 text-lg text-gray-500 fas fa-music"></i>
                          {state.user.profileAbout.musicCategory}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="py-10 mt-10 text-center border-t border-gray-300">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full px-4 lg:w-9/12">
                        <p className="mb-4 text-lg leading-relaxed text-gray-800">
                          {state.user.profileAbout.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* USER IS NOT ACTIVE */}
          {!state.user.profileActive && <UserNotActive user={state.user} />}
        </section>
      </main>
    </Page>
  );
}

ProfilePage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ProfilePage);
