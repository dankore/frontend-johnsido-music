import React, { useEffect, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import StateContext from '../../contextsProviders/StateContext';
import Page from '../layouts/Page';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingDotsAnimation from '../shared/LoadingDotsAnimation';

function ProfileInfoSettings({ history }) {
  const appState = useContext(StateContext);
  const initialState = {
    user: {
      profileUsername: '',
      profileFirstName: '',
      profileLastName: '',
      profileAvatar: '',
      profileEmail: '',
      profileAbout: { bio: '', musicCategory: '', city: '' },
    },
    isFetching: false,
  };

  function profileInfoReducer(draft, action) {
    switch (action.type) {
      case 'updateUserInfo':
        draft.user = action.value;
        return;
      case 'firstNameImmediately':
        draft.user.profileFirstName = action.value;
        return;
      case 'lastNameImmediately':
        draft.user.profileLastName = action.value;
        return;
      case 'usernameImmediately':
        draft.user.profileUsername = action.value;
        return;
      case 'emailImmediately':
        draft.user.profileEmail = action.value;
        return;
      case 'cityImmediately':
        draft.user.profileAbout.city = action.value;
        return;
      case 'musicImmediately':
        draft.user.profileAbout.musicCategory = action.value;
        return;
      case 'bioImmediately':
        draft.user.profileAbout.bio = action.value;
        return;
      case 'isFetchingStarts':
        draft.isFetching = true;
        return;
      case 'isFetchingEnds':
        draft.isFetching = false;
        return;
    }
  }

  const [state, profileInfoDispatch] = useImmerReducer(profileInfoReducer, initialState);

  useEffect(() => {
    const request = Axios.CancelToken.source();
    profileInfoDispatch({ type: 'isFetchingStarts' });

    (async function getUserInfo() {
      const response = await Axios.post(`/profile/${appState.user.username}`, {
        CancelToken: request.token,
      });

      profileInfoDispatch({ type: 'isFetchingEnds' });

      if (response.data) {
        // SAVE DATA TO STATE
        profileInfoDispatch({ type: 'updateUserInfo', value: response.data });
      } else {
        // USER DOES NOT EXISTS
        history.push('/404');
      }
    })();

    return () => request.cancel();
  }, [state.user.username]);

  if (state.isFetching) {
    return <LoadingDotsAnimation />;
  }

  return (
    <Page title="Settings - Profile Info">
      <div className="bg-gray-200 font-mono">
        <div className="container mx-auto">
          <div className="inputs w-full max-w-2xl p-6 mx-auto">
            <form className="mt-6 pt-4">
              <h2 className="text-2xl text-gray-900">Profile information</h2>

              <div className="flex items-center justify-between mt-4">
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    first name
                  </label>
                  <input
                    value={state.user.profileFirstName}
                    onChange={e =>
                      profileInfoDispatch({ type: 'firstNameImmediately', value: e.target.value })
                    }
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    last name
                  </label>
                  <input
                    value={state.user.profileLastName}
                    onChange={e =>
                      profileInfoDispatch({ type: 'lastNameImmediately', value: e.target.value })
                    }
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="w-full md:w-full px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    username
                  </label>
                  <input
                    value={state.user.profileUsername}
                    onChange={e =>
                      profileInfoDispatch({ type: 'usernameImmediately', value: e.target.value })
                    }
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                  />
                </div>
                <div className="w-full md:w-full px-3 mb-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-text-1"
                  >
                    email address
                  </label>
                  <input
                    value={state.user.profileEmail}
                    onChange={e =>
                      profileInfoDispatch({ type: 'emailImmediately', value: e.target.value })
                    }
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    id="grid-text-1"
                    type="text"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    City of Residence
                  </label>
                  <input
                    value={state.user.profileAbout.city}
                    onChange={e =>
                      profileInfoDispatch({ type: 'cityImmediately', value: e.target.value })
                    }
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Music Genre
                  </label>
                  <input
                    value={state.user.profileAbout.musicCategory}
                    onChange={e =>
                      profileInfoDispatch({ type: 'musicImmediately', value: e.target.value })
                    }
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                  />
                </div>
              </div>

              <div className="w-full md:w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Bio
                </label>
                <textarea
                  value={state.user.profileAbout.bio}
                  onChange={e =>
                    profileInfoDispatch({ type: 'bioImmediately', value: e.target.value })
                  }
                  className="rounded-md leading-normal resize-none w-full h-20 py-2 px-3 shadow-inner border border-gray-400 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md bg-white hover:bg-gray-100 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                  type="submit"
                >
                  save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
}

ProfileInfoSettings.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ProfileInfoSettings);
