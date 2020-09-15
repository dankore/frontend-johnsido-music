import React, { useEffect, useContext } from 'react';
import { useParams, withRouter, Link } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import PropTypes from 'prop-types';
import Page from '../../components/layouts/Page';
import LoadingDotsAnimation from '../../components/shared/LoadingDotsAnimation';
import StateContext from '../../contextsProviders/StateContext';
import { followBtnCSS, stopFollowBtnCSS, linkCSS } from '../../helpers/CSSHelpers';

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

      try {
        (async function addFollow() {
          await Axios.post(
            `/addFollow/${state.user.profileUsername}`,
            { token: appState.user.token },
            {
              CancelToken: request.token,
            }
          );
          profileDispatch({ type: 'isLoadingFollow', value: false });
          profileDispatch({ type: 'addFollow' });
        })();
      } catch (error) {
        // FAIL SILENTLY
        console.log(error);
      }

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
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span className="w-full h-full absolute opacity-50 bg-black"></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
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
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="Profile avatar"
                        src={state.user.profileAvatar}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                        style={{ maxWidth: '150px' }}
                      />
                    </div>
                  </div>
                  {/* FOLLOW BUTTON */}
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="flex justify-center lg:justify-end py-6 px-3 mt-32 lg:mt-0">
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
                                <i className="fa text-sm fa-spinner fa-spin"></i>{' '}
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
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <Link
                          to={`/profile/${state.user.profileUsername}/followers`}
                          className={`text-sm text-gray-500 ${linkCSS}`}
                        >
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            {state.user.counts.followerCount}
                          </span>
                          {state.user.counts.followerCount > 1 ? 'Followers' : 'Follower'}
                        </Link>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <Link
                          to={`/profile/${state.user.profileUsername}/following`}
                          className={`text-sm text-gray-500 ${linkCSS}`}
                        >
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            {state.user.counts.followingCount}
                          </span>
                          Following
                        </Link>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <Link
                          to={`/profile/${state.user.profileUsername}/songs`}
                          className={`text-sm text-gray-500 ${linkCSS}`}
                        >
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            89
                          </span>
                          Songs
                        </Link>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <Link
                          to={`/profile/${state.user.profileUsername}/comments`}
                          className={`text-sm text-gray-500 ${linkCSS}`}
                        >
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            {state.user.counts.commentsCount}
                          </span>
                          Comments
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal text-gray-800">
                    {state.user.profileFirstName} {state.user.profileLastName}
                  </h3>
                  <p className="mb-2">@{state.user.profileUsername}</p>
                  <div className="flex justify-center items-center text-sm leading-normal text-gray-500 font-bold uppercase">
                    {state.user.profileAbout.city && (
                      <div className="mr-5">
                        <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>
                        {state.user.profileAbout.city}
                      </div>
                    )}

                    {state.user.profileAbout.musicCategory && (
                      <div className="">
                        <i className="fas fa-music mr-2 text-lg text-gray-500"></i>
                        {state.user.profileAbout.musicCategory}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                        {state.user.profileAbout.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Page>
  );
}

ProfilePage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ProfilePage);
