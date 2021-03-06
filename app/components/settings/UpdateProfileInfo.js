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
      isUnique: false,
      checkCount: 0,
      beforeEdit: '',
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
      isUnique: false,
      checkCount: 0,
      beforeEdit: '',
    },
    city: {
      value: '',
      hasError: false,
      message: '',
      beforeEdit: '',
    },
    musicCategory: {
      value: '',
      hasError: false,
      message: '',
      beforeEdit: '',
    },
    bio: {
      value: '',
      hasError: false,
      message: '',
      beforeEdit: '',
    },
    isFetching: false,
    submitCount: 0,
  };

  function profileInfoReducer(draft, action) {
    switch (action.type) {
      case 'updateUserInfo':
        if (action.process != 'updateAllBeforeEditValues') {
          draft.username.value = action.value.profileUsername.trim();
          draft.username.beforeEdit = action.value.profileUsername.trim();

          draft.firstName.value = action.value.profileFirstName.trim();
          draft.firstName.beforeEdit = action.value.profileFirstName.trim();

          draft.lastName.value = action.value.profileLastName.trim();
          draft.lastName.beforeEdit = action.value.profileLastName.trim();

          draft.email.value = action.value.profileEmail.trim();
          draft.email.beforeEdit = action.value.profileEmail.trim();

          draft.city.value = action.value.profileAbout.city.trim();
          draft.city.beforeEdit = action.value.profileAbout.city.trim();

          draft.bio.value = action.value.profileAbout.bio.trim();
          draft.bio.beforeEdit = action.value.profileAbout.bio.trim();

          draft.musicCategory.value = action.value.profileAbout.musicCategory.trim();
          draft.musicCategory.beforeEdit = action.value.profileAbout.musicCategory.trim();
        } else {
          draft.firstName.beforeEdit = action.value.firstName.trim();
          draft.lastName.beforeEdit = action.value.lastName.trim();
          draft.username.beforeEdit = action.value.username.trim();
          draft.email.beforeEdit = action.value.email.trim();
          draft.city.beforeEdit = action.value.about.city.trim();
          draft.bio.beforeEdit = action.value.about.bio.trim();
          draft.musicCategory.beforeEdit = action.value.about.musicCategory.trim();
        }

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
          draft.firstName.message = 'Only letters, numbers, spaces, and dashes allowed.';
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
          draft.lastName.message = 'Only contain letters, numbers, spaces, and dashes allowed.';
        }
        return;
      case 'usernameImmediately':
        !action.dontClearError && (draft.username.hasError = false);
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

        if (!draft.username.hasError && !action.dontCheckDB) {
          draft.username.checkCount++;
        }

        return;
      case 'usernameIsUnique':
        if (action.value && draft.username.beforeEdit != action.value.username) {
          draft.username.hasError = true;
          draft.username.isUnique = false;
          draft.username.message = 'Username is already being used.';
        } else {
          draft.username.isUnique = true;
        }
        return;
      case 'emailImmediately':
        !action.dontClearError && (draft.email.hasError = false);
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

        if (!draft.email.hasError && !action.dontCheckDB) {
          draft.email.checkCount++;
        }
        return;
      case 'emailIsUnique':
        if (action.value && draft.email.beforeEdit != action.value.email) {
          draft.email.hasError = true;
          draft.email.isUnique = false;
          draft.email.message = 'Email is already being used.';
        } else {
          draft.email.isUnique = true;
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
          draft.username.isUnique &&
          !draft.firstName.hasError &&
          !draft.lastName.hasError &&
          !draft.email.hasError &&
          draft.email.isUnique &&
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

  // EMAIL AFTER DELAY: CHECK DB
  useEffect(() => {
    if (state.email.checkCount) {
      const request = Axios.CancelToken.source();

      (async function isEmailUnique() {
        try {
          const response = await Axios.post(
            '/doesEmailExists',
            { email: state.email.value },
            { cancelToken: request.token }
          );

          profileInfoDispatch({ type: 'emailIsUnique', value: response.data });
        } catch (error) {
          console.log(error.message);
        }
      })();

      return () => request.cancel();
    }
  }, [state.email.checkCount]);

  // USERNAME AFTER DELAY: CHECK DB
  useEffect(() => {
    if (state.username.checkCount) {
      const request = Axios.CancelToken.source();

      (async function isUsernameTaken() {
        try {
          const response = await Axios.post('/doesUsernameExists', {
            username: state.username.value,
          });

          profileInfoDispatch({ type: 'usernameIsUnique', value: response.data });
        } catch (error) {
          console.log(error.message);
        }
      })();

      return () => request.cancel();
    }
  }, [state.username.checkCount]);

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
    profileInfoDispatch({
      type: 'usernameImmediately',
      value: state.username.value,
      dontClearError: true,
    });
    profileInfoDispatch({
      type: 'usernameAfterDelay',
      value: state.username.value,
      dontCheckDB: true,
    });
    profileInfoDispatch({
      type: 'emailImmediately',
      value: state.email.value,
      dontClearError: true,
    });
    profileInfoDispatch({ type: 'emailAfterDelay', value: state.email.value, dontCheckDB: true });

    profileInfoDispatch({ type: 'submitForm' });
  }

  function beforeAndAfterEditIsTheSame() {
    if (
      state.firstName.value.trim() == state.firstName.beforeEdit.trim() &&
      state.lastName.value.trim() == state.lastName.beforeEdit.trim() &&
      state.username.value.trim().toLowerCase() == state.username.beforeEdit.trim().toLowerCase() &&
      state.email.value.trim().toLowerCase() == state.email.beforeEdit.trim().toLowerCase() &&
      state.lastName.value.trim() == state.lastName.beforeEdit.trim() &&
      state.bio.value.trim() == state.bio.beforeEdit.trim() &&
      state.city.value.trim() == state.city.beforeEdit.trim() &&
      state.musicCategory.value.trim() == state.musicCategory.beforeEdit.trim()
    ) {
      return true;
    }

    return false;
  }

  // FINALLY SUBMIT
  useEffect(() => {
    if (state.submitCount) {
      if (!beforeAndAfterEditIsTheSame()) {
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

                // UPDATE USERNAME BEFORE EDIT
                profileInfoDispatch({
                  type: 'updateUserInfo',
                  value: userData,
                  process: 'updateAllBeforeEditValues',
                });

                userData.token = response.data.token; // UPDATE NEW TOKEN
                appDispatch({
                  type: 'updateLocalStorage',
                  value: userData,
                  process: 'profileUpdate',
                });

                // TURN OFF ANY FLASH ERROR MESSAGE AND DISPLAY NEW SUCCESS MSG
                appDispatch({ type: 'turnOff' });
                appDispatch({
                  type: 'flashMsgSuccess',
                  value: ['Updated successfully!'],
                });
              } else {
                // TURN OFF ANY FLASH SUCCESS MESSAGE AND DISPLAY NEW ERROR MSG
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
      } else {
        // TURN OFF ANY FLASH MESSAGE
        // TODO - DISPLAY INFO MESSAGE
        appDispatch({ type: 'turnOff' });
      }
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
          className="w-full max-w-2xl p-3 mx-auto mt-6 bg-white c-shadow"
        >
          <div className="flex flex-wrap items-center justify-between mt-4">
            <div className="relative w-full px-3 mb-6 md:w-1/2">
              <label className="inline-block w-full mb-1 text-xs font-bold tracking-wide text-gray-700 uppercase">
                first name
              </label>
              <input
                autoComplete="off"
                placeholder="Enter first name"
                value={state.firstName.value}
                onChange={e =>
                  profileInfoDispatch({ type: 'firstNameImmediately', value: e.target.value })
                }
                className="w-full px-4 py-2 leading-tight transition duration-150 ease-in-out bg-gray-200 border rounded shadow-inner appearance-none focus:outline-none focus:border-gray-500 focus:bg-white"
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
            <div className="relative w-full px-3 mb-6 md:w-1/2">
              <label className="inline-block w-full mb-1 text-xs font-bold tracking-wide text-gray-700 uppercase">
                last name
              </label>
              <input
                autoComplete="off"
                placeholder="Enter last name"
                value={state.lastName.value}
                onChange={e =>
                  profileInfoDispatch({ type: 'lastNameImmediately', value: e.target.value })
                }
                className="w-full px-4 py-2 leading-tight transition duration-150 ease-in-out bg-gray-200 border rounded shadow-inner appearance-none focus:outline-none focus:border-gray-500 focus:bg-white"
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
            <div className="relative w-full px-3 mb-6 md:w-1/2">
              <label className="inline-block w-full mb-1 text-xs font-bold tracking-wide text-gray-700 uppercase">
                username
              </label>
              <input
                autoComplete="off"
                placeholder="Enter username"
                value={state.username.value}
                onChange={e =>
                  profileInfoDispatch({ type: 'usernameImmediately', value: e.target.value })
                }
                className="w-full px-4 py-2 leading-tight transition duration-150 ease-in-out bg-gray-200 border rounded shadow-inner appearance-none focus:outline-none focus:border-gray-500 focus:bg-white"
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
            <div className="relative w-full px-3 mb-6 md:w-1/2">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
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
                className="w-full px-4 py-2 leading-tight transition duration-150 ease-in-out bg-gray-200 border rounded shadow-inner appearance-none focus:outline-none focus:border-gray-500 focus:bg-white"
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
            <div className="relative w-full px-3 mb-6 md:w-1/2">
              <label className="inline-block w-full mb-1 text-xs font-bold tracking-wide text-gray-700 uppercase">
                City of Residence
              </label>
              <input
                autoComplete="off"
                placeholder="Enter city/town"
                value={state.city.value}
                onChange={e =>
                  profileInfoDispatch({ type: 'cityImmediately', value: e.target.value })
                }
                className="w-full px-4 py-2 leading-tight transition duration-150 ease-in-out bg-gray-200 border rounded shadow-inner appearance-none focus:outline-none focus:border-gray-500 focus:bg-white"
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
            <div className="relative w-full px-3 mb-6 md:w-1/2">
              <label className="inline-block w-full mb-1 text-xs font-bold tracking-wide text-gray-700 uppercase">
                Music Genre
              </label>
              <input
                autoComplete="off"
                placeholder="E.g Gospel"
                value={state.musicCategory.value}
                onChange={e =>
                  profileInfoDispatch({ type: 'musicImmediately', value: e.target.value })
                }
                className="w-full px-4 py-2 leading-tight transition duration-150 ease-in-out bg-gray-200 border rounded shadow-inner appearance-none focus:outline-none focus:border-gray-500 focus:bg-white"
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
            <label className="inline-block w-full mb-1 text-xs font-bold tracking-wide text-gray-700 uppercase">
              Bio
            </label>
            <textarea
              placeholder="About you"
              value={state.bio.value}
              rows="5"
              onChange={e => profileInfoDispatch({ type: 'bioImmediately', value: e.target.value })}
              className="w-full px-4 py-2 leading-tight transition duration-150 ease-in-out bg-gray-200 border rounded shadow-inner appearance-none focus:outline-none focus:border-gray-500 focus:bg-white"
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
              className={`relative inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out border border-transparent rounded-md bg-blue-600 hover:bg-blue-800 focus:outline-none focus:shadow-outline`}
            >
              <i className="mr-3 fas fa-exchange-alt"></i>
              {state.isSaving ? (
                <span>
                  <i className="text-sm fa fa-spinner fa-spin"></i>
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
