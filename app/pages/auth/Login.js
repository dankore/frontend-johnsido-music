import React, { useContext, useEffect } from 'react';
import Page from '../../components/layouts/Page';
import StateContext from '../../contextsProviders/StateContext';
import { Link, withRouter } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import PropTypes from 'prop-types';
import FlashMsgError from '../../components/shared/FlashMsgError';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionStyle } from '../../helpers/CSSHelpers';
import DispatchContext from '../../contextsProviders/DispatchContext';

function Login({ history }) {
  const CSSTransitionStyleModified = { ...CSSTransitionStyle, marginTop: '1.3rem' };
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const initialState = {
    usernameOrEmail: {
      value: '',
      hasError: false,
      message: '',
    },
    password: {
      value: '',
      hasError: false,
      message: '',
    },
    isLoggingIn: false,
    submitCount: 0,
  };

  function reducer(draft, action) {
    switch (action.type) {
      case 'usernameOrEmailImmediately':
        draft.usernameOrEmail.hasError = false;
        draft.usernameOrEmail.value = action.value;

        if (draft.usernameOrEmail.value == '') {
          draft.usernameOrEmail.hasError = true;
          draft.usernameOrEmail.message = 'Username / email field is empty.';
        }
        return;
      case 'passwordImmediately':
        draft.password.hasError = false;
        draft.password.value = action.value;

        if (draft.password.value == '') {
          draft.password.hasError = true;
          draft.password.message = 'Password field is empty.';
        }
        return;
      case 'isLoggingIn':
        if (action.process == 'starts') {
          draft.isLoggingIn = true;
        } else {
          draft.isLoggingIn = false;
        }
        return;
      case 'submitForm':
        if (!draft.usernameOrEmail.hasError && !draft.password.hasError) {
          draft.submitCount++;
        }
        return;
    }
  }

  const [state, loggingDispatch] = useImmerReducer(reducer, initialState);

  // SUBMIT FORM: CHECK FOR ERRORS AND INITIATE SUBMISSION
  function handleSubmitForm(e) {
    e.preventDefault();
    loggingDispatch({ type: 'usernameOrEmailImmediately', value: state.usernameOrEmail.value });
    loggingDispatch({ type: 'passwordImmediately', value: state.password.value });

    loggingDispatch({ type: 'submitForm' });
  }

  // SUBMIT
  useEffect(() => {
    if (state.submitCount) {
      const request = Axios.CancelToken.source();
      loggingDispatch({ type: 'isLoggingIn', process: 'starts' });

      (async function sendLoginForm() {
        try {
          const response = await Axios.post(
            '/login',
            {
              usernameOrEmail: state.usernameOrEmail.value,
              password: state.password.value,
            },
            { cancelToken: request.token }
          );

          loggingDispatch({ type: 'isLoggingIn' });

          if (response.data.token) {
            // REDIRECT NEW USER TO THIS URL
            let gotoThisUrl;
            if (history.location.fromUrl) gotoThisUrl = history.location.fromUrl;
            else gotoThisUrl = '/';

            // TURN OFF ERROR, IF ANY
            appDispatch({ type: 'turnOff' });
            // LOGIN
            appDispatch({ type: 'login', value: response.data });
            history.push(gotoThisUrl);
          } else {
            // DISPLAY ERROR
            appDispatch({ type: 'flashMsgError', value: response.data });
          }
        } catch (error) {
          // FAIL SILENTLY
          console.log(error.message);
        }
      })();

      // CLEAN UP
      return () => request.cancel();
    }
  }, [state.submitCount]);

  return (
    <Page title="Login">
      <div className="flex flex-wrap w-full">
        {/* <!-- Form Section --> */}
        <div className="flex flex-col w-full lg:w-1/3">
          <div className="flex justify-center bg-gray-900">
            <Link to="/" className="p-4 text-xl font-bold text-white focus:outline-none">
              <img className="w-32 h-32" src={appState.logo.url} alt={appState.logo.alt} />
            </Link>
          </div>
          <div className="relative">
            {appState.flashMsgErrors.isDisplay && (
              <FlashMsgError errors={appState.flashMsgErrors.value} />
            )}
          </div>
          <div className="flex flex-col justify-center px-3 my-auto lg:justify-start md:px-32 lg:px-3">
            <p className="text-3xl text-center">Login</p>

            <form onSubmit={handleSubmitForm} className="flex flex-col pt-3">
              <div className="relative flex flex-col pt-4">
                <label htmlFor="usernameOrEmail" className="text-lg">
                  Username or Email <span className="text-red-600">*</span>
                </label>
                <input
                  value={state.usernameOrEmail.value}
                  onChange={e =>
                    loggingDispatch({ type: 'usernameOrEmailImmediately', value: e.target.value })
                  }
                  type="usernameOrEmail"
                  id="usernameOrEmail"
                  placeholder="Username or email"
                  className="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                <CSSTransition
                  in={state.usernameOrEmail.hasError}
                  timeout={330}
                  classNames="liveValidateMessage"
                  unmountOnExit
                >
                  <div style={CSSTransitionStyleModified} className="liveValidateMessage">
                    {state.usernameOrEmail.message}
                  </div>
                </CSSTransition>
              </div>

              <div className="relative flex flex-col pt-4">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-lg">
                    Password <span className="text-red-600">*</span>
                  </label>
                  <Link
                    to="/reset-password"
                    className="block text-blue-600 hover:text-blue-700 focus:text-blue-800 focus:outline-none"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  value={state.password.value}
                  onChange={e =>
                    loggingDispatch({ type: 'passwordImmediately', value: e.target.value })
                  }
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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

              <button
                type="submit"
                className="p-2 mt-8 text-lg font-bold text-white bg-black hover:bg-gray-700"
              >
                {state.isLoggingIn ? (
                  <span>
                    <i className="text-sm fa fa-spinner fa-spin"></i>
                  </span>
                ) : (
                  <>Login In</>
                )}
              </button>
            </form>
            <div className="pt-12 pb-12 text-center">
              <p>
                Don&apos;t have an account?{' '}
                <a
                  href="/register"
                  className="font-semibold underline px-2 focus:outline-none hover:text-gray-800 focus:text-gray-700"
                >
                  Register here.
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* <!-- Image Section --> */}
        <div className="w-2/3 shadow-2xl custom-layout-bg">
          <div className="hidden w-full h-screen lg:block"></div>
        </div>
      </div>
    </Page>
  );
}

Login.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Login);
