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

  useEffect(() => {
    const request = Axios.CancelToken.source();
    adminDispatch({ type: 'isFetchingStarts' });

    (async function getAdminStats() {
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

  function handleLogout() {
    appDispatch({ type: 'logout' });
    history.push('/');
  }

  return (
    <Page title="Admin Landing Page">
      <nav className="bg-gray-900 fixed w-full flex justify-end z-20 top-0">
        <ul className="flex justify-between items-center text-white w-full md:max-w-xs px-3">
          <li className="md:flex-none ">
            <Link
              className="inline-block no-underline hover:text-gray-200 hover:text-underline py-2"
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="flex md:flex-none">
            <div className="relative inline-block">
              <button
                onClick={() => appDispatch({ type: 'toggleAdminLandingPageMenu' })}
                className=" focus:outline-none"
              >
                <span className="pr-2">
                  <i className="em em-robot_face"></i>
                </span>
                {appState.user.firstName}
                <svg
                  className="h-3 fill-current inline"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </button>
              {appState.toggleAdminLandingPageMenu && (
                <div className="absolute bg-gray-900 text-white right-0 overflow-auto z-30">
                  <Link
                    to={`/profile/${appState.user.username}`}
                    className="p-2 flex items-center hover:bg-gray-800 text-white text-sm no-underline hover:no-underline"
                  >
                    <i className="mr-2 fa fa-user fa-fw"></i>
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="p-2 flex items-center hover:bg-gray-800 text-white text-sm no-underline hover:no-underline"
                  >
                    <i className="mr-2 fa fa-cog fa-fw"></i>
                    <span>Settings</span>
                  </Link>
                  <div className="border border-gray-800"></div>
                  <button
                    onClick={handleLogout}
                    className="p-2 flex items-center hover:bg-gray-800 text-white text-sm no-underline hover:no-underline"
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

      <div className="flex flex-col md:flex-row">
        <div className="bg-gray-900 shadow-lg h-16 fixed bottom-0 md:relative md:h-screen z-10 w-full md:w-48">
          <div className="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
            <ul className="flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
              <NavLink
                to={`/admin/${appState.user.username}/analytics`}
                className="mr-3 flex-1 block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500"
              >
                <i className="fas fa-tasks md:mr-3"></i>
                <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                  Analytics
                </span>
              </NavLink>
              <NavLink
                to={`/admin/${appState.user.username}/upload-song`}
                className="mr-3 flex-1 block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500"
              >
                <i className="fa fa-envelope md:mr-3"></i>
                <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                  Add song
                </span>
              </NavLink>
              <NavLink
                to={`/admin/${appState.user.username}/role-assignment`}
                className="mr-3 flex-1 block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500"
              >
                <i className="fas fa-users-cog md:mr-3"></i>
                <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                  Roles
                </span>
              </NavLink>
            </ul>
          </div>
        </div>
        <div className="main-content flex-1 bg-gray-100 mt-10 pb-24 md:pb-5">
          <Switch>
            <Route path="/admin/:username/analytics">
              <div className="bg-blue-800 px-2 pt-6 pb-4 shadow text-xl text-white">
                <h3 className="font-bold pl-2">Analytics</h3>
              </div>
              <Analytics
                isFetching={state.isFetching}
                totalUsers={state.adminStats.allUserDocs.length}
              />
            </Route>
            <Route path="/admin/:username/upload-song">
              <div className="bg-blue-800 px-2 pt-6 pb-4 shadow text-xl text-white">
                <h3 className="font-bold pl-2">Upload a Song</h3>
              </div>
              <UploadSong />
            </Route>
            <Route path="/admin/:username/role-assignment">
              <div className="bg-blue-800 px-2 pt-6 pb-4 shadow text-xl text-white">
                <h3 className="font-bold pl-2"> Role Assignment </h3>
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
