import React, { useEffect, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import StateContext from '../../contextsProviders/StateContext';
import Page from '../layouts/Page';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingDotsAnimation from '../shared/LoadingDotsAnimation';
import DispatchContext from '../../contextsProviders/DispatchContext';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionStyle } from '../../helpers/CSSHelpers';
import FlashMsgError from '../../components/shared/FlashMsgError';
import FlashMsgSuccess from '../../components/shared/FlashMsgSuccess';

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
        // CHECK FOR INVALID CHARACTERS
        if (/[^\d\w\s-]/.test(draft.firstName.value)) {
          draft.firstName.hasError = true;
          draft.firstName.message =
            'First name can only contain letters, numbers, spaces, and dashes.';
        }
        return;
      case 'lastNameImmediately':
        draft.lastName.hasError = false;
        draft.lastName.value = action.value;

        if (draft.lastName.value == '') {
          draft.lastName.hasError = true;
          draft.lastName.message = 'Last name field is empty.';
        }

        // CHECK FOR INVALID CHARACTERS
        if (/[^\d\w\s-]/.test(draft.lastName.value)) {
          draft.lastName.hasError = true;
          draft.lastName.message =
            'Last name can only contain letters, numbers, spaces, and dashes.';
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
        draft.city.hasError = false;
        draft.city.value = action.value;

        if (draft.city.value.length > 70) {
          draft.city.hasError = true;
          draft.city.message = 'City cannot exceed 70 characters.';
        }
        return;
      case 'musicImmediately':
        draft.musicCategory.hasError = false;
        draft.musicCategory.value = action.value;

        if (draft.musicCategory.value.length > 50) {
          draft.musicCategory.hasError = true;
          draft.musicCategory.message = 'Music genre cannot exceed 50 characters.';
        }
        return;
      case 'bioImmediately':
        draft.bio.hasError = false;
        draft.bio.value = action.value;

        if (draft.bio.value.length > 400) {
          draft.bio.hasError = true;
          draft.bio.message = 'Bio cannot exceed 400 characters.';
        }
        return;
      case 'isFetchingStarts':
        draft.isFetching = true;
        return;
      case 'isFetchingEnds':
        draft.isFetching = false;
        return;
      case 'isSaving':
        if (action.process == 'starts') {
          draft.isSaving = true;
        } else {
          draft.isSaving = false;
        }
        return;
      case 'submitForm':
        if (
          !draft.username.hasError &&
          !draft.firstName.hasError &&
          !draft.lastName.hasError &&
          !draft.email.hasError &&
          !draft.city.hasError &&
          !draft.bio.hasError &&
          !draft.musicCategory.hasError
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

  // INITIAL SUBMIT
  function handleSubmit(e) {
    e.preventDefault();

    profileInfoDispatch({ type: 'firstNameImmediately', value: state.firstName.value });
    profileInfoDispatch({ type: 'lastNameImmediately', value: state.lastName.value });
    profileInfoDispatch({ type: 'usernameImmediately', value: state.username.value });
    profileInfoDispatch({ type: 'emailImmediately', value: state.email.value });
    profileInfoDispatch({ type: 'emailImmediately', value: state.email.value });

    profileInfoDispatch({ type: 'submitForm' });
  }

  // FINALLY SUBMIT
  useEffect(() => {
    if (state.submitCount) {
      const request = Axios.CancelToken.source();
      profileInfoDispatch({ type: 'isSaving', process: 'starts' });
      appDispatch({ type: 'turnOff' }); // CLOSE FLASH MESSAGING MODAL IF OPENED

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

            profileInfoDispatch({ type: 'isSaving' });

            if (response.data.token) {
              // SUCCESS
              userData.token = response.data.token;
              appDispatch({
                type: 'updateLocalStorage',
                value: userData,
                process: 'profileUpdate',
              });
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
    }
  }, [state.submitCount]);

  if (state.isFetching) {
    return <LoadingDotsAnimation />;
  }

  return (
    <Page title="Settings - Profile Info">
      <div className="mb-20">
        <form
          onSubmit={handleSubmit}
          className="mt-6 c-shadow p-3 bg-white w-full max-w-2xl  mx-auto"
        >
          <div className="flex flex-wrap items-center justify-between mt-4">
            <div className="relative w-full md:w-1/2 px-3 mb-6">
              <label className="w-full text-xs font-bold inline-block mb-1 uppercase tracking-wide text-gray-700">
                first name
              </label>
              <input
                autoComplete="off"
                placeholder="Enter first name"
                value={state.firstName.value}
                onChange={e =>
                  profileInfoDispatch({ type: 'firstNameImmediately', value: e.target.value })
                }
                className="transition ease-in-out duration-150 shadow-inner py-2 px-4  bg-gray-200 focus:outline-none appearance-none focus:border-gray-500 focus:bg-white border rounded leading-tight w-full"
                type="text"
              />
              <CSSTransition
                in={state.firstName.hasError}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit
              >
                <div style={CSSTransitionStyle} className="liveValidateMessage">
                  {state.firstName.message}
                </div>
              </CSSTransition>
            </div>
            <div className="relative w-full md:w-1/2 px-3 mb-6">
              <label className="w-full text-xs font-bold inline-block mb-1 uppercase tracking-wide text-gray-700">
                last name
              </label>
              <input
                autoComplete="off"
                placeholder="Enter last name"
                value={state.lastName.value}
                onChange={e =>
                  profileInfoDispatch({ type: 'lastNameImmediately', value: e.target.value })
                }
                className="transition ease-in-out duration-150 shadow-inner py-2 px-4  bg-gray-200 focus:outline-none appearance-none focus:border-gray-500 focus:bg-white border rounded leading-tight w-full"
                type="text"
              />
              <CSSTransition
                in={state.lastName.hasError}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit
              >
                <div style={CSSTransitionStyle} className="liveValidateMessage">
                  {state.lastName.message}
                </div>
              </CSSTransition>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between mb-6">
            <div className="relative w-full md:w-1/2 px-3 mb-6">
              <label className="w-full text-xs font-bold inline-block mb-1 uppercase tracking-wide text-gray-700">
                username
              </label>
              <input
                autoComplete="off"
                placeholder="Enter username"
                value={state.username.value}
                onChange={e =>
                  profileInfoDispatch({ type: 'usernameImmediately', value: e.target.value })
                }
                className="transition ease-in-out duration-150 shadow-inner py-2 px-4  bg-gray-200 focus:outline-none appearance-none focus:border-gray-500 focus:bg-white border rounded leading-tight w-full"
                type="text"
              />
              <CSSTransition
                in={state.username.hasError}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit
              >
                <div style={CSSTransitionStyle} className="liveValidateMessage">
                  {state.username.message}
                </div>
              </CSSTransition>
            </div>
            <div className="relative w-full md:w-1/2 px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-text-1"
              >
                email address
              </label>
              <input
                autoComplete="off"
                placeholder="Enter email"
                value={state.email.value}
                onChange={e =>
                  profileInfoDispatch({ type: 'emailImmediately', value: e.target.value })
                }
                className="transition ease-in-out duration-150 shadow-inner py-2 px-4  bg-gray-200 focus:outline-none appearance-none focus:border-gray-500 focus:bg-white border rounded leading-tight w-full"
                id="grid-text-1"
                type="text"
              />
              <CSSTransition
                in={state.email.hasError}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit
              >
                <div style={CSSTransitionStyle} className="liveValidateMessage">
                  {state.email.message}
                </div>
              </CSSTransition>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between mb-6">
            <div className="relative w-full md:w-1/2 px-3 mb-6">
              <label className="w-full text-xs font-bold inline-block mb-1 uppercase tracking-wide text-gray-700">
                City of Residence
              </label>
              <input
                autoComplete="off"
                placeholder="Enter city/town"
                value={state.city.value}
                onChange={e =>
                  profileInfoDispatch({ type: 'cityImmediately', value: e.target.value })
                }
                className="transition ease-in-out duration-150 shadow-inner py-2 px-4  bg-gray-200 focus:outline-none appearance-none focus:border-gray-500 focus:bg-white border rounded leading-tight w-full"
                type="text"
              />
              <CSSTransition
                in={state.city.hasError}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit
              >
                <div style={CSSTransitionStyle} className="liveValidateMessage">
                  {state.city.message}
                </div>
              </CSSTransition>
            </div>
            <div className="relative w-full md:w-1/2 px-3 mb-6">
              <label className="w-full text-xs font-bold inline-block mb-1 uppercase tracking-wide text-gray-700">
                Music Genre
              </label>
              <input
                autoComplete="off"
                placeholder="E.g Gospel"
                value={state.musicCategory.value}
                onChange={e =>
                  profileInfoDispatch({ type: 'musicImmediately', value: e.target.value })
                }
                className="transition ease-in-out duration-150 shadow-inner py-2 px-4  bg-gray-200 focus:outline-none appearance-none focus:border-gray-500 focus:bg-white border rounded leading-tight w-full"
                type="text"
              />
              <CSSTransition
                in={state.musicCategory.hasError}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit
              >
                <div style={CSSTransitionStyle} className="liveValidateMessage">
                  {state.musicCategory.message}
                </div>
              </CSSTransition>
            </div>
          </div>

          <div className="relative w-full px-3 mb-6">
            <label className="w-full text-xs font-bold inline-block mb-1 uppercase tracking-wide text-gray-700">
              Bio
            </label>
            <textarea
              placeholder="About you"
              value={state.bio.value}
              rows="5"
              onChange={e => profileInfoDispatch({ type: 'bioImmediately', value: e.target.value })}
              className="transition ease-in-out duration-150 shadow-inner py-2 px-4  bg-gray-200 focus:outline-none appearance-none focus:border-gray-500 focus:bg-white border rounded leading-tight w-full"
            ></textarea>
            <CSSTransition
              in={state.bio.hasError}
              timeout={330}
              classNames="liveValidateMessage"
              unmountOnExit
            >
              <div style={CSSTransitionStyle} className="liveValidateMessage">
                {state.bio.message}
              </div>
            </CSSTransition>
          </div>
          <div className="flex justify-end">
            <button
              disabled={state.isSaving}
              type="submit"
              className="relative inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              <i className="fas fa-exchange-alt mr-3"></i>
              {state.isSaving ? (
                <span>
                  <i className="fa text-sm fa-spinner fa-spin"></i>
                </span>
              ) : (
                <>Save Changes</>
              )}
            </button>
          </div>
        </form>
        <div className="relative mt-px">
          {appState.flashMsgErrors.isDisplay && (
            <FlashMsgError errors={appState.flashMsgErrors.value} />
          )}
          {appState.flashMsgSuccess.isDisplay && <FlashMsgSuccess />}
        </div>
      </div>
    </Page>
  );
}

ProfileInfoSettings.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ProfileInfoSettings);
