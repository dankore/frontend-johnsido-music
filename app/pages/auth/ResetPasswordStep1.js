import React, { useEffect, useContext } from 'react';
import Page from '../../components/layouts/Page';
import { Link, withRouter } from 'react-router-dom';
import DispatchContext from '../../contextsProviders/DispatchContext';
import Axios from 'axios';
import { useImmerReducer } from 'use-immer';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionStyle } from '../../helpers/CSSHelpers';
import StateContext from '../../contextsProviders/StateContext';

function ResetPasswordStep1() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const initialState = {
    usernameOrEmail: {
      value: '',
      hasErrors: false,
      message: '',
      isRegisteredUsernameOrEmail: false,
      checkCount: 0,
      type: '',
    },
    isLoggingIn: false,
    showNextStep: false,
    submitCount: 0,
  };

  function resetPasswordStep1Reducer(draft, action) {
    switch (action.type) {
      case 'emailImmediately':
        draft.usernameOrEmail.hasErrors = false;
        draft.usernameOrEmail.value = action.value.trim();
        if (!draft.usernameOrEmail.value) {
          draft.usernameOrEmail.hasErrors = true;
          draft.usernameOrEmail.message = 'Email / Username field is empty.';
        }
        return;
      case 'usernameOrEmailAfterDelay':
        if (/@/.test(draft.usernameOrEmail.value)) {
          // IF USER ENTERS AN EMAIL
          if (!/^\S+@\S+$/.test(draft.usernameOrEmail.value)) {
            draft.usernameOrEmail.hasErrors = true;
            draft.usernameOrEmail.message = 'Please provide a valid email.';
          }

          if (!draft.usernameOrEmail.hasErrors) {
            draft.usernameOrEmail.checkCount++;
            draft.usernameOrEmail.type = 'email';
          }
        } else {
          // IF USER ENTERS A USERNAME
          if (!draft.usernameOrEmail.hasErrors) {
            draft.usernameOrEmail.checkCount++;
            draft.usernameOrEmail.type = 'username';
          }
        }
        return;
      case 'isRegisteredUsernameOrEmail':
        if (!action.value) {
          draft.usernameOrEmail.hasErrors = true;
          draft.usernameOrEmail.isRegisteredUsernameOrEmail = false;
          draft.usernameOrEmail.message = `No account with that ${action.process} exists.`;
        } else {
          draft.usernameOrEmail.isRegisteredUsernameOrEmail = true;
        }
        return;
      case 'isSendingTokenStart':
        draft.isLoggingIn = true;
        return;
      case 'isSendingTokenFinished':
        draft.isLoggingIn = false;
        return;
      case 'showNextStep':
        draft.showNextStep = true;
        return;
      case 'closeAlert':
        draft.showNextStep = false;
        return;
      case 'submitForm':
        if (
          draft.usernameOrEmail.value != '' &&
          !draft.usernameOrEmail.hasErrors &&
          draft.usernameOrEmail.isRegisteredUsernameOrEmail
        ) {
          draft.submitCount++;
        }
        return;
    }
  }

  const [state, resetPasswordStep1Dispatch] = useImmerReducer(
    resetPasswordStep1Reducer,
    initialState
  );

  // EMAIL IS UNIQUE
  useEffect(() => {
    if (state.usernameOrEmail.checkCount) {
      const request = Axios.CancelToken.source();
      const path =
        state.usernameOrEmail.type == 'email' ? '/doesEmailExists' : '/doesUsernameExists';

      (async function checkusernameOrEmail() {
        try {
          const response = await Axios.post(
            path,
            {
              ...(state.usernameOrEmail.type == 'email' && { email: state.usernameOrEmail.value }),
              ...(state.usernameOrEmail.type == 'username' && {
                username: state.usernameOrEmail.value,
              }),
            },
            { cancelToken: request.token }
          );

          resetPasswordStep1Dispatch({
            type: 'isRegisteredUsernameOrEmail',
            value: response.data,
            process: state.usernameOrEmail.type,
          });
        } catch (error) {
          console.log('Having difficulty looking up your email. Please try again.');
        }
      })();

      return () => request.cancel();
    }
  }, [state.usernameOrEmail.checkCount]);

  useEffect(() => {
    if (state.usernameOrEmail.value) {
      const delay = setTimeout(
        () => resetPasswordStep1Dispatch({ type: 'usernameOrEmailAfterDelay' }),
        800
      );
      return () => clearTimeout(delay);
    }
  }, [state.usernameOrEmail.value]);

  // INITIATE FORM SUBMISSION
  function handleSubmit(e) {
    e.preventDefault();
    resetPasswordStep1Dispatch({ type: 'emailImmediately', value: state.usernameOrEmail.value });
    resetPasswordStep1Dispatch({
      type: 'usernameOrEmailAfterDelay',
      value: state.usernameOrEmail.value,
    });
    resetPasswordStep1Dispatch({ type: 'submitForm' });
  }

  // ACTUALLY SUBMIT
  useEffect(() => {
    if (state.submitCount && state.submitCount < 5) {
      const request = Axios.CancelToken.source();
      resetPasswordStep1Dispatch({ type: 'isSendingTokenStart' });

      (async function submitForm() {
        try {
          const response = await Axios.post(
            '/reset-password-step-1',
            { usernameOrEmail: state.usernameOrEmail.value, type: state.usernameOrEmail.type },
            { cancelToken: request.token }
          );

          resetPasswordStep1Dispatch({ type: 'isSendingTokenFinished' });

          response.data == 'Success'
            ? resetPasswordStep1Dispatch({ type: 'showNextStep' })
            : appDispatch({ type: 'flashMsgError', value: response.data });
        } catch (error) {
          resetPasswordStep1Dispatch({ type: 'isSendingTokenFinished' });
          appDispatch({
            type: 'flashMsgError',
            value: "Sorry, there's a problem requesting a token. Please try again.",
          });
        }
      })();

      return () => request.cancel();
    }
  }, [state.submitCount]);

  return (
    <Page title="Step 1 of 2: Enter Email">
      <div className="flex flex-wrap w-full">
        {/* <!-- Form Section --> */}
        <div className="flex flex-col w-full lg:w-1/3">
          {/* LOGO */}
          <div className="flex justify-center bg-gray-900">
            <Link to="/" className="p-4 text-xl font-bold text-white focus:outline-none">
              <img className="w-32 h-32" src={appState.logo.url} alt={appState.logo.alt} />
            </Link>
          </div>
          <p className="text-3xl text-center pt-5">Password Recovery</p>
          <p className="text-center text-lg mb-4 px-3">Step 1 of 2:</p>
          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col p-3 w-full sm:max-w-md mx-auto">
            {/* EMAIL */}
            <div className="relative flex flex-col">
              {state.showNextStep && (
                <div
                  style={{ backgroundColor: 'rgba(19, 84, 122, 1)' }}
                  className="absolute z-10 flex items-center text-white text-sm font-bold px-4 py-3"
                >
                  <svg
                    className="fill-current w-20 h-20 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                  </svg>
                  <p>
                    Check your email inbox for further instruction. Check your SPAM folder if you
                    cannot locate the email in your regular inbox.
                  </p>
                  <span
                    onClick={() => resetPasswordStep1Dispatch({ type: 'closeAlert' })}
                    className="absolute top-0 bottom-0 right-0 px-4 py-3"
                  >
                    <svg
                      className="fill-current h-6 w-6 text-red-500"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <title>Close</title>
                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                  </span>
                </div>
              )}
              <label className="text-lg" htmlFor="email-or-username">
                Enter Your Username or Email <span className="text-red-600">*</span>
              </label>
              <input
                onChange={e =>
                  resetPasswordStep1Dispatch({ type: 'emailImmediately', value: e.target.value })
                }
                id="email-or-username"
                autoComplete="off"
                className="rounded w-full px-3 py-2 leading-tight text-gray-700 border shadow appearance-none focus:outline-none focus:shadow-outline"
                type="text"
              />
              <CSSTransition
                in={state.usernameOrEmail.hasErrors}
                timeout={330}
                className="liveValidateMessage"
                unmountOnExit
              >
                <div style={CSSTransitionStyle} className="liveValidateMessage">
                  {state.usernameOrEmail.message}
                </div>
              </CSSTransition>
            </div>
            {/* SUBMIT BTN */}
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
              Remember your password?
              <Link
                to="/login"
                className="font-semibold underline px-2 focus:outline-none hover:text-gray-800 focus:text-gray-700"
              >
                Login in here.
              </Link>
            </p>
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

export default withRouter(ResetPasswordStep1);
