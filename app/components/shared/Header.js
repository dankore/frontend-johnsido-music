import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="bg-white custom-shadow flex items-center justify-between flex-wrap bg-grey-darkest p-6 top-0 fixed z-10 w-full">
      <div className="flex items-center flex-no-shrink mr-6">
        <Link className="no-underline hover:no-underline" to="/">
          <span className="text-2xl pl-2">John Sido</span>
        </Link>
      </div>

      <div className="block lg:hidden">
        <button
          id="nav-toggle"
          className="flex items-center px-3 py-2 border rounded text-grey border-grey-dark hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div
        className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0"
        id="nav-content"
      >
        <ul className="list-reset lg:flex justify-end flex-1 items-center">
          <li className="mr-3">
            <Link
              className="inline-block text-grey-dark no-underline hover:text-grey-lighter hover:text-underline py-2 px-4"
              to="/register"
            >
              Register
            </Link>
          </li>
          <li className="mr-3">
            <Link
              className="inline-block text-grey-dark no-underline hover:text-grey-lighter hover:text-underline py-2 px-4"
              to="/login"
            >
              Login
            </Link>
          </li>
          <li className="mr-3">
            <Link
              className="inline-block text-grey-dark no-underline hover:text-grey-lighter hover:text-underline py-2 px-4"
              to="/profile"
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
