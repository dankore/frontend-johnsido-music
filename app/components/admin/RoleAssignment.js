import React, { useContext, useEffect } from 'react';
import StateContext from '../../contextsProviders/StateContext';
import DispatchContext from '../../contextsProviders/DispatchContext';
import Axios from 'axios';
import { useImmerReducer } from 'use-immer';
import { useParams } from 'react-router-dom';
import LoadingDotsAnimation from '../shared/LoadingDotsAnimation';
import ReuseableModal from './ReuseableModal';

function RoleAssignment() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const { username } = useParams();
  const initialState = {
    adminStats: {
      allUserDocs: [],
    },
    isFetching: false,
    active: {
      username: '',
      toggleModal: false,
    },
    admin: {
      username: '',
      toggleModal: false,
    },
  };

  function roleAssignmentReducer(draft, action) {
    switch (action.type) {
      case 'fetchAdminStatsComplete':
        draft.adminStats = action.value;
        return;
      case 'isFetchingStarts':
        draft.isFetching = true;
        return;
      case 'isFetchingEnds':
        draft.isFetching = false;
        return;
      case 'toggleActiveModal':
        draft.active.username = action.value;
        draft.active.toggleModal = !draft.active.toggleModal;
        return;
      case 'toggleAdminModal':
        draft.admin.username = action.value;
        draft.admin.toggleModal = !draft.admin.toggleModal;
        return;
      case 'updateRole': {
        const indexInDocs = draft.adminStats.allUserDocs
          .map(userDoc => userDoc.username)
          .indexOf(action.value);

        if (action.process == 'downgrade') {
          const indexOfAdmin = draft.adminStats.allUserDocs[indexInDocs].scope.indexOf('admin');

          draft.adminStats.allUserDocs[indexInDocs].scope.splice(indexOfAdmin, 1);
        }

        if (action.process == 'upgrade') {
          draft.adminStats.allUserDocs[indexInDocs].scope.push('admin');
        }

        if (action.process == 'inactivate') {
          draft.adminStats.allUserDocs[indexInDocs].active = false;
        }
        if (action.process == 'activate') {
          draft.adminStats.allUserDocs[indexInDocs].active = true;
        }
        return;
      }
    }
  }

  const [state, roleAssignmentDispatch] = useImmerReducer(roleAssignmentReducer, initialState);

  // FETCH
  useEffect(() => {
    const request = Axios.CancelToken.source();
    roleAssignmentDispatch({ type: 'isFetchingStarts' });

    (async function getAdminStats() {
      try {
        const response = await Axios.post(
          `/admin-stats/${username}`,
          { token: appState.user.token },
          { cancelToken: request.token }
        );

        roleAssignmentDispatch({ type: 'isFetchingEnds' });

        if (response.data.adminStats) {
          roleAssignmentDispatch({
            type: 'fetchAdminStatsComplete',
            value: response.data.adminStats,
          });
        } else {
          // NOT AN ADMIN
          history.push('/');
          appDispatch({ type: 'flashMsgError', value: response.data });
        }
      } catch (error) {
        // FAIL SILENTLY
        console.log(error);
      }
    })();

    return () => request.cancel();
  }, [username]);

  // BAN USERS
  async function handleBanUser(e) {
    try {
      const userId = e.target.getAttribute('data-userid');
      const username = e.target.getAttribute('data-username');
      const type = e.target.getAttribute('data-type');
      const confirm = window.confirm('Are you sure?');

      if (confirm) {
        const response = await Axios.post(`/admin/${appState.user.username}/handleBanUser`, {
          userId,
          type,
          token: appState.user.token,
        });
        if (response.data == 'Success') {
          // SUCCESS
          roleAssignmentDispatch({ type: 'toggleActiveModal' });
          roleAssignmentDispatch({ type: 'updateRole', value: username, process: type });
        } else {
          // FAILURE
          console.log(response.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // FROM ADMIN TO USER
  async function handleDowngradeUpgrade(e) {
    try {
      const userId = e.target.getAttribute('data-userid');
      const username = e.target.getAttribute('data-username');
      const type = e.target.getAttribute('data-type');
      const confirm = window.confirm('Are you sure?');

      if (confirm) {
        const response = await Axios.post(`/admin/${appState.user.username}/handleRoleAssignment`, {
          userId,
          type,
          token: appState.user.token,
        });

        if (response.data == 'Success') {
          // SUCCESS
          roleAssignmentDispatch({ type: 'toggleAdminModal' });
          roleAssignmentDispatch({ type: 'updateRole', value: username, process: type });
        } else {
          // FAILURE
          console.log(response.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (state.isFetching) {
    return <LoadingDotsAnimation />;
  }

  function toggleAdminModal() {
    roleAssignmentDispatch({ type: 'toggleAdminModal' });
  }

  return (
    <div className="relative">
      <div className="bg-blue-800 px-2 pt-6 pb-4 shadow text-xl text-white">
        <h3 className="font-bold pl-2"> Role Assignment </h3>
      </div>
      <div>
        {/* SEARCH */}
        <div className="flex flex-1 mx-auto md:w-1/3 justify-center text-white">
          <span className="relative w-full">
            <input
              type="search"
              placeholder="Search"
              className="w-full bg-gray-900 text-sm text-white transition border border-transparent focus:outline-none focus:border-gray-700 py-1 px-2 pl-10 appearance-none leading-normal"
            />
            <div
              className="absolute"
              style={{
                top: 0.5 + 'rem',
                left: 0.8 + 'rem',
              }}
            >
              <svg
                className="fill-current pointer-events-none text-white w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
              </svg>
            </div>
          </span>
        </div>
      </div>
      {/* MAIN CONTENT */}
      <div className="flex flex-wrap justify-center">
        <div className="px-3 bg-gray-900 text-white">
          <p>Click to edit roles</p>
        </div>
        {/* ROLES */}
        <div className="overflow-y-auto" style={{ maxHeight: 500 + 'px' }}>
          {state.adminStats.allUserDocs.map((user, index) => {
            return (
              <div key={index} className="flex flex-wrap bg-white justify-center">
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
                      onClick={() =>
                        roleAssignmentDispatch({ type: 'toggleActiveModal', value: user.username })
                      }
                      className="underline px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                    >
                      Active
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        roleAssignmentDispatch({ type: 'toggleActiveModal', value: user.username })
                      }
                      className="underline px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                    >
                      Inactive
                    </button>
                  )}
                </div>

                <div className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                  {user.scope.indexOf('admin') > -1 ? (
                    <button
                      onClick={() =>
                        roleAssignmentDispatch({ type: 'toggleAdminModal', value: user.username })
                      }
                      className="underline px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                    >
                      Admin
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        roleAssignmentDispatch({ type: 'toggleAdminModal', value: user.username })
                      }
                      className="underline px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                    >
                      User
                    </button>
                  )}
                </div>
                {/* ACTIVE MODAL */}
                {state.active.toggleModal && state.active.username == user.username && (
                  <>
                    {user.active ? (
                      <div className="absolute bg-white border p-3 text-center">
                        <p className="mb-3">
                          In activate {user.firstName} {user.lastName}&apos;s account?
                        </p>
                        <div className="flex">
                          <button
                            onClick={handleBanUser}
                            data-userid={user._id}
                            data-username={user.username}
                            data-type="inactivate"
                            className="mr-5 text-red-600"
                          >
                            Yes inactivate account
                          </button>
                          <button
                            onClick={() => roleAssignmentDispatch({ type: 'toggleActiveModal' })}
                          >
                            {' '}
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute bg-white border p-3 text-center">
                        <p className="mb-3">
                          Activate {user.firstName} {user.lastName}&apos;s account?
                        </p>
                        <div className="flex">
                          <button
                            onClick={handleBanUser}
                            data-userid={user._id}
                            data-username={user.username}
                            data-type="activate"
                            className="mr-5 text-red-600"
                          >
                            Yes activate account
                          </button>
                          <button
                            onClick={() => roleAssignmentDispatch({ type: 'toggleActiveModal' })}
                          >
                            {' '}
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* ADMIN MODAL */}
                {state.admin.toggleModal && state.admin.username == user.username && (
                  <>
                    {user.scope.indexOf('admin') > -1 ? (
                      // <div className="absolute bg-white border p-3 text-center">
                      //   <p className="mb-3">
                      //     Downgrade {user.firstName} {user.lastName}?
                      //   </p>
                      //   <div className="flex">
                      //     <button
                      //       onClick={handleDowngradeUpgrade}
                      //       data-userid={user._id}
                      //       data-username={user.username}
                      //       data-type="downgrade"
                      //       className="mr-5 text-red-600"
                      //     >
                      //       Yes downgrade to a USER
                      //     </button>
                      //     <button
                      //       onClick={() => roleAssignmentDispatch({ type: 'toggleAdminModal' })}
                      //     >
                      //       {' '}
                      //       Cancel
                      //     </button>
                      //   </div>
                      // </div>
                      <ReuseableModal
                        user={user}
                        type="downgrade"
                        btnText="Yes downgrade to a USER"
                        warningText="Are you sure you want to do this?"
                        handleToggle={toggleAdminModal}
                        handleSubmit={handleDowngradeUpgrade}
                      />
                    ) : (
                      <div className="absolute bg-white border p-3 text-center">
                        <p className="mb-3">
                          Upgrade {user.firstName} {user.lastName} to admin?
                        </p>
                        <div className="flex">
                          <button
                            onClick={handleDowngradeUpgrade}
                            data-userid={user._id}
                            data-username={user.username}
                            data-type="upgrade"
                            className="mr-5 text-red-600"
                          >
                            Yes upgrade to an ADMIN
                          </button>
                          <button
                            onClick={() => roleAssignmentDispatch({ type: 'toggleAdminModal' })}
                          >
                            {' '}
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RoleAssignment;
