import React, { useContext } from 'react';
import StateContext from '../../contextsProviders/StateContext';
import DispatchContext from '../../contextsProviders/DispatchContext';
import { Link } from 'react-router-dom';
import MobileMenus from './MobileMenus';

function HeaderLoggedIn() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  return (
    <nav className="bg-gray-700 c-shadow2">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              aria-label="Main menu"
              aria-expanded="false"
              onClick={() => appDispatch({ type: 'toggles', for: 'mobileHamburgerHeaderLoggedIn' })}
            >
              {/* <!-- Icon when menu is closed. -->
          <!-- Menu open: "hidden", Menu closed: "block" --> */}
              {!appState.toggles.mobileHamburgerHeaderLoggedIn && (
                <svg
                  className="block h-6 w-6"
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
              {appState.toggles.mobileHamburgerHeaderLoggedIn && (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  className="block lg:hidden h-12 w-auto"
                  src={appState?.logo.url}
                  alt={appState?.logo.alt}
                />
                <img
                  className="hidden lg:block h-12 w-auto"
                  src={appState?.logo.url}
                  alt={appState?.logo.alt}
                />
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex items-center">
                <Link
                  to="my-songs"
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                >
                  My Songs
                </Link>
                <Link
                  to="/explore"
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                >
                  Explore Other Artistes Songs
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute text-white inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link
              to="/register"
              className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out px-1"
              aria-label="register"
            >
              Register
            </Link>

            {/* <!-- Profile dropdown --> */}
            <div className="ml-3 relative">
              <div>
                <Link
                  to="/login"
                  className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out px-1"
                  id="user-menu"
                  aria-label="User menu"
                >
                  <div className="rounded-full">
                    <i className="far fa-user mr-2"></i>
                    Login
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {appState.toggles.mobileHamburgerHeaderLoggedIn && <MobileMenus />}

      {/* SCREEN READERS ONLY */}
      <Link
        to="/register"
        className="sr-only flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out px-1"
        aria-label="register"
      >
        Register
      </Link>
      <Link
        to="/register"
        className="sr-only flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out px-1"
        aria-label="register"
      >
        Register
      </Link>
    </nav>
  );
}

export default HeaderLoggedIn;
