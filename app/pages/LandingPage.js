import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
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
          backgroundSize: 100 + '%',
          backgroundposition: -5 + 'px' - 5 + 'px',
          fill: 'green',
        }}
      >
        <div>
          <div className="px-6 pt-8 pb-12 md:max-w-3xl md:mx-auto lg:mx-0 lg:max-w-none lg:pt-0 lg:pb-16">
            <div className="flex items-center justify-between">
              <div>
                <img
                  className="-ml-2 w-64"
                  src="https://res.cloudinary.com/my-nigerian-projects/image/upload/v1596701942/Others/logo_transparent.png"
                  alt="John Sido Musical"
                />
              </div>
              <div>
                <div className="block lg:hidden">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </div>
                <div className="hidden lg:block text-right">
                  <Link
                    to="/login"
                    className="text-sm block -mr-1 font-semibold text-white focus:outline-none focus:underline"
                  >
                    Login
                  </Link>

                  <Link
                    to="/about"
                    className="text-sm block mr-1 font-semibold text-white focus:outline-none focus:underline"
                  >
                    About
                  </Link>
                  <Link
                    to="/profile"
                    className="text-sm block mr-2 font-semibold text-white focus:outline-none focus:underline"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm mr-3 text-rightblock font-semibold text-white focus:outline-none focus:underline"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 md:max-w-3xl md:mx-auto lg:mx-0 lg:max-w-none">
            <h1 className="mt-3 text-3xl leading-9 font-semibold font-display text-white sm:mt-6 sm:text-4xl sm:leading-10 xl:text-5xl xl:leading-none">
              Be bold, be musical
              <br />
              <span className="text-teal-400">John Sido.</span>
            </h1>
            <p className="mt-2 text-lg leading-7 text-gray-300 sm:mt-3 sm:text-xl sm:max-w-xl xl:mt-4 xl:text-2xl xl:max-w-2xl">
              I&apos;m on a gospel musician on a journey to help myself and other upcoming
              musicians.
            </p>
            <div className="mt-6 sm:flex sm:mt-8 xl:mt-12">
              <Link
                to="/components"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-semibold rounded-md text-gray-900 bg-white shadow-sm hover:text-gray-600 focus:outline-none focus:text-gray-600 transition ease-in-out duration-150 xl:text-lg xl:py-4"
              >
                Listen to my music
              </Link>
              <Link
                to="/pricing"
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
          <div className="px-6 py-8 sm:pt-12 md:max-w-3xl md:mx-auto lg:mx-0 lg:max-w-full">
            <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Artist</p>
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
