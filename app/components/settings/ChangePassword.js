import React, { useEffect, useContext } from 'react';
import Page from '../layouts/Page';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import StateContext from '../../contextsProviders/StateContext';
import DispatchContext from '../../contextsProviders/DispatchContext';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionStyle } from '../../helpers/CSSHelpers';

function ChangePassword() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const initialState = {
    currentPassword: {
      value: '',
      hasError: '',
      message: '',
    },
    newPassword: {
      value: '',
      hasError: '',
      message: '',
    },
    reEnteredNewPassword: {
      value: '',
      hasError: '',
      message: '',
    },
    submitCount: 0,
  };

  function changePasswordReducer(draft, action) {
    switch (action.type) {
      case 'currentPasswordImmediately':
        draft.currentPassword.hasError = false;
        draft.currentPassword.value = action.value;

        if (draft.currentPassword.value == '') {
          draft.currentPassword.hasError = true;
          draft.currentPassword.message = 'Current password field is empty.';
        }

        return;
      case 'newPasswordImmediately':
        draft.newPassword.hasError = false;
        draft.newPassword.value = action.value;

        if (draft.newPassword.value == '') {
          draft.newPassword.hasError = true;
          draft.newPassword.message = 'New password field is empty.';
        }
        return;
      case 'newPasswordAfterDelay':
        if (draft.newPassword.value.length < 6) {
          draft.newPassword.hasError = true;
          draft.newPassword.message = 'New password must be at least 6 characters.';
        }
        if (draft.newPassword.value.length > 50) {
          draft.newPassword.hasError = true;
          draft.newPassword.message = 'New password cannot exceed 50 characters.';
        }
        return;
      case 'reEnteredNewPasswordImmediately':
        draft.reEnteredNewPassword.hasError = false;
        draft.reEnteredNewPassword.value = action.value;

        if (draft.reEnteredNewPassword.value == '') {
          draft.reEnteredNewPassword.hasError = true;
          draft.reEnteredNewPassword.message = 'Re-enter password field is empty.';
        }
        return;
      case 'reEnterNewPasswordAfterDelay':
        if (draft.newPassword.value.length !== draft.reEnteredNewPassword.value.length) {
          draft.reEnteredNewPassword.hasError = true;
          draft.reEnteredNewPassword.message = 'Passwords do not match.';
        }
        return;
      case 'sendForm':
        if (
          !draft.currentPassword.hasError &&
          !draft.newPassword.hasError &&
          !draft.reEnteredNewPassword.hasError
        ) {
          draft.submitCount++;
        }
        return;
    }
  }

  const [state, changePasswordDispatch] = useImmerReducer(changePasswordReducer, initialState);

  // DELAY: NEW PASSWORD
  useEffect(() => {
    if (state.newPassword.value) {
      const delay = setTimeout(
        () => changePasswordDispatch({ type: 'newPasswordAfterDelay' }),
        800
      );

      return () => clearTimeout(delay);
    }
  }, [state.newPassword.value]);

  // DELAY: RE ENTER PASSWORD
  useEffect(() => {
    if (state.reEnteredNewPassword.value) {
      const delay = setTimeout(
        () => changePasswordDispatch({ type: 'reEnterNewPasswordAfterDelay' }),
        800
      );

      return () => clearTimeout(delay);
    }
  }, [state.reEnteredNewPassword.value]);

  // INITIAL SUBMIT
  function handleSubmit(e) {
    e.preventDefault();

    changePasswordDispatch({
      type: 'currentPasswordImmediately',
      value: state.currentPassword.value,
    });
    changePasswordDispatch({ type: 'newPasswordImmediately', value: state.newPassword.value });
    changePasswordDispatch({
      type: 'reEnteredNewPasswordImmediately',
      value: state.reEnteredNewPassword.value,
    });

    changePasswordDispatch({ type: 'sendForm' });
  }

  // SUBMIT FORM
  useEffect(() => {
    const request = Axios.CancelToken.source();
    if (state.submitCount) {
      try {
        (async function saveChangedPassword() {
          const response = await Axios.post(
            '/change-password',
            {
              currentPassword: state.currentPassword.value,
              password: state.newPassword.value,
              confirmPassword: state.reEnteredNewPassword.value,
              token: appState.user.token,
            },
            {
              cancelToken: request.token,
            }
          );
          if (response.data == 'Success') {
            //SUCCESS
            appDispatch({
              type: 'flashMsgSuccess',
              value: ['Updated successfully!'],
            });
          } else {
            appDispatch({
              type: 'flashMsgError',
              value: response.data,
            });
          }
        })();
      } catch (error) {
        console.log(error.message);
      }
    }
    return () => request.cancel();
  }, [state.submitCount]);

  return (
    <Page title="Settings - Profile Info">
      <div className="bg-gray-200 font-mono">
        <div className="w-full max-w-2xl p-6 mx-auto">
          <form onSubmit={handleSubmit} className="mt-6">
            <h2 className="pl-3 text-2xl text-gray-900 mb-4">Change Password</h2>
            <div className="relative w-full lg:w-1/2 px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Current Password
              </label>
              <input
                placeholder="Enter current password"
                value={state.currentPassword.value}
                onChange={e =>
                  changePasswordDispatch({
                    type: 'currentPasswordImmediately',
                    value: e.target.value,
                  })
                }
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                type="password"
              />
              <CSSTransition
                in={state.currentPassword.hasError}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit
              >
                <div style={CSSTransitionStyle} className="liveValidateMessage">
                  {state.currentPassword.message}
                </div>
              </CSSTransition>
            </div>
            <div className="relative w-full lg:w-1/2 px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                New Password
              </label>
              <input
                placeholder="Enter New Password"
                value={state.newPassword.value}
                onChange={e =>
                  changePasswordDispatch({ type: 'newPasswordImmediately', value: e.target.value })
                }
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                type="password"
              />
              <CSSTransition
                in={state.newPassword.hasError}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit
              >
                <div style={CSSTransitionStyle} className="liveValidateMessage">
                  {state.newPassword.message}
                </div>
              </CSSTransition>
            </div>
            <div className="relative w-full lg:w-1/2 px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Re-enter new password
              </label>
              <input
                placeholder="Enter Re-enter new password"
                value={state.reEnteredNewPassword.value}
                onChange={e =>
                  changePasswordDispatch({
                    type: 'reEnteredNewPasswordImmediately',
                    value: e.target.value,
                  })
                }
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                type="password"
              />
              <CSSTransition
                in={state.reEnteredNewPassword.hasError}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit
              >
                <div style={CSSTransitionStyle} className="liveValidateMessage">
                  {state.reEnteredNewPassword.message}
                </div>
              </CSSTransition>
            </div>

            <div className="w-full lg:w-1/2 flex justify-end px-3">
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
    </Page>
  );
}

export default ChangePassword;
