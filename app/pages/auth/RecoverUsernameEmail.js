import React, { useEffect, useContext } from 'react';
import Page from '../../components/layouts/Page';
import { Link, withRouter } from 'react-router-dom';
import DispatchContext from '../../contextsProviders/DispatchContext';
import Axios from 'axios';
import { useImmerReducer } from 'use-immer';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionStyle } from '../../helpers/CSSHelpers';
import StateContext from '../../contextsProviders/StateContext';
import FlashMsgError from '../../components/shared/FlashMsgError';

function ResetPasswordStep1() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const initialState = {
    email: {
      value: '',
      hasErrors: false,
      message: '',
      isRegisteredEmail: false,
      checkCount: 0,
      type: '',
    },
    isSendingToken: false,
    showNextStep: false,
    submitCount: 0,
  };

  function recoverUsernameEmailReducer(draft, action) {
    switch (action.type) {
      case 'emailImmediately':
        draft.email.hasErrors = false;
        draft.email.value = action.value.trim();
        if (!draft.email.value) {
          draft.email.hasErrors = true;
          draft.email.message = 'Email / Username field is empty.';
        }
        return;
      case 'emailAfterDelay':
        if (!/^\S+@\S+$/.test(draft.email.value)) {
          draft.email.hasErrors = true;
          draft.email.message = 'Please provide a valid email.';
        }
        return;
      case 'isRegisteredEmail':
        if (!action.value) {
          draft.email.hasErrors = true;
          draft.email.isRegisteredEmail = false;
          draft.email.message = `This email is not associated with any account.`;
        } else {
          draft.email.isRegisteredEmail = true;
        }
        return;
      case 'sendingToken':
        action.process == 'starts' && (draft.isSendingToken = true);
        action.process == 'ends' && (draft.isSendingToken = false);
        return;
      case 'showNextStep':
        draft.showNextStep = true;
        return;
      case 'closeAlert':
        draft.showNextStep = false;
        return;
      case 'submitForm':
        if (draft.email.value != '' && !draft.email.hasErrors && draft.email.isRegisteredEmail) {
          draft.submitCount++;
        }
        return;
    }
  }

  const [state, recoverUsernameEmailDispatch] = useImmerReducer(
    recoverUsernameEmailReducer,
    initialState
  );

  // EMAIL IS UNIQUE
  useEffect(() => {
    if (state.email.checkCount) {
      const request = Axios.CancelToken.source();
      const path = state.email.type == 'email' ? '/doesEmailExists' : '/doesUsernameExists';

      (async function checkemail() {
        try {
          const response = await Axios.post(
            path,
            {
              email: state.email.value,
            },
            { cancelToken: request.token }
          );

          recoverUsernameEmailDispatch({
            type: 'isRegisteredEmail',
            value: response.data,
            process: state.email.type,
          });
        } catch (error) {
          console.log('Having difficulty looking up your account. Please try again.');
        }
      })();

      return () => request.cancel();
    }
  }, [state.email.checkCount]);

  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(
        () => recoverUsernameEmailDispatch({ type: 'emailAfterDelay' }),
        800
      );
      return () => clearTimeout(delay);
    }
  }, [state.email.value]);

  // INITIATE FORM SUBMISSION
  function handleSubmit(e) {
    e.preventDefault();
    recoverUsernameEmailDispatch({ type: 'emailImmediately', value: state.email.value });
    recoverUsernameEmailDispatch({
      type: 'emailAfterDelay',
      value: state.email.value,
    });
    recoverUsernameEmailDispatch({ type: 'submitForm' });
  }

  // ACTUALLY SUBMIT
  useEffect(() => {
    if (state.submitCount && state.submitCount < 5) {
      const request = Axios.CancelToken.source();
      recoverUsernameEmailDispatch({ type: 'sendingToken', process: 'starts' });

      (async function submitForm() {
        try {
          const response = await Axios.post(
            '/reset-password-step-1',
            { email: state.email.value, type: state.email.type },
            { cancelToken: request.token }
          );

          recoverUsernameEmailDispatch({ type: 'sendingToken', process: 'ends' });

          response.data == 'Success'
            ? recoverUsernameEmailDispatch({ type: 'showNextStep' })
            : appDispatch({ type: 'flashMsgError', value: response.data });
        } catch (error) {
          recoverUsernameEmailDispatch({ type: 'sendingToken', process: 'ends' });
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
    <Page title="Recover Your Email Or Username">
      <div className="flex flex-wrap w-full">
        {/* <!-- Form Section --> */}
        <div className="flex flex-col w-full lg:w-1/3">
          {/* LOGO */}
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
          <p className="text-3xl text-center py-5 px-2">Recover Your Email Or Username</p>
          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col p-3 w-full sm:max-w-md mx-auto">
            {/* LABEL AND INPUT */}
            {!state.showNextStep && (
              <>
                <div className="relative flex flex-col">
                  <label className="text-lg" htmlFor="email-or-username">
                    Enter Your Recovery Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    onChange={e =>
                      recoverUsernameEmailDispatch({
                        type: 'emailImmediately',
                        value: e.target.value,
                      })
                    }
                    id="email-or-username"
                    autoComplete="off"
                    className="rounded w-full px-3 py-2 leading-tight text-gray-700 border shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                  />
                  <CSSTransition
                    in={state.email.hasErrors}
                    timeout={330}
                    className="liveValidateMessage"
                    unmountOnExit
                  >
                    <div style={CSSTransitionStyle} className="liveValidateMessage">
                      {state.email.message}
                    </div>
                  </CSSTransition>
                </div>
                {/* SUBMIT BTN */}
                <button
                  type="submit"
                  className="w-full p-2 mt-8 text-lg font-bold text-white bg-black hover:bg-gray-700"
                >
                  {state.isSendingToken ? (
                    <span>
                      <i className="text-sm fa fa-spinner fa-spin"></i>
                    </span>
                  ) : (
                    <>Email Me My Username and Email</>
                  )}
                </button>
              </>
            )}
            {/* SUCCESS MESSAGE */}
            {state.showNextStep && (
              <div
                style={{ backgroundColor: 'rgba(19, 84, 122, 1)' }}
                className="relative flex items-center text-white text-sm font-bold px-4 py-3"
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
                  onClick={() => recoverUsernameEmailDispatch({ type: 'closeAlert' })}
                  className="absolute top-0 right-0 px-4 py-3"
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
          </form>
          <div className="pt-12 pb-12 text-center">
            <p className="text-center text-xs mb-4 px-3">
              If you cannot remember any of your recovery emails, please email me at
              johnsidomusic@yahoo.com
            </p>

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
