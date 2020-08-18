import React, { useContext, useEffect } from 'react';
import Page from '../../components/layouts/Page';
import StateContext from '../../contextsProviders/StateContext';
import { Link, withRouter } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import DispatchContext from '../../contextsProviders/DispatchContext';
import Axios from 'axios';
import PropTypes from 'prop-types';
import FlashMsgError from '../../components/shared/FlashMsgError';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionStyle } from '../../helpers/CSSHelpers';

function Login({ history }) {
  const CSSTransitionStyleModified = { ...CSSTransitionStyle, marginTop: '1.3rem' };
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const initialState = {
    username: {
      value: '',
      hasError: false,
      message: '',
    },
    password: {
      value: '',
      hasError: false,
      message: '',
    },
    submitCount: 0,
  };

  function reducer(draft, action) {
    switch (action.type) {
      case 'usernameImmediately':
        draft.username.hasError = false;
        draft.username.value = action.value;

        if (draft.username.value == '') {
          draft.username.hasError = true;
          draft.username.message = 'Username is empty.';
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
      case 'submitForm':
        if (!draft.username.hasError && !draft.password.hasError) {
          draft.submitCount++;
        }
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState);

  // SUBMIT FORM: CHECK FOR ERRORS AND INITIATE SUBMISSION
  function handleSubmitForm(e) {
    e.preventDefault();
    dispatch({ type: 'usernameImmediately', value: state.username.value });
    dispatch({ type: 'passwordImmediately', value: state.password.value });

    dispatch({ type: 'submitForm' });
  }

  // SUBMIT
  useEffect(() => {
    const request = Axios.CancelToken.source();
    if (state.submitCount) {
      (async function sendLoginForm() {
        try {
          const response = await Axios.post(
            '/login',
            {
              username: state.username.value,
              password: state.password.value,
            },
            { cancelToken: request.token }
          );
          if (response.data.token) {
            // LOGIN
            appDispatch({ type: 'login', value: response.data });
            history.push('/');
          } else {
            // DISPLAY ERROR
            console.log(response.data);
            appDispatch({ type: 'flashMsgError', value: response.data });
          }
        } catch (error) {
          // FAIL SILENTLY
          console.log(error.message);
        }
      })();
    }
    // CLEAN UP
    return () => request.cancel();
  }, [state.submitCount]);

  // TO BE CONTINUED!

  return (
    <Page title="Login">
      <div className="w-full flex flex-wrap">
        {/* <!-- Login Section --> */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <div className="flex bg-gray-900 justify-center">
            <Link to="/" className="text-white font-bold text-xl p-4">
              <img className="w-32 h-32" src={appState.logo.url} alt={appState.logo.alt} />
            </Link>
          </div>
          <div className="relative">
            {appState.flashMsgErrors.isDisplay && (
              <FlashMsgError errors={appState.flashMsgErrors.value} />
            )}
          </div>
          <div className="flex flex-col justify-center lg:justify-start my-auto  px-3 md:px-32 lg:px-3">
            <p className="text-center text-3xl">Login</p>

            <form onSubmit={handleSubmitForm} className="flex flex-col pt-3">
              <div className="relative flex flex-col pt-4">
                <label htmlFor="username" className="text-lg">
                  Username
                </label>
                <input
                  value={state.username.value}
                  onChange={e => dispatch({ type: 'usernameImmediately', value: e.target.value })}
                  type="username"
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

              <div className="relative flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <input
                  value={state.password.value}
                  onChange={e => dispatch({ type: 'passwordImmediately', value: e.target.value })}
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

              <input
                type="submit"
                value="Log In"
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              />
            </form>
            <div className="text-center pt-12 pb-12">
              <p>
                Don&apos;t have an account?{' '}
                <a href="/register" className="underline font-semibold">
                  Register here.
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* <!-- Image Section --> */}
        <div className="w-2/3 custom-layout-bg shadow-2xl">
          <div className="w-full h-screen hidden lg:block"></div>
        </div>
      </div>
    </Page>
  );
}

Login.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Login);
