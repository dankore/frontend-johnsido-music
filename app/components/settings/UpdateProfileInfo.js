import React, { useEffect, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import StateContext from '../../contextsProviders/StateContext';
import Page from '../layouts/Page';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingDotsAnimation from '../shared/LoadingDotsAnimation';
import DispatchContext from '../../contextsProviders/DispatchContext';

function ProfileInfoSettings({ history }) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const initialState = {
    username: {
      value: '',
      hasError: false,
      message: '',
    },
    firstName: {
      value: '',
      hasError: false,
      message: '',
    },
    lastName: {
      value: '',
      hasError: false,
      message: '',
    },
    email: {
      value: '',
      hasError: false,
      message: '',
    },
    city: {
      value: '',
      hasError: false,
      message: '',
    },
    musicCategory: {
      value: '',
      hasError: false,
      message: '',
    },
    bio: {
      value: '',
      hasError: false,
      message: '',
    },
    isFetching: false,
    submitCount: 0,
  };

  function profileInfoReducer(draft, action) {
    switch (action.type) {
      case 'updateUserInfo':
        draft.username.value = action.value.profileUsername;
        draft.firstName.value = action.value.profileFirstName;
        draft.lastName.value = action.value.profileLastName;
        draft.email.value = action.value.profileEmail;
        draft.city.value = action.value.profileAbout.city;
        draft.bio.value = action.value.profileAbout.bio;
        draft.musicCategory.value = action.value.profileAbout.musicCategory;
        return;
      case 'firstNameImmediately':
        draft.firstName.hasError = false;
        draft.firstName.value = action.value;

        if (draft.firstName.value == '') {
          draft.firstName.hasError = true;
          draft.firstName.message = 'First name field is empty.';
        }
        return;
      case 'lastNameImmediately':
        draft.lastName.hasError = false;
        draft.lastName.value = action.value;

        if (draft.lastName.value == '') {
          draft.lastName.hasError = true;
          draft.lastName.message = 'Last name field is empty.';
        }
        return;
      case 'usernameImmediately':
        draft.username.hasError = false;
        draft.username.value = action.value;

        if (draft.username.value == '') {
          draft.username.hasError = true;
          draft.username.message = 'Username name field is empty.';
        }

        if (/[^a-zA-Z0-9]/.test(draft.username.value)) {
          draft.username.hasError = true;
          draft.username.message = 'Username can only contain letters and numbers.';
        }
        return;
      case 'usernameAfterDelay':
        if (draft.username.value.length < 3) {
          draft.username.hasError = true;
          draft.username.message = 'Username must be at least 3 letters.';
        }
        return;
      case 'emailImmediately':
        draft.email.hasError = false;
        draft.email.value = action.value;

        if (draft.email.value == '') {
          draft.email.hasError = true;
          draft.email.message = 'Email name field is empty.';
        }
        return;
      case 'emailAfterDelay':
        if (
          // eslint-disable-next-line no-control-regex
          !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
            action.value
          )
        ) {
          draft.email.hasError = true;
          draft.email.message = 'Please enter a valid email.';
        }
        return;
      case 'cityImmediately':
        draft.city.value = action.value;
        return;
      case 'musicImmediately':
        draft.musicCategory.value = action.value;
        return;
      case 'bioImmediately':
        draft.bio.value = action.value;
        return;
      case 'isFetchingStarts':
        draft.isFetching = true;
        return;
      case 'isFetchingEnds':
        draft.isFetching = false;
        return;
      case 'submitForm':
        if (
          !draft.username.hasError &&
          !draft.firstName.hasError &&
          !draft.lastName.hasError &&
          !draft.email.hasError
        ) {
          draft.submitCount++;
        }
        return;
    }
  }

  const [state, profileInfoDispatch] = useImmerReducer(profileInfoReducer, initialState);

  // USERNAME AFTER DELAY
  useEffect(() => {
    if (state.username.value) {
      const delay = setTimeout(() => profileInfoDispatch({ type: 'usernameAfterDelay' }), 800);

      return () => clearTimeout(delay);
    }
  }, [state.username.value]);

  // EMAIL AFTER DELAY
  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(
        () => profileInfoDispatch({ type: 'emailAfterDelay', value: state.email.value }),
        800
      );

      return () => clearTimeout(delay);
    }
  }, [state.email.value]);

  // LOAD USER INFO
  useEffect(() => {
    const request = Axios.CancelToken.source();

    try {
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
    } catch (error) {
      console.log(error.message);
    }
    return () => request.cancel();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    profileInfoDispatch({ type: 'firstNameImmediately', value: state.firstName.value });
    profileInfoDispatch({ type: 'lastNameImmediately', value: state.lastName.value });
    profileInfoDispatch({ type: 'usernameImmediately', value: state.username.value });
    profileInfoDispatch({ type: 'emailImmediately', value: state.email.value });
    profileInfoDispatch({ type: 'emailAfterDelay', value: state.email.value });

    profileInfoDispatch({ type: 'submitForm' });
  }

  useEffect(() => {
    const request = Axios.CancelToken.source();

    (async function saveUpdateProfileInfo() {
      try {
        if (state.submitCount) {
          const userData = {
            username: state.username.value,
            firstName: state.firstName.value,
            lastName: state.lastName.value,
            email: state.email.value,
            about: {
              bio: state.bio.value,
              city: state.city.value,
              musicCategory: state.musicCategory.value,
            },
            userCreationDate: appState.user.userCreationDate,
          };

          const response = await Axios.post('/saveUpdatedProfileInfo', {
            userData,
            token: appState.user.token,
          });

          if (response.data.token) {
            // SUCCESS
            userData.token = response.data.token;
            appDispatch({ type: 'updateLocalStorage', value: userData });
            // TURN OFF ANY FLASH ERROR MESSAGE
            appDispatch({ type: 'turnOff' });
            appDispatch({
              type: 'flashMsgSuccess',
              value: ['Updated successfully!'],
            });
          } else {
            // TURN OFF ANY FLASH SUCCESS MESSAGE
            appDispatch({ type: 'turnOff' });
            // DISPLAY VALADATION ERRORS
            appDispatch({ type: 'flashMsgError', value: response.data });
          }
        }
      } catch (error) {
        // NETWORK ERROR MOST LIKELY
        console.log(error.message);
      }
    })();

    return () => request.cancel();
  }, [state.submitCount]);

  if (state.isFetching) {
    return <LoadingDotsAnimation />;
  }

  return (
    <Page title="Settings - Profile Info">
      <div className="bg-gray-200 font-mono">
        <div className="container mx-auto">
          <div className="inputs w-full max-w-2xl p-6 mx-auto">
            <form onSubmit={handleSubmit} className="mt-6">
              <h2 className="pl-3 text-2xl text-gray-900">Profile information</h2>
              <div className="flex items-center justify-between mt-4">
                <div className="relative w-full md:w-1/2 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    first name
                  </label>
                  <input
                    placeholder="Enter first name"
                    value={state.firstName.value}
                    onChange={e =>
                      profileInfoDispatch({ type: 'firstNameImmediately', value: e.target.value })
                    }
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                  />
                  {state.firstName.hasError && (
                    <div className="absolute text-sm text-red-600">{state.firstName.message}</div>
                  )}
                </div>
                <div className="relative w-full md:w-1/2 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    last name
                  </label>
                  <input
                    placeholder="Enter last name"
                    value={state.lastName.value}
                    onChange={e =>
                      profileInfoDispatch({ type: 'lastNameImmediately', value: e.target.value })
                    }
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                  />
                  {state.lastName.hasError && (
                    <div className="absolute text-sm text-red-600">{state.lastName.message}</div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="relative w-full md:w-full px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    username
                  </label>
                  <input
                    placeholder="Enter username"
                    value={state.username.value}
                    onChange={e =>
                      profileInfoDispatch({ type: 'usernameImmediately', value: e.target.value })
                    }
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                  />
                  {state.username.hasError && (
                    <div className="absolute text-sm text-red-600">{state.username.message}</div>
                  )}
                </div>
                <div className="relative w-full md:w-full px-3 mb-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-text-1"
                  >
                    email address
                  </label>
                  <input
                    placeholder="Enter email"
                    value={state.email.value}
                    onChange={e =>
                      profileInfoDispatch({ type: 'emailImmediately', value: e.target.value })
                    }
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    id="grid-text-1"
                    type="text"
                  />
                  {state.email.hasError && (
                    <div className="absolute text-sm text-red-600">{state.email.message}</div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="relative w-full md:w-1/2 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    City of Residence
                  </label>
                  <input
                    placeholder="Enter city/town"
                    value={state.city.value}
                    onChange={e =>
                      profileInfoDispatch({ type: 'cityImmediately', value: e.target.value })
                    }
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                  />
                </div>
                <div className="relative w-full md:w-1/2 px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Music Genre
                  </label>
                  <input
                    placeholder="E.g Gospel"
                    value={state.musicCategory.value}
                    onChange={e =>
                      profileInfoDispatch({ type: 'musicImmediately', value: e.target.value })
                    }
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                  />
                </div>
              </div>

              <div className="relative w-full md:w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Bio
                </label>
                <textarea
                  placeholder="About you"
                  value={state.bio.value}
                  onChange={e =>
                    profileInfoDispatch({ type: 'bioImmediately', value: e.target.value })
                  }
                  className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
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
