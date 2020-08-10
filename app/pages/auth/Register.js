import React, { useContext } from 'react';
import Page from '../../components/layouts/Page';
import StateContext from '../../contextsProviders/StateContext';
import { Link } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';

function Register() {
  const appState = useContext(StateContext);
  const initialState = {
    firstName: {
      value: '',
      hasError: false,
      message: '',
    },
    lastName: {
      value: '',
      hasError: false,
      message: '',
    },
    email: {
      value: '',
      hasError: false,
      message: '',
    },
    password: {
      value: '',
      hasError: false,
      message: '',
    },
    confirmPassword: {
      value: '',
      hasError: false,
      message: '',
    },
  };

  function reducer(draft, action) {
    switch (action.type) {
      case 'updateFirstName':
        draft.firstName.hasError = false;
        draft.firstName.value = action.value;
        return;
      case 'updateLastName':
        draft.lastName.hasError = false;
        draft.lastName.value = action.value;
        return;
      case 'updateEmail':
        draft.email.hasError = false;
        draft.email.value = action.value;
        return;
      case 'updatePassword':
        draft.password.hasError = false;
        draft.password.value = action.value;
        return;
      case 'updateConfirmPassword':
        draft.confirmPassword.hasError = false;
        draft.confirmPassword.value = action.value;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState);
  console.log(state);
  return (
    <Page>
      <div className="w-full flex flex-wrap">
        {/* <!-- Register Section --> */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <div className="flex bg-gray-900 justify-center pt-12">
            <Link to="/" className="text-white font-bold text-xl p-4">
              <img className="w-32 h-32" src={appState.logo.url} alt={appState.logo.alt} />
            </Link>
          </div>

          <div className="flex flex-col justify-center lg:justify-start my-auto pt-8 px-3 md:px-32 lg:px-3">
            <p className="text-center text-3xl">Join Us.</p>
            <form className="flex flex-col pt-3 lg:pt-8">
              <div className="flex flex-col pt-4">
                <label htmlFor="firstName" className="text-lg">
                  First Name
                </label>
                <input
                  value={state.firstName.value}
                  onChange={e => dispatch({ type: 'updateFirstName', value: e.target.value })}
                  type="text"
                  id="FirstName"
                  placeholder="John"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex flex-col pt-4">
                <label htmlFor="lastName" className="text-lg">
                  Last Name
                </label>
                <input
                  value={state.lastName.value}
                  onChange={e => dispatch({ type: 'updateLastName', value: e.target.value })}
                  type="text"
                  id="lastName"
                  placeholder="Sido"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  value={state.email.value}
                  onChange={e => dispatch({ type: 'updateEmail', value: e.target.value })}
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
                  value={state.password.value}
                  onChange={e => dispatch({ type: 'updatePassword', value: e.target.value })}
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
                  value={state.confirmPassword.value}
                  onChange={e => dispatch({ type: 'updateConfirmPassword', value: e.target.value })}
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
