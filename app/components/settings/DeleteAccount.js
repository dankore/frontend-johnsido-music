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
      <form onSubmit={handleDelete} className="mt-24">
        <div className="w-full sm:max-w-lg mx-auto bg-white border c-shadow">
          <h3 className="p-3 text-2xl">Are you sure?</h3>
          <div className="flex items-start p-3">
            <div>
              <p className="text-sm leading-5 text-gray-700">
                All of your data will be permanently removed e.g people you followed, people
                following you, comments and more. This action cannot be undone.
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-5 bg-gray-200 px-3 py-2">
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
