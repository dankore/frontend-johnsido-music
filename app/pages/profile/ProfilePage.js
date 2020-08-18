import React, { useEffect } from 'react';
import { useParams, withRouter, Link } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import PropTypes from 'prop-types';
import Page from '../../components/layouts/Page';
import LoadingDotsAnimation from '../../components/shared/LoadingDotsAnimation';

function ProfilePage({ history }) {
  const initialState = {
    user: {
      profileUsername: '',
      profileFirstName: '',
      profileLastName: '',
      profileAvatar: '',
      profileEmail: '',
      profileAbout: { bio: '', musicCategory: '', city: '' },
      isFollowing: false,
      counts: {
        followerCount: 0,
      },
    },
    username: useParams().username,
    isFetching: false,
    startFollowingCount: 0,
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
      case 'addFollow':
        draft.user.isFollowing = true;
        draft.user.counts.followerCount++;
        return;
    }
  }

  const [state, profileDispatch] = useImmerReducer(profileReducer, initialState);

  useEffect(() => {
    const request = Axios.CancelToken.source();
    profileDispatch({ type: 'isFetchingStarts' });

    (async function getProfileInfo() {
      const response = await Axios.post(`/profile/${state.username}`, {
        CancelToken: request.token,
      });

      profileDispatch({ type: 'isFetchingEnds' });

      if (response.data) {
        profileDispatch({ type: 'addProfileUserInfo', value: response.data });
      } else {
        history.push('/404');
      }
    })();
    return () => request.cancel();
  }, [state.username]);

  useEffect(() => {
    if (state.startFollowingCount) {
      const request = Axios.CancelToken.source();

      (async function addFollow() {
        const response = await Axios.post(`/addFollow/${state.user.profileUsername}`, {
          CancelToken: request.token,
        });
        profileDispatch({ type: 'addFollow', value: response.data });
      })();

      return () => request.cancel();
    }
  }, [state.startFollowingCount]);

  if (state.isFetching) {
    return <LoadingDotsAnimation />;
  }

  const background =
    'https://res.cloudinary.com/my-nigerian-projects/image/upload/v1594992703/projects/rtysccgzrf3hsmgecdhd.jpg';
  return (
    <Page title={`${state.user.profileFirstName} ${state.user.profileLastName}'s profile`}>
      <main className="profile-page">
        <section className="relative block" style={{ height: '500px' }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
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
                        alt="..."
                        src={background}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                        style={{ maxWidth: '150px' }}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        style={{ transition: 'all .15s ease' }}
                        onClick={() => profileDispatch({ type: 'startFollowing' })}
                      >
                        Follow
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          22
                        </span>
                        <Link
                          to={`/profile/${state.user.profileUsername}/followers`}
                          className="text-sm text-gray-500"
                        >
                          Followers
                        </Link>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          10
                        </span>
                        <Link
                          to={`/profile/${state.user.profileUsername}/following`}
                          className="text-sm text-gray-500"
                        >
                          Following
                        </Link>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          89
                        </span>
                        <Link
                          to={`/profile/${state.user.profileUsername}/songs`}
                          className="text-sm text-gray-500"
                        >
                          Songs
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
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>
                    {state.user.profileAbout.city}
                  </div>
                  <div className="mb-2 text-gray-700 mt-10">
                    <i className="fas fa-music mr-2 text-lg text-gray-500"></i>
                    {state.user.profileAbout.musicCategory}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                        {state.user.profileAbout.bio}
                      </p>
                      <a
                        href="#pablo"
                        className="font-normal text-pink-500"
                        onClick={e => e.preventDefault()}
                      >
                        Show more
                      </a>
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
