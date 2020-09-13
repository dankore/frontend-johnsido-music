import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import StateContext from '../../contextsProviders/StateContext';

function RoleUserTemplate({ allUserDocs }) {
  const appState = useContext(StateContext);
  const initialState = {
    allUserDocs: [],
    active: {
      toggleModal: false,
    },
    admin: {
      toggleModal: false,
    },
  };

  function roleTemplateReducer(draft, action) {
    switch (action.type) {
      case 'toggleActiveModal':
        draft.active.toggleModal = !draft.active.toggleModal;
        return;
      case 'toggleAdminModal':
        draft.admin.toggleModal = !draft.admin.toggleModal;
        return;
      case 'updateRole':
        // if(action.process == 'downgrade'){

        // }
        return;
    }
  }

  const [state, roleTemplateDispatch] = useImmerReducer(roleTemplateReducer, initialState);

  async function handleIntivation(e) {
    try {
      const userId = e.target.getAttribute('data-userid');
      const username = e.target.getAttribute('data-username');
      const confirm = window.confirm('Are you sure?');
      const parent = e.target.parentElement.parentElement.parentElement;
      if (confirm) {
        const response = await Axios.post(`/admin/${username}/inactivateAccount`, {
          userId,
          token: appState.user.token,
        });
        if (response.data == 'Success') {
          // SUCCESS
          roleTemplateDispatch({ type: 'toggleActiveModal' });
          roleTemplateDispatch({ type: 'updateRole', process: 'downgrade' });
          console.log(parent);
        } else {
          // FAILURE
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDowngrade(e) {
    try {
      const userId = e.target.getAttribute('data-userid');
      const username = e.target.getAttribute('data-username');
      const confirm = window.confirm('Are you sure?');
      const parent = e.target.parentElement.parentElement.parentElement.children[2].innerText;

      if (confirm) {
        const response = await Axios.post(`/admin/${username}/downgradeAdminToUser`, {
          userId,
          token: appState.user.token,
        });

        if (response.data == 'Success') {
          // SUCCESS
          roleTemplateDispatch({ type: 'toggleAdminModal' });
          roleTemplateDispatch({ type: 'updateRole', process: 'downgrade' });
          console.log(parent);
        } else {
          // FAILURE
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {allUserDocs.map((user, index) => {
        return (
          <div key={index} className="relative flex flex-wrap bg-white justify-center">
            <div className="px-6 py-4 whitespace-no-wrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                </div>
                <div className="ml-4">
                  <div className="text-sm leading-5 font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-sm leading-5 text-gray-500">@{user.username}</div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 whitespace-no-wrap">
              <div className="text-sm leading-5 text-gray-900">
                {user.about.bio.substring(0, 15)}
              </div>
              <div className="text-sm leading-5 text-gray-500">Optimization</div>
            </div>
            <div className="px-6 py-4 whitespace-no-wrap">
              {user.active ? (
                <button
                  onClick={() => roleTemplateDispatch({ type: 'toggleActiveModal' })}
                  className="underline px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                >
                  Active
                </button>
              ) : (
                <button className="underline px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  Inactive
                </button>
              )}
            </div>

            <div className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
              {user.scope.indexOf('admin') > -1 ? (
                <button
                  onClick={() => roleTemplateDispatch({ type: 'toggleAdminModal' })}
                  className="underline px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                >
                  Admin
                </button>
              ) : (
                <button className="underline px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  User
                </button>
              )}
            </div>
            {/* ACTIVE MODAL */}
            {state.active.toggleModal && (
              <div className="absolute bg-white border p-3 text-center">
                <p className="mb-3">
                  In activate {user.firstName} {user.lastName}&apos;s account?
                </p>
                <div className="flex">
                  <button
                    onClick={handleIntivation}
                    data-userid={user._id}
                    data-username={user.username}
                    className="mr-5 text-red-600"
                  >
                    Yes inactivate account
                  </button>
                  <button onClick={() => roleTemplateDispatch({ type: 'toggleActiveModal' })}>
                    {' '}
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {/* ADMIN MODAL */}
            {state.admin.toggleModal && (
              <div className="absolute bg-white border p-3 text-center">
                <p className="mb-3">
                  Downgrade {user.firstName} {user.lastName}?
                </p>
                <div className="flex">
                  <button
                    onClick={handleDowngrade}
                    data-userid={user._id}
                    data-username={user.username}
                    className="mr-5 text-red-600"
                  >
                    Yes downgrade to a USER
                  </button>
                  <button onClick={() => roleTemplateDispatch({ type: 'toggleAdminModal' })}>
                    {' '}
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

RoleUserTemplate.propTypes = {
  allUserDocs: PropTypes.array.isRequired,
};

export default RoleUserTemplate;
