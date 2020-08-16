import React from 'react';
import Page from '../layouts/Page';
import { useImmerReducer } from 'use-immer';

function ChangePassword() {
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
  };

  function changePasswordReducer(draft, action) {
    switch (action.type) {
      case 'currentPasswordImmediately':
        draft.currentPassword.hasError = false;
        draft.currentPassword.value = action.value;
        return;
      case 'newPasswordImmediately':
        draft.newPassword.hasError = false;
        draft.newPassword.value = action.value;
        return;
      case 'reEnteredNewPasswordImmediately':
        draft.reEnteredNewPassword.hasError = false;
        draft.reEnteredNewPassword.value = action.value;
        return;
    }
  }

  const [state, changePasswordDispatch] = useImmerReducer(changePasswordReducer, initialState);

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <Page title="Settings - Profile Info">
      <div className="bg-gray-200 font-mono">
        <div className="w-full max-w-2xl p-6 mx-auto">
          <form onSubmit={handleSubmit} className="mt-6">
            <h2 className="pl-3 text-2xl text-gray-900 mb-4">Change Password</h2>
            <div className="relative w-full md:w-1/2 px-3 mb-6">
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
              {state.currentPassword.hasError && (
                <div className="absolute text-sm text-red-600">{state.currentPassword.message}</div>
              )}
            </div>
            <div className="relative w-full md:w-1/2 px-3 mb-6">
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
              {state.newPassword.hasError && (
                <div className="absolute text-sm text-red-600">{state.newPassword.message}</div>
              )}
            </div>
            <div className="relative w-full md:w-1/2 px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Re-enter currrent password
              </label>
              <input
                placeholder="Enter Re-enter currrent password"
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
              {state.reEnteredNewPassword.hasError && (
                <div className="absolute text-sm text-red-600">
                  {state.reEnteredNewPassword.message}
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 flex justify-end">
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
