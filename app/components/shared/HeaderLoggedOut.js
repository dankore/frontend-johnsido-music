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
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
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
                  src={appState?.logo.url}
                  alt={appState?.logo.alt}
                />
                <img
                  className="hidden w-auto h-12 lg:block"
                  src={appState?.logo.url}
                  alt={appState?.logo.alt}
                />
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex items-center">
                <Link
                  to="my-songs"
                  className="px-3 py-2 ml-4 text-sm font-medium leading-5 text-gray-300 transition duration-150 ease-in-out rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  My Songs
                </Link>
                <Link
                  to="/explore"
                  className="px-3 py-2 ml-4 text-sm font-medium leading-5 text-gray-300 transition duration-150 ease-in-out rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  Explore Other Artistes Songs
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center text-white sm:static sm:inset-auto">
            <Link
              to="/register"
              className="block text-sm transition duration-150 ease-in-out border-transparent hover:underline focus:outline-none mr-3 sm:mr-5"
              aria-label="register"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="block text-sm transition duration-150 ease-in-out border-transparent hover:underline focus:outline-none"
              aria-label="login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {appState && appState.toggles.mobileHamburgerHeaderLoggedIn && <MobileMenus />}

      {/* SCREEN READERS ONLY */}
      <Link
        to="/register"
        className="flex px-1 text-sm transition duration-150 ease-in-out border-2 border-transparent hover:underline sr-only focus:outline-none"
        aria-label="register"
      >
        Register
      </Link>
      <Link
        to="/login"
        className="flex px-1 text-sm transition duration-150 ease-in-out border-2 border-transparent hover:underline sr-only focus:outline-none"
        aria-label="register"
      >
        Login
      </Link>
    </nav>
  );
}

export default HeaderLoggedIn;
