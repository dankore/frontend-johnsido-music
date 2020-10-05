import React, { useContext, useState } from 'react';
import Page from '../layouts/Page';
import Axios from 'axios';
import StateContext from '../../contextsProviders/StateContext';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import DispatchContext from '../../contextsProviders/DispatchContext';
import ReuseableModal from '../admin/ReuseableModal';

function DeleteAccount({ history }) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(prev => (prev = !prev));
  }

  async function handleDelete() {
    try {
      setIsDeleting(true);

      await Axios.post('/delete-account', { token: appState.user.token });

      setIsDeleting(false);

      appDispatch({ type: 'logout' }); // REMOVES LOCAL STORAGE OBJECTS

      history.push('/');

      appDispatch({
        type: 'flashMsgSuccess',
        value: ['Account deletion success. We are sorry to see you go. Please come back again.'],
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Page title="Delete Account">
      <div className="mt-24">
        <div className="w-full mx-auto bg-white border sm:max-w-lg c-shadow">
          <h3 className="p-3 text-2xl">Are you sure?</h3>
          <div className="flex items-start p-3">
            <div>
              <p className="text-sm leading-5 text-gray-700">
                All of your data will be permanently removed e.g people you followed, people
                following you, comments and more. This action cannot be undone.
              </p>
            </div>
          </div>
          <div className="flex justify-end px-3 py-2 mt-5 bg-gray-200">
            <button
              onClick={toggleModal}
              className="px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md hover:bg-red-800 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Delete my Account
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <ReuseableModal
          user={appState.user}
          type="delete"
          btnText="Yes, Delete my Account"
          handleToggle={toggleModal}
          handleSubmit={handleDelete}
          loading={isDeleting}
        />
      )}
    </Page>
  );
}

DeleteAccount.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(DeleteAccount);
