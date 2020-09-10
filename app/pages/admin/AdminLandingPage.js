import React from 'react';
import Page from '../../components/layouts/Page';

function AdminLandingPage() {
  return (
    <Page title="Admin Landing Page">
      {/* <!--Nav--> */}
      <nav className="bg-black pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 pin-t">
        <div className="flex flex-wrap items-center">
          <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
            <a href="#">
              <span className="text-xl pl-2">
                <i className="em em-grinning"></i>
              </span>
            </a>
          </div>

          <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2">
            <span className="relative w-full">
              <input
                type="search"
                placeholder="Search"
                className="w-full bg-grey-darkest text-sm text-white transition border border-transparent focus:outline-none focus:border-grey-darker rounded py-1 px-2 pl-10 appearance-none leading-normal"
              />
              <div className="absolute search-icon" style={{ top: 0.5 + 'rem', left: 0.8 + 'rem' }}>
                <svg
                  className="fill-current pointer-events-none text-white w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                </svg>
              </div>
            </span>
          </div>

          <div className="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
            <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
              <li className="flex-1 md:flex-none md:mr-3">
                <a className="inline-block py-2 px-4 text-white no-underline" href="#">
                  Active
                </a>
              </li>
              <li className="flex-1 md:flex-none md:mr-3">
                <a
                  className="inline-block text-grey-dark no-underline hover:text-grey-lighter hover:text-underline py-2 px-4"
                  href="#"
                >
                  link
                </a>
              </li>
              <li className="flex-1 md:flex-none md:mr-3">
                <div className="relative inline-block">
                  <button
                    onClick="toggleDD('myDropdown')"
                    className="drop-button text-white focus:outline-none"
                  >
                    {' '}
                    <span className="pr-2">
                      <i className="em em-robot_face"></i>
                    </span>{' '}
                    Hi, User{' '}
                    <svg
                      className="h-3 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </button>
                  <div
                    id="myDropdown"
                    className="dropdownlist absolute bg-black text-white pin-r mt-3 p-3 overflow-auto z-30 invisible"
                  >
                    <input
                      type="text"
                      className="drop-search p-2 text-grey-dark"
                      placeholder="Search.."
                      id="myInput"
                      onKeyUp="filterDD('myDropdown','myInput')"
                    />
                    <a
                      href="#"
                      className="p-2 hover:bg-grey-darkest text-white text-sm no-underline hover:no-underline block"
                    >
                      <i className="fa fa-user fa-fw"></i> Profile
                    </a>
                    <a
                      href="#"
                      className="p-2 hover:bg-grey-darkest text-white text-sm no-underline hover:no-underline block"
                    >
                      <i className="fa fa-cog fa-fw"></i> Settings
                    </a>
                    <div className="border border-grey-darkest"></div>
                    <a
                      href="#"
                      className="p-2 hover:bg-grey-darkest text-white text-sm no-underline hover:no-underline block"
                    >
                      <i className="fas fa-sign-out-alt fa-fw"></i> Log Out
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row">
        <div className="bg-black shadow-lg h-16 fixed pin-b mt-12 md:relative md:h-screen z-10 w-full md:w-48">
          <div className="md:mt-12 md:w-48 md:fixed md:pin-l md:pin-t content-center md:content-start text-left justify-between">
            <ul className="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
              <li className="mr-3 flex-1">
                <a
                  href="#"
                  className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-grey-darkest hover:border-pink"
                >
                  <i className="fas fa-tasks pr-0 md:pr-3"></i>
                  <span className="pb-1 md:pb-0 text-xs md:text-base text-grey-dark md:text-grey-light block md:inline-block">
                    Tasks
                  </span>
                </a>
              </li>
              <li className="mr-3 flex-1">
                <a
                  href="#"
                  className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-grey-darkest hover:border-purple"
                >
                  <i className="fa fa-envelope pr-0 md:pr-3"></i>
                  <span className="pb-1 md:pb-0 text-xs md:text-base text-grey-dark md:text-grey-light block md:inline-block">
                    Messages
                  </span>
                </a>
              </li>
              <li className="mr-3 flex-1">
                <a
                  href="#"
                  className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-blue-dark"
                >
                  <i className="fas fa-chart-area pr-0 md:pr-3 text-blue-dark"></i>
                  <span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
                    Analytics
                  </span>
                </a>
              </li>
              <li className="mr-3 flex-1">
                <a
                  href="#"
                  className="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-grey-darkest hover:border-red"
                >
                  <i className="fa fa-wallet pr-0 md:pr-3"></i>
                  <span className="pb-1 md:pb-0 text-xs md:text-base text-grey-dark md:text-grey-light block md:inline-block">
                    Payments
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="main-content flex-1 bg-grey-lightest mt-12 md:mt-2 pb-24 md:pb-5">
          <div className="bg-blue-darker p-2 shadow text-xl text-white">
            <h3 className="pl-2">Analytics</h3>
          </div>

          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              {/* <!--Metric Card--> */}
              <div className="bg-green-lightest border-b-4 border-green-600 rounded-lg shadow-lg p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-green-600">
                      <i className="fa fa-wallet fa-2x fa-inverse"></i>
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h5 className="uppercase text-grey-600">Total Revenue</h5>
                    <h3 className="text-3xl">
                      $3249{' '}
                      <span className="text-green">
                        <i className="fas fa-caret-up"></i>
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
              {/* <!--/Metric Card--> */}
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              {/* <!--Metric Card--> */}
              <div className="bg-orange-lightest border-b-4 border-orange-600 rounded-lg shadow-lg p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-orange-600">
                      <i className="fas fa-users fa-2x fa-inverse"></i>
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h5 className="uppercase text-grey-600">Total Users</h5>
                    <h3 className="text-3xl">
                      249{' '}
                      <span className="text-orange">
                        <i className="fas fa-exchange-alt"></i>
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
              {/* <!--/Metric Card--> */}
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              {/* <!--Metric Card--> */}
              <div className="bg-yellow-lightest border-b-4 border-yellow-600 rounded-lg shadow-lg p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-yellow-600">
                      <i className="fas fa-user-plus fa-2x fa-inverse"></i>
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h5 className="uppercase text-grey-600">New Users</h5>
                    <h3 className="text-3xl">
                      2{' '}
                      <span className="text-yellow-600">
                        <i className="fas fa-caret-up"></i>
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
              {/* <!--/Metric Card--> */}
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              {/* <!--Metric Card--> */}
              <div className="bg-blue-lightest border-b-4 border-blue-600 rounded-lg shadow-lg p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-blue-600">
                      <i className="fas fa-server fa-2x fa-inverse"></i>
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h5 className="uppercase text-grey-600">Server Uptime</h5>
                    <h3 className="text-3xl">152 days</h3>
                  </div>
                </div>
              </div>
              {/* <!--/Metric Card--> */}
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              {/* <!--Metric Card--> */}
              <div className="bg-indigo-lightest border-b-4 border-indigo-600 rounded-lg shadow-lg p-5">
                <div className="flex flex-row items-center">
                  <div className="flex-shrink pr-4">
                    <div className="rounded-full p-5 bg-indigo-600">
                      <i className="fas fa-tasks fa-2x fa-inverse"></i>
                    </div>
                  </div>
                  <div className="flex-1 text-right md:text-center">
                    <h5 className="uppercase text-grey-600">To Do List</h5>
                    <h3 className="text-3xl">7 tasks</h3>
                  </div>
                </div>
              </div>
              {/* <!--/Metric Card--> */}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default AdminLandingPage;
