import React, { useContext } from 'react';
import Page from '../../components/layouts/Page';
import { Route, Switch, NavLink, Redirect, Link } from 'react-router-dom';
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
      <main>
        {/* NAV */}
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
                    {appState.user.scope && appState.user.scope.indexOf('admin') > -1 && (
                      <Link
                        to={`/admin/${appState.user.username}`}
                        className="p-2 flex items-center hover:bg-gray-800 text-white text-sm no-underline hover:no-underline"
                        role="menuitem"
                      >
                        <i className="mr-2 fa fa-cog fa-fw"></i>
                        <span>Admin Area</span>
                      </Link>
                    )}
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
        {/* <!--Sidebar--> */}
        <div className="flex flex-col md:flex-row bg-gray-900">
          <div className="bg-gray-900 shadow-lg h-16 fixed bottom-0 md:relative md:h-screen z-10 w-full md:w-64 pl-12">
            <div className="md:mt-12 md:w-56 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
              <ul className="flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
                <NavLink
                  activeStyle={{ borderColor: '#ed64a6' }}
                  to="/settings/info"
                  className="mr-3 flex-1 block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500"
                >
                  <i className="md:mr-3 fas fa-user-edit"></i>
                  <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                    Profile Information
                  </span>
                </NavLink>
                <NavLink
                  activeStyle={{ borderColor: '#3182ce' }}
                  to="/settings/change-password"
                  className="mr-3 flex-1 block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-blue-500"
                >
                  <i className="md:mr-3 fas fa-lock"></i>
                  <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                    Change Password
                  </span>
                </NavLink>
                <NavLink
                  activeStyle={{ borderColor: '#9f7aea' }}
                  to="/settings/delete-account"
                  className="mr-3 flex-1 block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500"
                >
                  <i className="md:mr-3 fas fa-user-minus"></i>
                  <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                    Delete Account
                  </span>
                </NavLink>
              </ul>
            </div>
          </div>
          {/* CONTENTS */}
          <div className="w-full bg-gray-200">
            <Switch>
              <Route path="/settings/info">
                <div className="bg-blue-800 px-2 pt-16 pb-4 shadow text-xl text-white">
                  <h3 className="font-bold pl-2"> Profile Information </h3>
                </div>
                <ProfileInfoSettings />
              </Route>
              <Route path="/settings/change-password">
                <div className="bg-blue-800 px-2 pt-16 pb-4 shadow text-xl text-white">
                  <h3 className="font-bold pl-2"> Change Password </h3>
                </div>
                <ChangePassword />
              </Route>
              <Route path="/settings/delete-account">
                <div className="bg-blue-800 px-2 pt-16 pb-4 shadow text-xl text-white">
                  <h3 className="font-bold pl-2"> Delete Account </h3>
                </div>
                <DeleteAccount />
              </Route>
              <Route>
                <Redirect to="/settings/info" />
              </Route>
            </Switch>
          </div>
        </div>
      </main>
    </Page>
  );
}

SettingsPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default SettingsPage;
