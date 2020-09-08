import React from 'react';
import Page from '../layouts/Page';

function Container() {
  return (
    <Page title="Delete Account">
      <div className="bg-gray-200 font-mono py-10">
        <form className="mt-5">
          <h2 className="w-full sm:max-w-lg mx-auto text-2xl text-gray-900 mb-4 pl-3 sm:pl-0">
            Delete Account
          </h2>
          <div className="w-full sm:max-w-lg mx-auto p-3 bg-white">
            <div>
              <div className="flex items-start">
                <div className="mx-auto">
                  <i className="fas fa-exclamation-triangle mr-3"></i>
                </div>
                <div>
                  <h2>Delete Account</h2>
                  <p>
                    Are you sure you want to delete your account? All of your data will be
                    permanently remove. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div>
                <button
                  className="mr-5 px-4 py-2 border border-green-600 text-base leading-6 font-medium rounded-md bg-white hover:bg-gray-100 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                  type="submit"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md bg-red-600 text-white hover:bg-red-800 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                  type="submit"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Page>
  );
}

export default Container;
