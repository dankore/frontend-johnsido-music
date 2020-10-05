import React, { useContext, useEffect } from 'react';
import Page from '../../components/layouts/Page';
import { NavLink, Route, Switch, Redirect, Link, withRouter, useParams } from 'react-router-dom';
import Analytics from '../../components/admin/Analytics';
import UploadSong from '../../components/admin/UploadSong';
import StateContext from '../../contextsProviders/StateContext';
import DispatchContext from '../../contextsProviders/DispatchContext';
import PropTypes from 'prop-types';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import RoleAssignment from '../../components/admin/RoleAssignment';

function AdminLandingPage({ history }) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const { username } = useParams();
  const initialState = {
    adminStats: {
      allUserDocs: [],
    },
    isFetching: false,
  };

  function adminReducer(draft, action) {
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
    }
  }

  const [state, adminDispatch] = useImmerReducer(adminReducer, initialState);

  // FETCH ADMIN STARTS
  useEffect(() => {
    (async function getAdminStats() {
      adminDispatch({ type: 'isFetchingStarts' });
      const request = Axios.CancelToken.source();

      try {
        const response = await Axios.post(
          `/admin-stats/${username}`,
          { token: appState.user.token },
          { cancelToken: request.token }
        );

        adminDispatch({ type: 'isFetchingEnds' });

        if (response.data.adminStats) {
          adminDispatch({ type: 'fetchAdminStatsComplete', value: response.data.adminStats });
        } else {
          // NOT AN ADMIN
          appDispatch({
            type: 'updateLocalStorage',
            process: 'removeAdminProperties',
          });
          history.push('/');
          appDispatch({ type: 'flashMsgError', value: response.data });
        }
      } catch (error) {
        // FAIL SILENTLY
        console.log(error);
      }

      return () => request.cancel();
    })();
  }, [username]);

  function handleLogout() {
    appDispatch({ type: 'logout' });
    history.push('/');
  }

  return (
    <Page title="Admin Landing Page">
      {/* TOP NAV */}
      <nav className="fixed top-0 z-20 flex justify-end w-full bg-gray-900 c-shadow2">
        <ul className="flex items-center justify-between w-full px-3 text-white md:max-w-xs">
          <li className="md:flex-none ">
            <Link className="inline-block py-2 focus:outline-none hover:underline" to="/">
              Home
            </Link>
          </li>
          <li className="flex md:flex-none">
            <div className="relative inline-block">
              <button
                onClick={() => appDispatch({ type: 'toggleAdminLandingPageMenu' })}
                className="inline-block py-2 focus:outline-none hover:underline"
              >
                {appState.user.firstName}
                <svg
                  className="inline h-3 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </button>
              {appState.toggleAdminLandingPageMenu && (
                <div className="absolute right-0 z-30 w-32 overflow-auto text-white bg-gray-900">
                  <Link
                    to={`/profile/${appState.user.username}`}
                    className="flex items-center w-full p-2 text-sm text-white no-underline hover:bg-gray-800 hover:no-underline"
                  >
                    <i className="mr-2 fa fa-user fa-fw"></i>
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center w-full p-2 text-sm text-white no-underline hover:bg-gray-800 hover:no-underline"
                  >
                    <i className="mr-2 fa fa-cog fa-fw"></i>
                    <span>Settings</span>
                  </Link>
                  <div className="border border-gray-800"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full p-2 text-sm text-white no-underline hover:bg-gray-800 hover:no-underline"
                  >
                    <i className="mr-2 fas fa-sign-out-alt fa-fw"></i>
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>

      <div className="flex flex-col bg-gray-900 md:flex-row">
        {/* <!--Sidebar--> */}
        <div className="fixed bottom-0 z-10 w-full h-16 bg-gray-900 md:relative md:h-screen md:w-56">
          <div className="content-center justify-between text-left md:mt-12 md:w-56 md:fixed md:left-0 md:top-0 md:content-start">
            <ul className="flex flex-row px-1 py-0 text-center md:flex-col md:py-3 md:px-2 md:text-left">
              <NavLink
                activeStyle={{ borderColor: '#ed64a6' }}
                to={`/admin/${appState.user.username}/analytics`}
                className="flex-1 block py-1 pl-1 mr-3 text-white no-underline align-middle border-b-2 border-gray-800 focus:outline-none md:py-3 hover:text-white hover:border-pink-500"
              >
                <i className="fas fa-tasks md:mr-3"></i>
                <span className="block pb-1 text-xs text-gray-600 md:pb-0 md:text-base md:text-gray-400 md:inline-block">
                  Analytics
                </span>
              </NavLink>
              <NavLink
                activeStyle={{ borderColor: '#3182ce' }}
                to={`/admin/${appState.user.username}/upload-song`}
                className="flex-1 block py-1 pl-1 mr-3 text-white no-underline align-middle border-b-2 border-gray-800 focus:outline-none md:py-3 hover:text-white hover:border-blue-500"
              >
                <i className="fa fa-envelope md:mr-3"></i>
                <span className="block pb-1 text-xs text-gray-600 md:pb-0 md:text-base md:text-gray-400 md:inline-block">
                  Add song
                </span>
              </NavLink>
              <NavLink
                activeStyle={{ borderColor: '#9f7aea' }}
                to={`/admin/${appState.user.username}/role-assignment`}
                className="flex-1 block py-1 pl-1 mr-3 text-white no-underline align-middle border-b-2 border-gray-800 focus:outline-none md:py-3 hover:text-white hover:border-purple-500"
              >
                <i className="fas fa-users-cog md:mr-3"></i>
                <span className="block pb-1 text-xs text-gray-600 md:pb-0 md:text-base md:text-gray-400 md:inline-block">
                  Roles
                </span>
              </NavLink>
            </ul>
          </div>
        </div>
        <div className="flex-1 pb-24 mt-10 bg-gray-100 md:pb-5">
          <Switch>
            <Route path="/admin/:username/analytics">
              <div className="px-2 pt-6 pb-4 text-xl text-white bg-blue-800 shadow c-shadow">
                <h3 className="pl-2 font-bold">Analytics</h3>
              </div>
              <Analytics
                isFetching={state.isFetching}
                totalUsers={state.adminStats.allUserDocs.length}
              />
            </Route>
            <Route path="/admin/:username/upload-song">
              <div className="px-2 pt-6 pb-4 text-xl text-white bg-blue-800 shadow c-shadow">
                <h3 className="pl-2 font-bold">Upload a Song</h3>
              </div>
              <UploadSong />
            </Route>
            <Route path="/admin/:username/role-assignment">
              <div className="px-2 pt-6 pb-4 text-xl text-white bg-blue-800 shadow c-shadow">
                <h3 className="pl-2 font-bold"> Role Assignment </h3>
              </div>
              <RoleAssignment />
            </Route>
            <Route>
              <Redirect to={`/admin/${appState.user.username}/analytics`} />
            </Route>
          </Switch>
        </div>
      </div>
    </Page>
  );
}

AdminLandingPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(AdminLandingPage);
