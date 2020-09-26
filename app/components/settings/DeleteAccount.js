import React, { useContext } from 'react';
import Page from '../layouts/Page';
import Axios from 'axios';
import StateContext from '../../contextsProviders/StateContext';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import DispatchContext from '../../contextsProviders/DispatchContext';

function DeleteAccount({ history }) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  async function handleDelete(e) {
    e.preventDefault();
    const areYouSure = window.confirm('Are you sure?');

    try {
      if (areYouSure) {
        await Axios.post('/delete-account', { token: appState.user.token });

        appDispatch({ type: 'logout' }); // REMOVES LOCAL STORAGE OBJECTS

        history.push('/');

        appDispatch({
          type: 'flashMsgSuccess',
          value: ['Account deletion success. We are sorry to see you go. Please come back again.'],
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Page title="Delete Account">
      <form onSubmit={handleDelete} className="mt-5">
        <div className="w-full sm:max-w-lg mx-auto p-3 bg-white border c-shadow">
          <div>
            <div className="flex items-start">
              <div>
                <p className="mt-3 text-sm leading-5 text-gray-700">
                  Are you sure you want to delete your account? All of your data will be permanently
                  removed e.g people you followed, people following you, comments and more. This
                  action cannot be undone.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md bg-red-600 text-white hover:bg-red-800 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              type="submit"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </Page>
  );
}

DeleteAccount.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(DeleteAccount);
