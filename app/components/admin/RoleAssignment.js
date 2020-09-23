import React, { useContext, useEffect } from 'react';
import StateContext from '../../contextsProviders/StateContext';
import DispatchContext from '../../contextsProviders/DispatchContext';
import Axios from 'axios';
import { useImmerReducer } from 'use-immer';
import { useParams, Link, withRouter } from 'react-router-dom';
import LoadingDotsAnimation from '../shared/LoadingDotsAnimation';
import ReuseableModal from './ReuseableModal';
import Page from '../layouts/Page';
import ReuseableButton from './ReuseableButton';
import PropTypes from 'prop-types';

function RoleAssignment({ history }) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const { username } = useParams();
  const initialState = {
    adminStats: {
      allUserDocs: [],
    },
    search: {
      text: '',
      loading: false,
      sendCount: 0,
      fetchUsers: 0,
    },
    triggeredDuringSearch: false,
    isFetching: false,
    active: {
      username: '',
      toggleModal: false,
      loading: false,
    },
    admin: {
      username: '',
      toggleModal: false,
      loading: false,
    },
  };

  function roleAssignmentReducer(draft, action) {
    switch (action.type) {
      case 'fetchAdminStatsComplete':
        action.process == 'search'
          ? (draft.triggeredDuringSearch = true)
          : (draft.triggeredDuringSearch = false);

        draft.adminStats = action.value;
        return;
      case 'search':
        draft.search.text = action.value;
        if (draft.search.text == '') {
          draft.search.fetchUsers++;
        }
        return;
      case 'isSearching':
        action.process == 'starts' ? (draft.search.loading = true) : (draft.search.loading = false);
        return;
      case 'searchCount':
        draft.search.sendCount++;
        return;
      case 'isFetchingStarts':
        draft.isFetching = true;
        return;
      case 'isFetchingEnds':
        draft.isFetching = false;
        return;
      case 'loading':
        if (action.process == 'active-starts') {
          draft.active.loading = true;
        }
        if (action.process == 'active-ends') {
          draft.active.loading = false;
        }
        if (action.process == 'admin-starts') {
          draft.admin.loading = true;
        }
        if (action.process == 'admin-ends') {
          draft.admin.loading = false;
        }
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
    (async function getAdminStats() {
      const request = Axios.CancelToken.source();
      roleAssignmentDispatch({ type: 'isFetchingStarts' });

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
      return () => request.cancel();
    })();
  }, [username, state.search.fetchUsers]);

  //   BAN/UNBAN USERS
  async function handleBanUser(e) {
    try {
      roleAssignmentDispatch({ type: 'loading', process: 'active-starts' });
      const userId = e.target.getAttribute('data-userid');
      const username = e.target.getAttribute('data-username');
      const type = e.target.getAttribute('data-type');

      const response = await Axios.post(`/admin/${appState.user.username}/handleBanUser`, {
        userId,
        type,
        token: appState.user.token,
      });

      roleAssignmentDispatch({ type: 'loading', process: 'active-ends' });

      if (response.data == 'Success') {
        // SUCCESS
        roleAssignmentDispatch({ type: 'toggleActiveModal' });
        roleAssignmentDispatch({ type: 'updateRole', value: username, process: type });
      } else {
        // FAILURE
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // FROM ADMIN TO USER, USER TO ADMIN
  async function handleDowngradeUpgrade(e) {
    try {
      roleAssignmentDispatch({ type: 'loading', process: 'admin-starts' });
      const userId = e.target.getAttribute('data-userid');
      const username = e.target.getAttribute('data-username');
      const type = e.target.getAttribute('data-type');

      const response = await Axios.post(`/admin/${appState.user.username}/handleRoleAssignment`, {
        userId,
        type,
        token: appState.user.token,
      });

      roleAssignmentDispatch({ type: 'loading', process: 'admin-ends' });

      if (response.data == 'Success') {
        // SUCCESS
        roleAssignmentDispatch({ type: 'toggleAdminModal' });
        roleAssignmentDispatch({ type: 'updateRole', value: username, process: type });

        /*
          IF AN ADMIN DOWNGRADE THEMSELVES TO A USER, NAVIGATE THEM TO LANDING PAGE
         */
        if (appState.user.username == username) {
          // REMOVE ADMIN FROM LOCAL STORAGE
          appDispatch({
            type: 'updateLocalStorage',
            process: 'adminToUser_userToAdmin',
            kind: type,
          });
          // NAVIGATE TO LANDING PAGE AND THROW AN ERROR MESSAGE
          history.push('/');
          appDispatch({
            type: 'flashMsgError',
            value: ['You must be an admin to view or edit this page.'],
          });
        }
      } else {
        // FAILURE
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // DELAY FOR SEARCH
  useEffect(() => {
    if (state.search.text.trim()) {
      roleAssignmentDispatch({ type: 'isSearching', process: 'starts' });

      const delay = setTimeout(() => roleAssignmentDispatch({ type: 'searchCount' }), 750);

      return () => clearTimeout(delay);
    } else {
      roleAssignmentDispatch({ type: 'fetchUsers' });
      roleAssignmentDispatch({ type: 'isSearching', process: 'ends' });
    }
  }, [state.search.text]);

  // SEARCH
  useEffect(() => {
    if (state.search.sendCount && state.search.text != '') {
      const request = Axios.CancelToken.source();
      (async function adminUserSearch() {
        try {
          const response = await Axios.post(
            `/admin/${appState.user.username}/search`,
            { searchText: state.search.text, token: appState.user.token },
            { cancelToken: request.token }
          );

          roleAssignmentDispatch({ type: 'isSearching', process: 'ends' });

          roleAssignmentDispatch({
            type: 'fetchAdminStatsComplete',
            value: response.data.adminStats,
            process: 'search',
          });
        } catch (error) {
          console.log(error);
        }
      })();

      return () => request.cancel();
    }
  }, [state.search.sendCount]);

  if (state.isFetching) {
    return <LoadingDotsAnimation />;
  }

  function toggleAdminModal(e) {
    const username = e.target.getAttribute('data-username');
    roleAssignmentDispatch({ type: 'toggleAdminModal', value: username });
  }

  function toggleActiveModal(e) {
    const username = e.target.getAttribute('data-username');
    roleAssignmentDispatch({ type: 'toggleActiveModal', value: username });
  }

  return (
    <Page title="Role Assignment">
      <div className="relative">
        <div>
          {/* MAIN CONTENT */}
          <div className="flex flex-wrap justify-center my-5">
            <div className="text-center w-full md:max-w-md mb-5 md:mx-3">
              <p className="text-lg px-2 md:px-0">
                Click on the &apos;Active&apos; or &apos;Admin&apos; button to deactivate or manage
                users roles respectively.
              </p>
              {/* SEARCH */}
              <div className="flex flex-1 justify-center text-white mt-5">
                <span className="relative w-full">
                  <input
                    onChange={e =>
                      roleAssignmentDispatch({ type: 'search', value: e.target.value })
                    }
                    autoComplete="off"
                    autoCorrect="off"
                    autoFocus
                    type="search"
                    placeholder="Search"
                    className="w-full text-lg bg-gray-900 text-white transition border border-transparent focus:outline-none focus:border-gray-700 py-1 px-2 pl-10 appearance-none leading-normal"
                  />
                  <div
                    className="absolute"
                    style={{
                      top: 0.8 + 'rem',
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
              {state.search.loading && <div className="absolute">Searching...</div>}
            </div>

            {/* ROLES */}
            <div className="overflow-y-auto w-full md:max-w-md" style={{ maxHeight: 500 + 'px' }}>
              {state.adminStats.allUserDocs.map((user, index) => {
                return (
                  <div key={index} className="bg-white mb-2 border">
                    <Link
                      to={`/profile/${user.username}`}
                      className="focus:outline-none active:outline-none px-6 py-4 whitespace-no-wrap block"
                    >
                      <div className="flex items-center justify-center">
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
                    </Link>
                    <div className="flex justify-between bg-gray-200">
                      <div className="px-6 py-4 whitespace-no-wrap">
                        {user.active ? (
                          <ReuseableButton
                            handleToggle={toggleActiveModal}
                            btnText="Active"
                            username={user.username}
                          />
                        ) : (
                          <ReuseableButton
                            handleToggle={toggleActiveModal}
                            btnText="Inactive"
                            username={user.username}
                          />
                        )}
                      </div>

                      <div className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        {user.scope.indexOf('admin') > -1 ? (
                          <ReuseableButton
                            handleToggle={toggleAdminModal}
                            btnText="Admin"
                            username={user.username}
                          />
                        ) : (
                          <ReuseableButton
                            handleToggle={toggleAdminModal}
                            btnText="User"
                            username={user.username}
                          />
                        )}
                      </div>
                    </div>
                    {/* ACTIVE MODAL */}
                    {state.active.toggleModal && state.active.username == user.username && (
                      <>
                        {user.active ? (
                          <ReuseableModal
                            user={user}
                            type="inactivate"
                            headerTitle={`Deactivate ${user.firstName} ${user.lastName}'s account?`}
                            btnText="Deactivate account"
                            handleToggle={toggleActiveModal}
                            handleSubmit={handleBanUser}
                            loading={state.active.loading}
                          />
                        ) : (
                          <ReuseableModal
                            user={user}
                            type="activate"
                            headerTitle={`Activate ${user.firstName} ${user.lastName}'s account?`}
                            btnText="Activate account"
                            handleToggle={toggleActiveModal}
                            handleSubmit={handleBanUser}
                            loading={state.active.loading}
                          />
                        )}
                      </>
                    )}

                    {/* ADMIN MODAL */}
                    {state.admin.toggleModal && state.admin.username == user.username && (
                      <>
                        {user.scope.indexOf('admin') > -1 ? (
                          <ReuseableModal
                            user={user}
                            type="downgrade"
                            headerTitle={`Downgrade ${user.firstName} ${user.lastName}?`}
                            btnText="Downgrade to a USER"
                            handleToggle={toggleAdminModal}
                            handleSubmit={handleDowngradeUpgrade}
                            loading={state.admin.loading}
                          />
                        ) : (
                          <ReuseableModal
                            user={user}
                            type="upgrade"
                            headerTitle={`Upgrade ${user.firstName} ${user.lastName} to admin?`}
                            btnText="Upgrade to an ADMIN"
                            handleToggle={toggleAdminModal}
                            handleSubmit={handleDowngradeUpgrade}
                            loading={state.admin.loading}
                          />
                        )}
                      </>
                    )}
                  </div>
                );
              })}
              {/* EMPTY SEARCH RESULTS */}
              {state.adminStats.allUserDocs.length == 0 && state.triggeredDuringSearch && (
                <div
                  style={{ overflowWrap: 'anywhere', minWidth: 0 + 'px' }}
                  className="h-full text-center flex items-center justify-center pb-5 px-3 text-2xl c-modal overflow-y-auto"
                >
                  <p className="px-2">
                    <span>No results found for:</span> <em> {state.search.text}</em>
                  </p>
                </div>
              )}
              {/* EMPTY SEARCH RESULTS */}
              {state.adminStats.allUserDocs.length == 0 && !state.triggeredDuringSearch && (
                <div className="h-full text-center flex items-center justify-center text-2xl">
                  <span className="px-2">No registered users.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

RoleAssignment.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(RoleAssignment);
