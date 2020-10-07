import React, { useContext } from 'react';
import Page from '../../components/layouts/Page';
import { Route, Switch, NavLink, Redirect, Link, withRouter } from 'react-router-dom';
import ProfileInfoSettings from '../../components/settings/UpdateProfileInfo';
import ChangePassword from '../../components/settings/ChangePassword';
import DeleteAccount from '../../components/settings/DeleteAccount';
import StateContext from '../../contextsProviders/StateContext';
import DispatchContext from '../../contextsProviders/DispatchContext';
import PropTypes from 'prop-types';

function SettingsPage({ history }) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  function handleLogout() {
    appDispatch({ type: 'logout' });
    history.push('/');
  }

  return (
    <Page title="Settings">
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
                    className="flex items-center p-2 text-sm text-white no-underline hover:bg-gray-800 hover:no-underline"
                  >
                    <i className="mr-2 fa fa-user fa-fw"></i>
                    <span>Profile</span>
                  </Link>
                  {appState.user.scope && appState.user.scope.indexOf('admin') > -1 && (
                    <Link
                      to={`/admin/${appState.user.username}`}
                      className="flex items-center p-2 text-sm text-white no-underline hover:bg-gray-800 hover:no-underline"
                      role="menuitem"
                    >
                      <i className="mr-2 fa fa-cog fa-fw"></i>
                      <span>Admin Area</span>
                    </Link>
                  )}
                  <div className="border border-gray-800"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full p-2 text-sm text-white no-underline hover:bg-gray-800 hover:no-underline"
                  >
                    <i className="mr-2 fas fa-sign-out-alt fa-fw"></i>
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>

      <div className="flex flex-col bg-gray-900 md:flex-row">
        {/* <!--Sidebar--> */}
        <div className="fixed bottom-0 z-10 w-full h-16 pl-12 bg-gray-900 c-shadow2 md:relative md:h-screen md:w-64">
          <div className="content-center justify-between text-left md:mt-12 md:w-56 md:fixed md:left-0 md:top-0 md:content-start">
            <ul className="flex flex-row px-1 py-0 text-center md:flex-col md:py-3 md:px-2 md:text-left">
              <NavLink
                activeStyle={{ borderColor: '#ed64a6' }}
                to="/settings/info"
                className="flex-1 block py-1 pl-1 mr-3 text-white no-underline align-middle border-b-2 border-gray-800 focus:outline-none md:py-3 hover:text-white hover:border-pink-500"
              >
                <i className="md:mr-3 fas fa-user-edit"></i>
                <span className="block pb-1 text-xs text-gray-600 md:pb-0 md:text-base md:text-gray-400 md:inline-block">
                  Profile Info
                </span>
              </NavLink>
              <NavLink
                activeStyle={{ borderColor: '#3182ce' }}
                to="/settings/change-password"
                className="flex-1 block py-1 pl-1 mr-3 text-white no-underline align-middle border-b-2 border-gray-800 focus:outline-none md:py-3 hover:text-white hover:border-blue-500"
              >
                <i className="md:mr-3 fas fa-lock"></i>
                <span className="block pb-1 text-xs text-gray-600 md:pb-0 md:text-base md:text-gray-400 md:inline-block">
                  Change Password
                </span>
              </NavLink>
              <NavLink
                activeStyle={{ borderColor: '#9f7aea' }}
                to="/settings/delete-account"
                className="flex-1 block py-1 pl-1 mr-3 text-white no-underline align-middle border-b-2 border-gray-800 focus:outline-none md:py-3 hover:text-white hover:border-purple-500"
              >
                <i className="md:mr-3 fas fa-user-minus"></i>
                <span className="block pb-1 text-xs text-gray-600 md:pb-0 md:text-base md:text-gray-400 md:inline-block">
                  Delete Account
                </span>
              </NavLink>
            </ul>
          </div>
        </div>
        {/* CONTENTS */}
        <div className="flex-1 pb-24 mt-10 bg-gray-100 md:pb-5">
          <Switch>
            <Route path="/settings/info">
              <div className="px-2 pt-6 pb-4 text-xl text-white bg-blue-800 shadow c-shadow">
                <h3 className="pl-2 font-bold"> Profile Information </h3>
              </div>
              <ProfileInfoSettings />
            </Route>
            <Route path="/settings/change-password">
              <div className="px-2 pt-6 pb-4 text-xl text-white bg-blue-800 shadow c-shadow">
                <h3 className="pl-2 font-bold"> Change Password </h3>
              </div>
              <ChangePassword />
            </Route>
            <Route path="/settings/delete-account">
              <div className="px-2 pt-6 pb-4 text-xl text-white bg-blue-800 shadow c-shadow">
                <h3 className="pl-2 font-bold"> Delete Account </h3>
              </div>
              <DeleteAccount />
            </Route>
            <Route>
              <Redirect to="/settings/info" />
            </Route>
          </Switch>
        </div>
      </div>
    </Page>
  );
}

SettingsPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SettingsPage);
