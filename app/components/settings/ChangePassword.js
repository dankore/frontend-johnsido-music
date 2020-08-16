import React from 'react';
import Page from '../layouts/Page';

function ChangePassword() {
  function handleSubmit() {}
  return (
    <Page title="Settings - Profile Info">
      <div className="bg-gray-200 font-mono">
        <div className="w-full max-w-2xl p-6 mx-auto">
          <form onSubmit={handleSubmit} className="mt-6">
            <h2 className="pl-3 text-2xl text-gray-900">Change Password</h2>
            <div className="relative w-full md:w-1/2 px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Current Password
              </label>
              <input
                placeholder="Enter current password"
                // value={state.firstName.value}
                // onChange={e =>
                //   profileInfoDispatch({ type: 'firstNameImmediately', value: e.target.value })
                // }
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                type="text"
              />
              {/* {state.firstName.hasError && (
                    <div className="absolute text-sm text-red-600">{state.firstName.message}</div>
                  )} */}
            </div>
            <div className="relative w-full md:w-1/2 px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                New Password
              </label>
              <input
                placeholder="Enter New Password"
                // value={state.lastName.value}
                // onChange={e =>
                //   profileInfoDispatch({ type: 'lastNameImmediately', value: e.target.value })
                // }
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                type="text"
              />
              {/* {state.lastName.hasError && (
                    <div className="absolute text-sm text-red-600">{state.lastName.message}</div>
                  )} */}
            </div>
            <div className="relative w-full md:w-1/2 px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Re-enter currrent password
              </label>
              <input
                placeholder="Enter Re-enter currrent password"
                // value={state.lastName.value}
                // onChange={e =>
                //   profileInfoDispatch({ type: 'lastNameImmediately', value: e.target.value })
                // }
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                type="text"
              />
              {/* {state.lastName.hasError && (
                    <div className="absolute text-sm text-red-600">{state.lastName.message}</div>
                  )} */}
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
