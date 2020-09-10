import React from 'react';
import Page from '../../components/layouts/Page';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import Analytics from '../../components/admin/Analytics';
import UploadSong from '../../components/admin/UploadSong';

function AdminLandingPage() {
  return (
    <Page title="Admin Landing Page">
      <nav className="bg-gray-900 fixed w-full flex justify-end z-20 top-0">
        <ul className="flex justify-between flex-1 md:flex-none items-center w-full md:max-w-sm bg-red-500">
          <li className="flex-1 md:flex-none md:mr-3">
            <a className="inline-block py-2 px-4 text-white no-underline" href="#">
              Active
            </a>
          </li>
          <li className="flex-1 md:flex-none md:mr-3">
            <a
              className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
              href="#"
            >
              link
            </a>
          </li>
          <li className="flex-1 md:flex-none md:mr-3">
            <div className="relative inline-block">
              <button
                // onClick="toggleDD('myDropdown')"
                className="drop-button text-white focus:outline-none"
              >
                {' '}
                <span className="pr-2">
                  <i className="em em-robot_face"></i>
                </span>{' '}
                Hi, User{' '}
                <svg
                  className="h-3 fill-current inline"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </button>
              <div
                id="myDropdown"
                className="dropdownlist absolute bg-gray-900 text-white right-0 mt-3 p-3 overflow-auto z-30 invisible"
              >
                <a
                  href="#"
                  className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"
                >
                  <i className="fa fa-user fa-fw"></i> Profile
                </a>
                <a
                  href="#"
                  className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"
                >
                  <i className="fa fa-cog fa-fw"></i> Settings
                </a>
                <div className="border border-gray-800"></div>
                <a
                  href="#"
                  className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"
                >
                  <i className="fas fa-sign-out-alt fa-fw"></i> Log Out
                </a>
              </div>
            </div>
          </li>
        </ul>
      </nav>

      <div className="flex flex-col md:flex-row">
        <div className="bg-gray-900 shadow-lg h-16 fixed bottom-0 md:relative md:h-screen z-10 w-full md:w-48">
          <div className="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
            <ul className="flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
              <NavLink
                to="/admin/analytics"
                className="mr-3 flex-1 block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500"
              >
                <i className="fas fa-tasks md:mr-3"></i>
                <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                  Analytics
                </span>
              </NavLink>
              <NavLink
                to="/admin/upload-song"
                className="mr-3 flex-1 block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500"
              >
                <i className="fa fa-envelope md:mr-3"></i>
                <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                  Add song
                </span>
              </NavLink>
            </ul>
          </div>
        </div>
        <div className="main-content flex-1 bg-gray-100 mt-10 pb-24 md:pb-5">
          <Switch>
            <Route path="/admin/analytics">
              <Analytics />
            </Route>
            <Route path="/admin/upload-song">
              <UploadSong />
            </Route>
            <Route>
              <Redirect to="/admin/analytics" />
            </Route>
          </Switch>
        </div>
      </div>
    </Page>
  );
}

export default AdminLandingPage;
