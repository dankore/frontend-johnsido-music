import React, { useContext, useEffect } from 'react';
import Page from '../../components/layouts/Page';
import StateContext from '../../contextsProviders/StateContext';
import { Link, withRouter } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import moment from 'moment-timezone';
import FlashMsgError from '../../components/shared/FlashMsgError';
import DispatchContext from '../../contextsProviders/DispatchContext';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionStyle } from '../../helpers/CSSHelpers';

function Register({ history }) {
  const CSSTransitionStyleModified = { ...CSSTransitionStyle, marginTop: '1.3rem' };
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const initialState = {
    username: {
      value: '',
      hasError: false,
      message: '',
      sendCount: 0,
      isUnique: false,
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
      checkCount: 0,
      isUnique: false,
    },
    password: {
      value: '',
      hasError: false,
      message: '',
    },
    confirmPassword: {
      value: '',
      hasError: false,
      message: '',
    },
    isRegistring: false,
    submitCount: 0,
  };

  function registerReducer(draft, action) {
    switch (action.type) {
      case 'usernameImmediately':
        draft.username.hasError = false;
        draft.username.value = action.value;
        if (draft.username.value == '') {
          draft.username.hasError = true;
          draft.username.message = 'Username cannot be empty.';
        }

        if (draft.username.value.length > 30) {
          draft.username.hasError = true;
          draft.username.message = 'Username cannot exceed 30 characters.';
        }
        if (draft.username.value && !/^([a-zA-Z0-9]+)$/.test(draft.username.value)) {
          draft.username.hasError = true;
          draft.username.message = 'Username can only contain English alphabets and numbers.';
        }

        return;
      case 'usernameAfterDelay':
        if (draft.username.value.length < 3) {
          draft.username.hasError = true;
          draft.username.message = 'Username must be at least 3 characters.';
        }
        if (!draft.username.hasError && !action.dontSendReqToServer) {
          draft.username.sendCount++;
        }
        return;
      case 'usernameIsUnique':
        if (action.value) {
          draft.username.hasError = true;
          draft.username.isUnique = false;
          draft.username.message = 'Username is already being used.';
        } else {
          draft.username.isUnique = true;
        }
        return;
      case 'firstNameImmediately':
        draft.firstName.hasError = false;
        draft.firstName.value = action.value;

        if (draft.firstName.value.trim() == '') {
          draft.firstName.hasError = true;
          draft.firstName.message = 'First name cannot be empty.';
        }
        if (/[^a-zA-Z]/.test(draft.firstName.value.trim())) {
          draft.firstName.hasError = true;
          draft.firstName.message = 'First name can only be English alphabets.';
        }

        if (draft.firstName.value.length > 50) {
          draft.firstName.hasError = true;
          draft.firstName.message = 'First name cannot exceed 50 characters.';
        }

        return;
      case 'lastNameImmediately':
        draft.lastName.hasError = false;
        draft.lastName.value = action.value;

        if (draft.lastName.value.trim() == '') {
          draft.lastName.hasError = true;
          draft.lastName.message = 'Last name cannot be empty.';
        }
        if (/[^a-zA-Z]/.test(draft.lastName.value.trim())) {
          draft.lastName.hasError = true;
          draft.lastName.message = 'Last name can only be English alphabets.';
        }

        if (draft.lastName.value.length > 50) {
          draft.lastName.hasError = true;
          draft.lastName.message = 'Last name cannot exceed 50 characters.';
        }
        return;
      case 'emailImmediately':
        draft.email.hasError = false;
        draft.email.value = action.value;

        if (draft.email.value == '') {
          draft.email.hasError = true;
          draft.email.message = 'Email cannot be empty.';
        }

        return;
      case 'emailAfterDelay':
        if (!/^\S+@\S+$/.test(draft.email.value.trim())) {
          draft.email.hasError = true;
          draft.email.message = 'Please provide a valid email.';
        }
        if (!draft.email.hasError && !action.dontSendReqToServer) {
          draft.email.checkCount++;
        }
        return;
      case 'emailIsUnique':
        if (action.value) {
          draft.email.hasError = true;
          draft.email.isUnique = false;
          draft.email.message = 'Email is already being used.';
        } else {
          draft.email.isUnique = true;
        }
        return;
      case 'passwordImmediately':
        draft.password.hasError = false;
        draft.password.value = action.value;
        if (draft.password.value == '') {
          draft.password.hasError = true;
          draft.password.message = 'Password cannot be empty.';
        }
        return;
      case 'passwordAfterDelay':
        if (draft.password.value.length < 6) {
          draft.password.hasError = true;
          draft.password.message = 'Password must be at least 6 characters.';
        }
        if (draft.password.value.length > 50) {
          draft.password.hasError = true;
          draft.password.message = 'Password must not be more than 50 characters.';
        }
        return;
      case 'confirmPasswordImmediately':
        draft.confirmPassword.hasError = false;
        draft.confirmPassword.value = action.value;

        if (draft.confirmPassword.value == '') {
          draft.confirmPassword.hasError = true;
          draft.confirmPassword.message = 'Confirm password field cannot be empty.';
        }
        return;
      case 'confirmPasswordAfterDelay':
        if (draft.password.value != draft.confirmPassword.value) {
          draft.confirmPassword.hasError = true;
          draft.confirmPassword.message = 'Passwords do not match.';
        }
        return;
      case 'isRegistring':
        if (action.process == 'starts') {
          draft.isRegistring = true;
        } else {
          draft.isRegistring = false;
        }
        return;
      case 'submitForm':
        if (
          !draft.username.hasError &&
          draft.username.isUnique &&
          !draft.firstName.hasError &&
          !draft.lastName.hasError &&
          draft.email.isUnique &&
          !draft.email.hasError &&
          !draft.password.hasError &&
          !draft.confirmPassword.hasError &&
          draft.password.value == draft.confirmPassword.value
        ) {
          draft.submitCount++;
        }
        return;
    }
  }

  const [state, registerDispatch] = useImmerReducer(registerReducer, initialState);

  // USERNAME AFTER DELAY
  useEffect(() => {
    if (state.username.value) {
      const delay = setTimeout(() => registerDispatch({ type: 'usernameAfterDelay' }), 800);
      return () => clearTimeout(delay);
    }
  }, [state.username.value]);

  // USERNAME AFTER DELAY: CHECK DB
  useEffect(() => {
    if (state.username.sendCount) {
      const request = Axios.CancelToken.source();
      (async function isUsernameTaken() {
        try {
          const response = await Axios.post('/doesUsernameExists', {
            username: state.username.value,
          });
          registerDispatch({ type: 'usernameIsUnique', value: response.data });
        } catch (error) {
          console.log(error.message);
        }
      })();
      return () => request.cancel();
    }
  }, [state.username.sendCount]);

  // EMAIL AFTER DELAY
  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(() => registerDispatch({ type: 'emailAfterDelay' }), 800);

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
          registerDispatch({ type: 'emailIsUnique', value: response.data });
        } catch (error) {
          console.log(error.message);
        }
      })();

      return () => request.cancel();
    }
  }, [state.email.checkCount]);

  // PASSWORD AFTER DELAY
  useEffect(() => {
    if (state.password.value) {
      const delay = setTimeout(() => registerDispatch({ type: 'passwordAfterDelay' }), 800);

      return () => clearTimeout(delay);
    }
  }, [state.password.value]);

  // PASSWORD AFTER DELAY
  useEffect(() => {
    if (state.confirmPassword.value) {
      const delay = setTimeout(() => registerDispatch({ type: 'confirmPasswordAfterDelay' }), 800);

      return () => clearTimeout(delay);
    }
  }, [state.confirmPassword.value]);

  // SUBMIT: DO SOME CHECKS BEFORE SUBMITTING FORM
  function handleFormSubmission(e) {
    e.preventDefault();
    registerDispatch({ type: 'usernameImmediately', value: state.username.value });
    registerDispatch({
      type: 'usernameAfterDelay',
      value: state.email.value,
      dontSendReqToServer: true,
    });
    registerDispatch({ type: 'firstNameImmediately', value: state.firstName.value });
    registerDispatch({ type: 'lastNameImmediately', value: state.lastName.value });
    registerDispatch({
      type: 'emailImmediately',
      value: state.email.value,
      dontSendReqToServer: true,
    });
    registerDispatch({ type: 'passwordImmediately', value: state.password.value });
    registerDispatch({ type: 'confirmPasswordImmediately', value: state.confirmPassword.value });
    registerDispatch({ type: 'submitForm' });
  }

  useEffect(() => {
    if (state.submitCount) {
      registerDispatch({ type: 'isRegistring', process: 'starts' });
      const request = Axios.CancelToken.source();
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const currentTime = moment().tz(timezone).format();

      (async function submitForm() {
        try {
          const response = await Axios.post(
            '/register',
            {
              username: state.username.value,
              firstName: state.firstName.value,
              lastName: state.lastName.value,
              email: state.email.value,
              password: state.password.value,
              confirmPassword: state.confirmPassword.value,
              userCreationDate: currentTime,
            },
            {
              cancelToken: request.token,
            }
          );

          registerDispatch({ type: 'isRegistring' });

          if (response.data.token) {
            // LOGIN
            appDispatch({ type: 'login', value: response.data });
            history.push(`/profile/${response.data.username}`);
          } else {
            // DISPLAY ERROR
            appDispatch({ type: 'flashMsgError', value: response.data });
          }
        } catch (error) {
          console.log(error.message);
        }
      })();
      return () => request.cancel();
    }
  }, [state.submitCount]);

  return (
    <Page title="Register">
      <div className="w-full flex flex-wrap">
        {/* <!-- Register Section --> */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <div className="flex bg-gray-900 justify-center">
            <Link to="/" className="text-white font-bold text-xl p-4">
              <img className="w-32 h-32" src={appState.logo.url} alt={appState.logo.alt} />
            </Link>
          </div>
          <div className="flex flex-col justify-center lg:justify-start my-auto px-3 md:px-32 lg:px-3">
            <p className="text-center text-3xl pt-4">Register</p>
            {appState.flashMsgErrors.isDisplay && (
              <FlashMsgError errors={appState.flashMsgErrors.value} />
            )}
            <form onSubmit={handleFormSubmission} className="flex flex-col">
              {/* USERNAME */}
              <div className="relative flex flex-col pt-4">
                <label htmlFor="username" className="text-lg">
                  Username
                </label>
                <input
                  value={state.username.value}
                  onChange={e =>
                    registerDispatch({ type: 'usernameImmediately', value: e.target.value })
                  }
                  type="text"
                  id="username"
                  placeholder="don"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                <CSSTransition
                  in={state.username.hasError}
                  timeout={330}
                  classNames="liveValidateMessage"
                  unmountOnExit
                >
                  <div style={CSSTransitionStyleModified} className="liveValidateMessage">
                    {state.username.message}
                  </div>
                </CSSTransition>
              </div>
              {/* FIRST NAME */}
              <div className="relative flex flex-col pt-4">
                <label htmlFor="firstName" className="text-lg">
                  First Name
                </label>
                <input
                  value={state.firstName.value}
                  onChange={e =>
                    registerDispatch({ type: 'firstNameImmediately', value: e.target.value })
                  }
                  type="text"
                  id="FirstName"
                  placeholder="John"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                <CSSTransition
                  in={state.firstName.hasError}
                  timeout={330}
                  classNames="liveValidateMessage"
                  unmountOnExit
                >
                  <div style={CSSTransitionStyleModified} className="liveValidateMessage">
                    {state.firstName.message}
                  </div>
                </CSSTransition>
              </div>
              {/* LAST NAME*/}
              <div className="relative flex flex-col pt-4">
                <label htmlFor="lastName" className="text-lg">
                  Last Name
                </label>
                <input
                  value={state.lastName.value}
                  onChange={e =>
                    registerDispatch({ type: 'lastNameImmediately', value: e.target.value })
                  }
                  type="text"
                  id="lastName"
                  placeholder="Sido"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                <CSSTransition
                  in={state.lastName.hasError}
                  timeout={330}
                  classNames="liveValidateMessage"
                  unmountOnExit
                >
                  <div style={CSSTransitionStyleModified} className="liveValidateMessage">
                    {state.lastName.message}
                  </div>
                </CSSTransition>
              </div>
              {/* EMAIL */}
              <div className="relative flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  value={state.email.value}
                  onChange={e =>
                    registerDispatch({ type: 'emailImmediately', value: e.target.value })
                  }
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                <CSSTransition
                  in={state.email.hasError}
                  timeout={330}
                  classNames="liveValidateMessage"
                  unmountOnExit
                >
                  <div style={CSSTransitionStyleModified} className="liveValidateMessage">
                    {state.email.message}
                  </div>
                </CSSTransition>
              </div>
              {/* PASSWORD */}
              <div className="relative flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <input
                  value={state.password.value}
                  onChange={e =>
                    registerDispatch({ type: 'passwordImmediately', value: e.target.value })
                  }
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                <CSSTransition
                  in={state.password.hasError}
                  timeout={330}
                  classNames="liveValidateMessage"
                  unmountOnExit
                >
                  <div style={CSSTransitionStyleModified} className="liveValidateMessage">
                    {state.password.message}
                  </div>
                </CSSTransition>
              </div>
              {/* CONFIRM PASSWORD */}
              <div className="relative flex flex-col pt-4">
                <label htmlFor="confirm-password" className="text-lg">
                  Confirm Password
                </label>
                <input
                  value={state.confirmPassword.value}
                  onChange={e =>
                    registerDispatch({ type: 'confirmPasswordImmediately', value: e.target.value })
                  }
                  type="password"
                  id="confirm-password"
                  placeholder="Password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                <CSSTransition
                  in={state.confirmPassword.hasError}
                  timeout={330}
                  classNames="liveValidateMessage"
                  unmountOnExit
                >
                  <div style={CSSTransitionStyleModified} className="liveValidateMessage">
                    {state.confirmPassword.message}
                  </div>
                </CSSTransition>
              </div>
              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              >
                {state.isRegistring ? (
                  <span>
                    <i className="fa text-sm fa-spinner fa-spin"></i>
                  </span>
                ) : (
                  <>Register</>
                )}
              </button>
            </form>
            <div className="text-center pt-12 pb-12">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="underline font-semibold">
                  Log in here.
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* <!-- Image Section --> */}
        <div className="w-2/3 custom-layout-bg shadow-2xl">
          <div className="object-cover w-full h-screen hidden lg:block"></div>
        </div>
      </div>
    </Page>
  );
}

Register.propTypes = {
  history: PropTypes.any,
};

export default withRouter(Register);
