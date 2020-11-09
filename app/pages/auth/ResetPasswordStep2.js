import React, { useEffect, useContext } from 'react';
import Page from '../../components/layouts/Page';
import { useParams, withRouter, Link } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import DispatchContext from '../../contextsProviders/DispatchContext';
import StateContext from '../../contextsProviders/StateContext';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionStyle } from '../../helpers/CSSHelpers';
import PropTypes from 'prop-types';

function ResetPasswordStep2({ history }) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const initialState = {
    password: {
      value: '',
      hasErrors: false,
      message: '',
    },
    reEnteredPassword: {
      value: '',
      hasErrors: false,
      message: '',
    },
    passwordResetToken: useParams().token,
    isLoading: false,
    sendCount: 0,
  };

  function reducer(draft, action) {
    switch (action.type) {
      case 'passwordImmediately':
        draft.password.hasErrors = false;
        draft.password.value = action.value;

        if (draft.password.value.trim() == '') {
          draft.password.hasErrors = true;
          draft.password.message = 'Password field is empty.';
        }

        if (draft.password.value.length > 50) {
          draft.password.hasErrors = true;
          draft.password.message = 'Password must cannot be more than 50 characters.';
        }
        return;
      case 'passwordAfterDelay':
        if (draft.password.value.length < 6) {
          draft.password.hasErrors = true;
          draft.password.message = 'Password must be at least 6 characters.';
        }
        return;
      case 'reEnteredPasswordImmediately':
        draft.reEnteredPassword.hasErrors = false;
        draft.reEnteredPassword.value = action.value;

        if (draft.reEnteredPassword.value.trim() == '') {
          draft.reEnteredPassword.hasErrors = true;
          draft.reEnteredPassword.message = 'Password field is empty.';
        }
        return;
      case 'reEnteredPasswordAfterDelay':
        if (draft.password.value != draft.reEnteredPassword.value) {
          draft.reEnteredPassword.hasErrors = true;
          draft.reEnteredPassword.message = 'Passwords do not match.';
        }
        return;
      case 'sendForm':
        if (
          draft.password.value != '' &&
          !draft.password.hasErrors &&
          draft.reEnteredPassword.value != '' &&
          !draft.reEnteredPassword.hasErrors
        ) {
          draft.sendCount++;
        }
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: 'passwordImmediately', value: state.password.value });
    dispatch({ type: 'passwordAfterDelay', value: state.password.value });

    dispatch({ type: 'reEnteredPasswordImmediately', value: state.reEnteredPassword.value });
    dispatch({ type: 'reEnteredPasswordAfterDelay', value: state.reEnteredPassword.value });
    dispatch({ type: 'sendForm' });
  }

  // PASSWORD AFTER DELAY
  useEffect(() => {
    if (state.password.value) {
      const delay = setTimeout(() => dispatch({ type: 'passwordAfterDelay' }), 800);
      return () => clearTimeout(delay);
    }
  }, [state.password.value]);

  // RE ENTER PASSWORD AFTER DELAY
  useEffect(() => {
    if (state.reEnteredPassword.value) {
      const delay = setTimeout(() => dispatch({ type: 'reEnteredPasswordAfterDelay' }), 800);
      return () => clearTimeout(delay);
    }
  }, [state.reEnteredPassword.value]);

  // CHECK TOKEN
  useEffect(() => {
    const request = Axios.CancelToken.source();
    (async function fetchDataRelatedToPasswordResetToken() {
      try {
        const response = await Axios.post(
          '/choose-new-password',
          { passwordResetToken: state.passwordResetToken },
          { cancelToken: request.token }
        );
        if (response.data == 'Success') {
          // TOKEN IS VALID STAY ON THIS PAGE
          console.log('valid token');
        } else {
          history.push('/reset-password');
          appDispatch({
            type: 'flashMessageError',
            value:
              'Password reset token is invalid or has expired. Please generate another token below.',
          });
        }
      } catch (error) {
        console.log({ fetchDataRelatedToPasswordResetToken: error.message });
      }
    })();
    return () => request.cancel();
  }, []);

  // SEND FORM
  useEffect(() => {
    if (state.sendCount) {
      const request = Axios.CancelToken.source();
      (async function sendFormResetPassword() {
        try {
          const response = await Axios.post(
            '/save-new-password',
            {
              password: state.password.value,
              reEnteredPassword: state.reEnteredPassword.value,
              token: state.passwordResetToken,
            },
            { cancelToken: request.token }
          );
          if (response.data == 'Success') {
            history.push('/login');
            appDispatch({
              type: 'flashMessage',
              value: 'Password successfully changed. You can now login to your account.',
            });
          } else {
            appDispatch({ type: 'flashMessageError', value: response.data });
          }
        } catch (error) {
          console.log({ sendFormResetPassword: error.message });
        }
      })();
      return () => request.cancel();
    }
  }, [state.sendCount]);

  return (
    <Page title="Step 2 of 2: Choose New Password">
      <div className="flex flex-wrap w-full">
        {/* <!-- Form Section --> */}
        <div className="flex flex-col w-full lg:w-1/3">
          {/* LOGO */}
          <div className="flex justify-center bg-gray-900">
            <Link to="/" className="p-4 text-xl font-bold text-white focus:outline-none">
              <img className="w-32 h-32" src={appState.logo.url} alt={appState.logo.alt} />
            </Link>
          </div>
          <p className="text-3xl text-center pt-5">Choose a New Password</p>
          <p className="text-center text-lg mb-4 px-3">Step 2 of 2:</p>
          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col p-3 w-full sm:max-w-md mx-auto">
            <div className="relative mb-4">
              <label className="text-lg" htmlFor="password">
                New Password <span className="text-red-600">*</span>
              </label>
              <input
                onChange={e => dispatch({ type: 'passwordImmediately', value: e.target.value })}
                id="password"
                type="password"
                className="rounded w-full px-3 py-2 leading-tight text-gray-700 border shadow appearance-none focus:outline-none focus:shadow-outline"
              />
              <CSSTransition
                in={state.password.hasErrors}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit
              >
                <div style={CSSTransitionStyle} className="liveValidateMessage">
                  {state.password.message}
                </div>
              </CSSTransition>
            </div>
            <div className="relative mb-4">
              <label className="text-lg" htmlFor="re-enter-password">
                Re-enter New Password <span className="text-red-600">*</span>
              </label>
              <input
                onChange={e =>
                  dispatch({ type: 'reEnteredPasswordImmediately', value: e.target.value })
                }
                id="re-enter-password"
                type="password"
                className="rounded w-full px-3 py-2 leading-tight text-gray-700 border shadow appearance-none focus:outline-none focus:shadow-outline"
              />
              <p className="text-red-300 text-xs italic">
                Password should be a minimum of 6 characters
              </p>
              <CSSTransition
                in={state.reEnteredPassword.hasErrors}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit
              >
                <div style={CSSTransitionStyle} className="liveValidateMessage">
                  {state.reEnteredPassword.message}
                </div>
              </CSSTransition>
            </div>

            {/* SUBMIT BTN */}
            <button
              type="submit"
              className="w-full p-2 mt-8 text-lg font-bold text-white bg-black hover:bg-gray-700"
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
        </div>

        {/* <!-- Image Section --> */}
        <div className="w-2/3 shadow-2xl custom-layout-bg">
          <div className="hidden w-full h-screen lg:block"></div>
        </div>
      </div>
    </Page>
  );
}

ResetPasswordStep2.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ResetPasswordStep2);
