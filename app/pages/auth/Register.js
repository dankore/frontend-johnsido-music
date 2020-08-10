import React, { useContext, useEffect } from 'react';
import Page from '../../components/layouts/Page';
import StateContext from '../../contextsProviders/StateContext';
import { Link } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';

function Register() {
  const appState = useContext(StateContext);
  const initialState = {
    username: {
      value: '',
      hasError: false,
      message: '',
    },
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
      checkCount: 0,
      isUnique: false,
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
      case 'usernameImmediately':
        draft.username.hasError = false;
        draft.username.value = action.value;
        if (draft.username.value == '') {
          draft.username.hasError = true;
          draft.username.message = 'Username cannot be empty.';
        }
        if (draft.username.value.length > 0 && draft.username.value.length < 3) {
          draft.username.hasError = true;
          draft.username.message = 'Username must be at least 3 characters.';
        }
        if (draft.username.value.length > 30) {
          draft.username.hasError = true;
          draft.username.message = 'Username cannot exceed 30 characters.';
        }
        if (draft.username.value && !/^([a-zA-Z0-9]+)$/.test(draft.username.value)) {
          draft.username.hasError = true;
          draft.username.message = 'Username can only contain English alphabets and numbers.';
        }

        return;
      case 'firstNameImmediately':
        draft.firstName.hasError = false;
        draft.firstName.value = action.value;

        if (draft.firstName.value == '') {
          draft.firstName.hasError = true;
          draft.firstName.message = 'First name cannot be empty.';
        }
        if (/[^a-zA-Z]/.test(draft.firstName.value.trim())) {
          draft.firstName.hasError = true;
          draft.firstName.message = 'First name can only be English alphabets.';
        }

        if (draft.firstName.value.length > 50) {
          draft.firstName.hasError = true;
          draft.firstName.message = 'First name cannot exceed 50 characters.';
        }

        return;
      case 'lastNameImmediately':
        draft.lastName.hasError = false;
        draft.lastName.value = action.value;

        if (draft.lastName.value == '') {
          draft.lastName.hasError = true;
          draft.lastName.message = 'Last name cannot be empty.';
        }
        if (/[^a-zA-Z]/.test(draft.lastName.value.trim())) {
          draft.lastName.hasError = true;
          draft.lastName.message = 'Last name can only be English alphabets.';
        }

        if (draft.lastName.value.length > 50) {
          draft.lastName.hasError = true;
          draft.lastName.message = 'Last name cannot exceed 50 characters.';
        }
        return;
      case 'emailImmediately':
        draft.email.hasError = false;
        draft.email.value = action.value;

        if (draft.email.value == '') {
          draft.email.hasError = true;
          draft.email.message = 'Email cannot be empty.';
        }

        return;
      case 'emailAfterDelay':
        if (!/^\S+@\S+$/.test(draft.email.value.trim())) {
          draft.email.hasError = true;
          draft.email.message = 'Please provide a valid email.';
        }
        if (!draft.email.hasError) {
          draft.email.checkCount++;
        }
        return;
      case 'emailIsUnique':
        if (action.value) {
          draft.email.hasError = true;
          draft.email.isUnique = false;
          draft.email.message = 'Email is already being used.';
        } else {
          draft.email.isUnique;
        }
        return;
      case 'passwordImmediately':
        draft.password.hasError = false;
        draft.password.value = action.value;
        return;
      case 'confirmPasswordImmediately':
        draft.confirmPassword.hasError = false;
        draft.confirmPassword.value = action.value;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState);

  // EMAIL AFTER DELAY: VALID EMAILS ONLY
  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(() => dispatch({ type: 'emailAfterDelay' }), 800);

      return () => clearTimeout(delay);
    }
  }, [state.email.value]);

  // EMAIL AFTER DELAY: HAS EMAIL BEING USED BEFORE?
  useEffect(() => {
    if (state.email.checkCount) {
      const request = Axios.CancelToken.source();
      (async function isEmailUnique() {
        try {
          const response = await Axios.post(
            '/doesEmailExists',
            { email: state.email.value },
            { cancelToken: request.token }
          );
          console.log(response.data);
          dispatch({ type: 'emailIsUnique', value: response.data });
        } catch (error) {
          console.log(error.message);
        }
      })();

      return () => request.cancel();
    }
  }, [state.email.checkCount]);

  return (
    <Page title="Register">
      <div className="w-full flex flex-wrap">
        {/* <!-- Register Section --> */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <div className="flex bg-gray-900 justify-center">
            <Link to="/" className="text-white font-bold text-xl p-4">
              <img className="w-32 h-32" src={appState.logo.url} alt={appState.logo.alt} />
            </Link>
          </div>

          <div className="flex flex-col justify-center lg:justify-start my-auto px-3 md:px-32 lg:px-3">
            <p className="text-center text-3xl pt-4">Register</p>
            <form className="flex flex-col">
              {/* USERNAME */}
              <div className="relative flex flex-col pt-4">
                <label htmlFor="username" className="text-lg">
                  Username
                </label>
                <input
                  value={state.username.value}
                  onChange={e => dispatch({ type: 'usernameImmediately', value: e.target.value })}
                  type="text"
                  id="username"
                  placeholder="John"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                {state.username.hasError && (
                  <div className="text-red-600">{state.username.message}</div>
                )}
              </div>
              {/* FIRST NAME */}
              <div className="relative flex flex-col pt-4">
                <label htmlFor="firstName" className="text-lg">
                  First Name
                </label>
                <input
                  value={state.firstName.value}
                  onChange={e => dispatch({ type: 'firstNameImmediately', value: e.target.value })}
                  type="text"
                  id="FirstName"
                  placeholder="John"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                {state.firstName.hasError && (
                  <div className="text-red-600">{state.firstName.message}</div>
                )}
              </div>
              {/* LAST NAME*/}
              <div className="relative flex flex-col pt-4">
                <label htmlFor="lastName" className="text-lg">
                  Last Name
                </label>
                <input
                  value={state.lastName.value}
                  onChange={e => dispatch({ type: 'lastNameImmediately', value: e.target.value })}
                  type="text"
                  id="lastName"
                  placeholder="Sido"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                {state.lastName.hasError && (
                  <div className="text-red-600">{state.lastName.message}</div>
                )}
              </div>
              {/* EMAIL */}
              <div className="relative flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  value={state.email.value}
                  onChange={e => dispatch({ type: 'emailImmediately', value: e.target.value })}
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                {state.email.hasError && <div className="text-red-600">{state.email.message}</div>}
              </div>
              {/* PASSWORD */}
              <div className="relative flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <input
                  value={state.password.value}
                  onChange={e => dispatch({ type: 'passwordImmediately', value: e.target.value })}
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                {state.password.hasError && (
                  <div className="text-red-600">{state.password.message}</div>
                )}
              </div>
              {/* CONFIRM PASSWORD */}
              <div className="relative flex flex-col pt-4">
                <label htmlFor="confirm-password" className="text-lg">
                  Confirm Password
                </label>
                <input
                  value={state.confirmPassword.value}
                  onChange={e =>
                    dispatch({ type: 'confirmPasswordImmediately', value: e.target.value })
                  }
                  type="password"
                  id="confirm-password"
                  placeholder="Password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                {state.confirmPassword.hasError && (
                  <div className="text-red-600">{state.confirmPassword.message}</div>
                )}
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
