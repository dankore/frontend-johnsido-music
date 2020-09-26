import React, { useEffect, useContext } from 'react';
import Page from '../layouts/Page';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import StateContext from '../../contextsProviders/StateContext';
import DispatchContext from '../../contextsProviders/DispatchContext';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionStyle } from '../../helpers/CSSHelpers';
import FlashMsgError from '../../components/shared/FlashMsgError';
import FlashMsgSuccess from '../../components/shared/FlashMsgSuccess';

function ChangePassword() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const initialState = {
    currentPassword: {
      value: '',
      hasError: false,
      message: '',
    },
    newPassword: {
      value: '',
      hasError: false,
      message: '',
    },
    reEnteredNewPassword: {
      value: '',
      hasError: false,
      message: '',
    },
    isSaving: false,
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
      case 'isSaving':
        if (action.process == 'starts') {
          draft.isSaving = true;
        } else {
          draft.isSaving = false;
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
    if (state.submitCount) {
      const request = Axios.CancelToken.source();
      changePasswordDispatch({ type: 'isSaving', process: 'starts' });
      appDispatch({ type: 'turnOff' }); // CLOSE FLASH MESSAGING MODAL IF OPENED
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

          changePasswordDispatch({ type: 'isSaving' });

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

      return () => request.cancel();
    }
  }, [state.submitCount]);

  return (
    <Page title="Settings - Profile Info">
      <form
        onSubmit={handleSubmit}
        className="mt-12 c-shadow bg-white w-full md:max-w-md md:mx-auto p-3"
      >
        <div className="mb-4 relative">
          <label className="w-full text-xs font-bold inline-block mb-1 uppercase tracking-wide text-gray-700">
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
            className="transition ease-in-out duration-150 shadow-inner py-2 px-4  bg-gray-200 focus:outline-none appearance-none focus:border-gray-500 focus:bg-white border rounded leading-tight w-full"
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
        <div className="mb-4 relative">
          <label className="w-full text-xs font-bold inline-block mb-1 uppercase tracking-wide text-gray-700">
            New Password
          </label>
          <input
            placeholder="Enter New Password"
            value={state.newPassword.value}
            onChange={e =>
              changePasswordDispatch({ type: 'newPasswordImmediately', value: e.target.value })
            }
            className="transition ease-in-out duration-150 shadow-inner py-2 px-4  bg-gray-200 focus:outline-none appearance-none focus:border-gray-500 focus:bg-white border rounded leading-tight w-full"
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
        <div className="mb-4 relative">
          <label className="w-full text-xs font-bold inline-block mb-1 uppercase tracking-wide text-gray-700">
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
            className="transition ease-in-out duration-150 shadow-inner py-2 px-4  bg-gray-200 focus:outline-none appearance-none focus:border-gray-500 focus:bg-white border rounded leading-tight w-full"
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

        {/* SUBMIT BUTTON */}
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
              <>Change Password</>
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
    </Page>
  );
}

export default ChangePassword;
