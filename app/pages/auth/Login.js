import React, { useContext } from 'react';
import Page from '../../components/layouts/Page';
import StateContext from '../../contextsProviders/StateContext';

function Login() {
  const appState = useContext(StateContext);
  return (
    <Page>
      <div className="w-full flex flex-wrap">
        {/* <!-- Login Section --> */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <div className="flex justify-center lg:justify-start pt-12 lg:pl-12 lg:-mb-24">
            <a href="/" className="bg-black text-white font-bold text-xl p-4">
              <img className="w-64" src={appState.logo.url} alt={appState.logo.alt} />
            </a>
          </div>

          <div className="flex flex-col justify-center lg:justify-start my-auto pt-8 lg:pt-0 px-8 lg:px-24 lg:px-32">
            <p className="text-center text-3xl">Welcome.</p>
            <form className="flex flex-col pt-3 lg:pt-8">
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

              <input
                type="submit"
                value="Log In"
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              />
            </form>
            <div className="text-center pt-12 pb-12">
              <p>
                Don&apos;t have an account?{' '}
                <a href="/regiter" className="underline font-semibold">
                  Register here.
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* <!-- Image Section --> */}
        <div className="w-2/3 custom-layout-bg shadow-2xl">
          <div className="w-full h-screen hidden lg:block"></div>
        </div>
      </div>
    </Page>
  );
}

export default Login;
