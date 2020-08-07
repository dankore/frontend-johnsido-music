import React, { useContext } from 'react';
import Page from '../../components/layouts/Page';
import StateContext from '../../contextsProviders/StateContext';

function Register() {
  const appState = useContext(StateContext);

  return (
    <Page>
      <div className="w-full flex flex-wrap">
        {/* <!-- Register Section --> */}
         <div className="w-full lg:w-1/3 flex flex-col">
          <div className="flex bg-gray-900 justify-center pt-12">
            <a href="/" className="text-white font-bold text-xl p-4">
              <img className="w-64" src={appState.logo.url} alt={appState.logo.alt} />
            </a>
          </div>

          <div className="flex flex-col justify-center lg:justify-start my-auto pt-8 px-3 md:px-32 lg:px-3">
            <p className="text-center text-3xl">Join Us.</p>
            <form className="flex flex-col pt-3 lg:pt-8">
              <div className="flex flex-col pt-4">
                <label htmlFor="name" className="text-lg">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Smith"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="confirm-password" className="text-lg">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <input
                type="submit"
                value="Register"
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              />
            </form>
            <div className="text-center pt-12 pb-12">
              <p>
                Already have an account?{' '}
                <a href="/login" className="underline font-semibold">
                  Log in here.
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* <!-- Image Section --> */}
        <div className="w-2/3 custom-layout-bg shadow-2xl">
          <div className="object-cover w-full h-screen hidden lg:block"></div>
        </div>
      </div>
    </Page>
  );
}

export default Register;
