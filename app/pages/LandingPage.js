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
        className="hidden lg:block absolute scroll-bg"
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
        className="relative min-h-screen lg:min-w-3xl xl:min-w-4xl lg:flex lg:items-center lg:justify-center lg:w-3/5 lg:py-12 lg:pl-8 lg:pr-8 bg-no-repeat"
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
                  className="-ml-2 w-20 h-20 lg:w-32 lg:h-32"
                  src={appState.logo.url}
                  alt={appState.logo.alt}
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => appDispatch({ type: 'toggleLandingPageMenu' })}
                  className="text-white flex text-center"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="white"
                    fill="none"
                    focusable="false"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
                  </svg>
                  <p>Menu</p>
                </button>
                {appState.toggleLandingPageMenu && (
                  <div className="origin-top-right absolute right-0  w-48 rounded-md shadow-lg  z-10">
                    <div
                      className="rounded-md bg-white shadow-xs"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      {appState.loggedIn ? (
                        <>
                          <div className="origin-top-right absolute right-0 mt-1 w-48 rounded-md shadow-lg z-10">
                            <div
                              className="py-1 rounded-md bg-white shadow-xs"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="user-menu"
                            >
                              <Link
                                to={`/profile/${appState.user.username}`}
                                className="flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                role="menuitem"
                              >
                                <img
                                  className="h-8 w-8 rounded-full mr-2"
                                  src={appState.user.avatar}
                                  alt="Profile Pic"
                                />
                                <p>Your Profile</p>
                              </Link>
                              {appState.user && appState.user.scope.indexOf('admin') > -1 && (
                                <Link
                                  to={`/admin/${appState.user.username}`}
                                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                  role="menuitem"
                                >
                                  Admin Area
                                </Link>
                              )}
                              <Link
                                to="/about"
                                className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                role="menuitem"
                              >
                                About
                              </Link>
                              <button
                                onClick={handleLogout}
                                className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                role="menuitem"
                              >
                                Sign out
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {' '}
                          <div className="origin-top-right absolute right-0 mt-1 w-48 rounded-md shadow-lg z-10">
                            <div
                              className="py-1 rounded-md bg-white shadow-xs"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="user-menu"
                            >
                              <Link
                                to="/login"
                                className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                role="menuitem"
                              >
                                Login
                              </Link>
                              <Link
                                to="/register"
                                className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                role="menuitem"
                              >
                                Register
                              </Link>
                              <Link
                                to="/about"
                                className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                role="menuitem"
                              >
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
            <h1 className="mt-3 text-3xl leading-9 font-semibold font-display text-white sm:mt-6 sm:text-4xl sm:leading-10 xl:text-5xl xl:leading-none">
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
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-semibold rounded-md text-gray-900 bg-white shadow-sm hover:text-gray-600 focus:outline-none focus:text-gray-600 transition ease-in-out duration-150 xl:text-lg xl:py-4"
              >
                Listen to my music
              </Link>
              <Link
                to="/explore"
                className="mt-4 sm:ml-4 sm:mt-0 w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-semibold rounded-md text-white bg-gray-800 shadow-sm hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150 xl:text-lg xl:py-4"
              >
                Explore music from others →
              </Link>
            </div>
          </div>
          <div className="mt-8 sm:mt-12 relative h-64 overflow-hidden bg-gray-300 lg:hidden">
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
          <div className="px-6 pt-6 md:max-w-3xl md:mx-auto lg:mx-0 lg:max-w-full">
            <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Artiste</p>
            <div className="mt-4 sm:flex">
              <Link to="/about" className="flex items-center no-underline">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full border-2 border-white"
                    src="https://res.cloudinary.com/my-nigerian-projects/image/upload/w_400,h_400,c_crop,g_face,r_max/w_200/v1596698079/Others/john_r5z4ij.jpg"
                    alt="John Side Photo"
                  />
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-white leading-tight">John Sido</p>
                  <p className="text-sm text-gray-500 leading-tight">Abuja, Nigeria</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
