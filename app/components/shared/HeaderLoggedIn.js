import React, { useContext } from 'react';
import StateContext from '../../contextsProviders/StateContext';
import DispatchContext from '../../contextsProviders/DispatchContext';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import MobileMenus from './MobileMenus';

function HeaderLoggedIn({ history }) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  function handleLogout() {
    appDispatch({ type: 'logout' });
    appDispatch({ type: 'turnOff' });
    history.push('/');
  }

  return (
    <nav className="relative bg-gray-700 c-shadow2">
      <div className="relative px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              aria-label="Main menu"
              aria-expanded="false"
              onClick={() => appDispatch({ type: 'toggles', for: 'mobileHamburgerHeaderLoggedIn' })}
            >
              {/* <!-- Icon when menu is closed. -->
          <!-- Menu open: "hidden", Menu closed: "block" --> */}
              {!(appState && appState.toggles.mobileHamburgerHeaderLoggedIn) && (
                <svg
                  className="block w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
              {/* <!-- Icon when menu is open. -->
          <!-- Menu open: "block", Menu closed: "hidden" --> */}
              {appState && appState.toggles.mobileHamburgerHeaderLoggedIn && (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex-shrink-0 ml-10">
              <Link className="focus:outline-none" to="/">
                <img
                  className="block w-auto h-12 lg:hidden"
                  src={appState.logo.url}
                  alt={appState.logo.alt}
                />
                <img
                  className="hidden w-auto h-12 lg:block"
                  src={appState.logo.url}
                  alt={appState.logo.alt}
                />
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex">
                <Link
                  to="/my-songs"
                  className="px-3 py-2 ml-4 text-sm font-medium leading-5 text-gray-300 transition duration-150 ease-in-out rounded-md focus:outline-none hover:text-white hover:bg-gray-700 focus:text-white focus:bg-gray-700"
                >
                  My Songs
                </Link>
                <Link
                  to="/explore"
                  className="px-3 py-2 ml-4 text-sm font-medium leading-5 text-gray-300 transition duration-150 ease-in-out rounded-md focus:outline-none hover:text-white hover:bg-gray-700 focus:text-white focus:bg-gray-700"
                >
                  Explore Other Artistes Songs
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* NOTIFUCATION BUTTON */}
            <button
              className="p-1 text-gray-400 transition duration-150 ease-in-out border-2 border-transparent rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
              aria-label="Notifications"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            {/* <!-- Profile dropdown --> */}
            <div className="relative ml-3">
              <div>
                <button
                  onClick={() => appDispatch({ type: 'isOpenProfileDropdown' })}
                  className="flex text-sm transition duration-150 ease-in-out border-2 border-transparent rounded-full focus:outline-none focus:border-white focus:shadow-outline"
                  id="user-menu"
                  aria-label="User menu"
                  aria-haspopup="true"
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src={appState.user.avatar}
                    alt="Profile Pic"
                  />
                </button>
              </div>

              {appState.isOpenProfileDropdown && (
                <div className="absolute right-0 z-20 w-48 mt-2 origin-top-right rounded-md shadow-lg">
                  <div
                    className="py-1 bg-white rounded-md shadow-xs"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    {history.location.pathname != `/profile/${appState.user.username}` && (
                      <Link
                        to={`/profile/${appState.user.username}`}
                        className="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        role="menuitem"
                      >
                        <i className="mr-2 fa fa-user fa-fw"></i>
                        Your Profileg
                      </Link>
                    )}

                    {appState.user.scope.indexOf('admin') > -1 && (
                      <Link
                        to={`/admin/${appState.user.username}`}
                        className="flex items-center px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        role="menuitem"
                      >
                        <i className="mr-2 fas fa-users-cog"></i>
                        Admin Area
                      </Link>
                    )}
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      role="menuitem"
                    >
                      <i className="mr-2 fa fa-cog fa-fw"></i>
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm leading-5 text-left text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      role="menuitem"
                    >
                      <i className="mr-2 fas fa-sign-out-alt fa-fw"></i>
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {appState && appState.toggles.mobileHamburgerHeaderLoggedIn && <MobileMenus />}
    </nav>
  );
}

HeaderLoggedIn.propTypes = {
  history: PropTypes.object,
};

export default withRouter(HeaderLoggedIn);
