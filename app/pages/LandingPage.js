import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import StateContext from '../contextsProviders/StateContext';
import DispatchContext from '../contextsProviders/DispatchContext';
import FlashMsgSuccess from '../components/shared/FlashMsgSuccess';
import FlashMsgError from '../components/shared/FlashMsgError';

function LandingPage() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  function handleLogout() {
    appDispatch({ type: 'logout' });
    appDispatch({ type: 'turnOff' });
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 lg:bg-gray-300">
      <div
        className="absolute hidden lg:block scroll-bg"
        style={{
          height: 400 + '%',
          width: 400 + '%',
          top: -25 + '%',
          left: -100 + '%',
          backgroundSize: 800 + 'px',
          backgroundImage: `url(https://res.cloudinary.com/my-nigerian-projects/image/upload/q_auto,f_auto,w_800/v1596776335/Others/john/john-collage.jpg)`,
        }}
      ></div>
      <div
        className="relative min-h-screen bg-no-repeat lg:min-w-3xl xl:min-w-4xl lg:flex lg:items-center lg:justify-center lg:w-3/5 lg:py-12 lg:pl-8 lg:pr-8"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/my-nigerian-projects/image/upload/v1596699282/Others/angled-background.svg)`,
          backgroundSize: '100% auto',
          backgroundPositionX: -5 + 'px',
          backgroundPositionY: -5 + 'px',
        }}
      >
        <div>
          <div className="px-6 pt-8 pb-12 md:max-w-3xl md:mx-auto lg:mx-0 lg:max-w-none lg:pt-0">
            <div className="flex items-center justify-between">
              <div>
                <img
                  className="w-20 h-20 -ml-2 lg:w-32 lg:h-32"
                  src={appState.logo.url}
                  alt={appState.logo.alt}
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => appDispatch({ type: 'toggleLandingPageMenu' })}
                  className={`flex text-center text-white focus:outline-none  ${
                    appState.toggleLandingPageMenu && 'focus:text-gray-400'
                  } `}
                >
                  {appState.toggleLandingPageMenu ? (
                    <div className="transform rotate-45">
                      <svg
                        className="w-6 h-6"
                        stroke="currentColor"
                        fill="none"
                        focusable="false"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
                      </svg>
                    </div>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      stroke="currentColor"
                      fill="none"
                      focusable="false"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
                    </svg>
                  )}

                  <p>Menu</p>
                </button>
                {appState.toggleLandingPageMenu && (
                  <div className="absolute right-0 z-10 w-48 origin-top-right rounded-md shadow-lg">
                    <div
                      className="bg-white rounded-md shadow-xs"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      {appState.loggedIn ? (
                        <>
                          <div className="absolute right-0 z-10 w-48 mt-1 origin-top-right rounded-md shadow-lg">
                            <div
                              className="bg-white rounded-md shadow-xs"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="user-menu"
                            >
                              <Link
                                to={`/profile/${appState.user.username}`}
                                className="flex items-center px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-300 rounded-t-lg focus:outline-none focus:bg-gray-100"
                                role="menuitem"
                              >
                                <img
                                  className="w-8 h-8 mr-2 rounded-full"
                                  src={appState.user.avatar}
                                  alt="Profile Pic"
                                />
                                <p>Your Profile</p>
                              </Link>
                              {appState.user.scope && appState.user.scope.indexOf('admin') > -1 && (
                                <Link
                                  to={`/admin/${appState.user.username}`}
                                  className="flex items-center px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-300  focus:outline-none focus:bg-gray-100"
                                  role="menuitem"
                                >
                                  <i className="mr-2 fas fa-users-cog"></i>
                                  Admin Area
                                </Link>
                              )}
                              <Link
                                to="/settings"
                                className="flex items-center px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-300  focus:outline-none focus:bg-gray-100"
                                role="menuitem"
                              >
                                <i className="mr-2 fa fa-cog fa-fw"></i>
                                Settings
                              </Link>
                              <Link
                                to="/about"
                                className="flex items-center px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-300  focus:outline-none focus:bg-gray-100"
                                role="menuitem"
                              >
                                <i className="mr-2 far fa-address-card"></i>
                                About
                              </Link>
                              <button
                                onClick={handleLogout}
                                className="flex items-center w-full rounded-b-lg text-left px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-300 focus:outline-none focus:bg-gray-100"
                                role="menuitem"
                              >
                                <i className="mr-2 fas fa-sign-out-alt fa-fw"></i>
                                Sign out
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {' '}
                          <div className="absolute right-0 z-10 w-48 mt-1 origin-top-right rounded-md shadow-lg">
                            <div
                              className="bg-white rounded-md shadow-xs"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="user-menu"
                            >
                              <Link
                                to="/login"
                                className="flex items-center rounded-t-lg px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-300 focus:outline-none focus:bg-gray-100"
                                role="menuitem"
                              >
                                <i className="mr-2 fas fa-sign-in-alt"></i>
                                Login
                              </Link>
                              <Link
                                to="/register"
                                className="flex items-center px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-300 focus:outline-none focus:bg-gray-100"
                                role="menuitem"
                              >
                                <i className="mr-2 fas fa-user-plus"></i>
                                Register
                              </Link>
                              <Link
                                to="/about"
                                className="flex items-center rounded-b-lg px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-300 focus:outline-none focus:bg-gray-100"
                                role="menuitem"
                              >
                                <i className="mr-2 far fa-address-card"></i>
                                About
                              </Link>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {appState.flashMsgSuccess.isDisplay && (
            <FlashMsgSuccess errors={appState.flashMsgSuccess.value} />
          )}
          {appState.flashMsgErrors.isDisplay && (
            <FlashMsgError errors={appState.flashMsgErrors.value} />
          )}
          <div className="px-6 md:max-w-3xl md:mx-auto lg:mx-0 lg:max-w-none">
            <h1 className="mt-3 text-3xl font-semibold leading-9 text-white font-display sm:mt-6 sm:text-4xl sm:leading-10 xl:text-5xl xl:leading-none">
              Be bold, be musical
              <br />
              <span className="js-brown">John Sido.</span>
            </h1>
            <p className="mt-2 text-lg leading-7 text-gray-300 sm:mt-3 sm:text-xl sm:max-w-xl xl:mt-4 xl:text-2xl xl:max-w-2xl">
              I&apos;m on a gospel musician on a journey to help myself and other upcoming
              musicians.
            </p>
            <div className="mt-6 sm:flex sm:mt-8 xl:mt-12">
              <Link
                to="/my-songs"
                className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-semibold leading-6 text-gray-900 transition duration-150 ease-in-out bg-white border border-transparent rounded-md shadow-sm sm:w-auto hover:text-gray-600 focus:outline-none focus:text-gray-600 xl:text-lg xl:py-4"
              >
                Listen to my music
              </Link>
              <Link
                to="/explore"
                className="inline-flex items-center justify-center w-full px-6 py-3 mt-4 text-base font-semibold leading-6 text-white transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md shadow-sm sm:ml-4 sm:mt-0 sm:w-auto hover:bg-gray-700 focus:outline-none focus:bg-gray-700 xl:text-lg xl:py-4"
              >
                Explore music from others →
              </Link>
            </div>
          </div>
          <div className="relative h-64 mt-8 overflow-hidden bg-gray-300 sm:mt-12 lg:hidden">
            <div
              className="absolute scroll-bg"
              style={{
                height: 800 + '%',
                width: 400 + '%',
                top: -100 + '%',
                left: -100 + '%',
                backgroundSize: 400 + 'px',
                backgroundImage:
                  'url(' +
                  'https://res.cloudinary.com/my-nigerian-projects/image/upload/q_auto,f_auto,w_1000/v1596776335/Others/john/john-collage.jpg' +
                  ')',
              }}
            ></div>
          </div>
          <div className="px-6 pt-5 pb-3 md:max-w-3xl md:mx-auto lg:mx-0 lg:max-w-full">
            <p className="text-sm font-semibold tracking-wider text-gray-300 uppercase">Artiste</p>
            <div className="mt-4 sm:flex">
              <Link to="/profile/johnsido" className="flex items-center no-underline">
                <div className="flex-shrink-0">
                  <img
                    className="w-12 h-12 border-2 border-white rounded-full"
                    src="https://res.cloudinary.com/my-nigerian-projects/image/upload/w_400,h_400,c_crop,g_face,r_max/w_200/v1596698079/Others/john_r5z4ij.jpg"
                    alt="John Side Photo"
                  />
                </div>
                <div className="ml-3">
                  <p className="font-semibold leading-tight text-white">John Sido</p>
                  <p className="text-sm leading-tight text-gray-500">Abuja, Nigeria</p>
                </div>
              </Link>
            </div>
            <div className="text-gray-500 mt-3 flex flex-wrap text-sm">
              <Link className="hover:text-gray-400 mr-1 block" to="/about">
                About
              </Link>{' '}
              |{' '}
              <Link className="hover:text-gray-400 mx-1 block" to="/terms">
                Terms
              </Link>{' '}
              |{' '}
              <Link className="hover:text-gray-400 mx-1 block" to="/privacy">
                Privacy
              </Link>{' '}
              |{' '}
              <Link className="hover:text-gray-400 mx-1 block" to="/cookies">
                Cookies
              </Link>
              <p className="text-gray-600 sm:ml-3">
                &copy; 2020-{new Date().getFullYear()} Johnsido
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
