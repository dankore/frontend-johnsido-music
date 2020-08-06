import React from 'react';

function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 lg:bg-gray-900">
      <div
        className="hidden lg:block absolute scroll-bg"
        style={{
          height: 400 + '%',
          width: 400 + '%',
          top: -25 + '%',
          left: -100 + '%',
          backgroundSize: 800 + 'px',
          backgroundImage:
            'url(' +
            'https://res.cloudinary.com/my-nigerian-projects/image/upload/v1594184079/samples/cloudinary-icon.png' +
            ')',
        }}
      ></div>
      <div
        className="relative min-h-screen lg:min-w-3xl xl:min-w-4xl lg:flex lg:items-center lg:justify-center lg:w-3/5 lg:py-20 lg:pl-8 lg:pr-8 bg-no-repeat"
        style={{
          backgroundImage: 'url(' + 'https://tailwindui.com/img/angled-background.svg' + ')',
          backgroundSize: 100 + '%',
          backgroundposition: -5 + 'px' - 5 + 'px',
        }}
      >
        <div className="">
          <div className="px-6 pt-8 pb-12 md:max-w-3xl md:mx-auto lg:mx-0 lg:max-w-none lg:pt-0 lg:pb-16">
            <div className="flex items-center justify-between">
              <div>
                <img
                  className="h-24 lg:h-32 xl:h-40"
                  src="https://res.cloudinary.com/my-nigerian-projects/image/upload/v1596697135/Others/logo_transparent_xsyfuv.png"
                  alt="John Sido Musical"
                />
              </div>
              <div>
                <div>
                  <a
                    href="/login"
                    className="text-sm font-semibold text-white focus:outline-none focus:underline"
                  >
                    Login →
                  </a>
                </div>
                <div>
                  <a
                    href="/register"
                    className="text-sm font-semibold text-white focus:outline-none focus:underline"
                  >
                    Register
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 md:max-w-3xl md:mx-auto lg:mx-0 lg:max-w-none">
            <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Accepting entries
            </p>
            <h1 className="mt-3 text-3xl leading-9 font-semibold font-display text-white sm:mt-6 sm:text-4xl sm:leading-10 xl:text-5xl xl:leading-none">
              Be bold, be musical
              <br className="hidden sm:inline" />
              <span className="text-teal-400">John Sido.</span>
            </h1>
            <p className="mt-2 text-lg leading-7 text-gray-300 sm:mt-3 sm:text-xl sm:max-w-xl xl:mt-4 xl:text-2xl xl:max-w-2xl">
              I&apos;m on a muscal journey to help myself and other upcoming musicians.
            </p>
            <div className="mt-6 sm:flex sm:mt-8 xl:mt-12">
              <a
                href="/components"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-semibold rounded-md text-gray-900 bg-white shadow-sm hover:text-gray-600 focus:outline-none focus:text-gray-600 transition ease-in-out duration-150 xl:text-lg xl:py-4"
              >
                Listen to my music
              </a>
              <a
                href="/pricing"
                className="mt-4 sm:ml-4 sm:mt-0 w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-semibold rounded-md text-white bg-gray-800 shadow-sm hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150 xl:text-lg xl:py-4"
              >
                Explore music from others →
              </a>
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
                  'https://res.cloudinary.com/my-nigerian-projects/image/upload/v1594184079/samples/cloudinary-icon.png' +
                  ')',
              }}
            ></div>
          </div>
          <div className="px-6 py-8 sm:pt-12 md:max-w-3xl md:mx-auto lg:mx-0 lg:max-w-full lg:py-0 lg:pt-24">
            <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Artist</p>
            <div className="mt-4 sm:flex">
              <a href="https://twitter.com/adamwathan" className="flex items-center no-underline">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full border-2 border-white"
                    src="https://res.cloudinary.com/my-nigerian-projects/image/upload/w_400,h_400,c_crop,g_face,r_max/w_200/v1596698079/Others/john_r5z4ij.jpg"
                    alt="John Side Photo"
                  />
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-white leading-tight">Adamu D. Muhammad</p>
                  <p className="text-sm text-gray-500 leading-tight">Abuja, Nigeria</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
