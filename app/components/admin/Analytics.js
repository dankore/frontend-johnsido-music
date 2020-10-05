import React from 'react';
import PropTypes from 'prop-types';
import LoadingDotsAnimation from '../shared/LoadingDotsAnimation';

function Analytics({ isFetching, totalUsers }) {
  if (isFetching) {
    return <LoadingDotsAnimation />;
  }

  return (
    <div>
      <div className="flex flex-wrap">
        <div className="w-full p-3 md:w-1/2 xl:w-1/3">
          <div className="p-5 bg-orange-100 border-b-4 border-orange-500 rounded-lg shadow-lg">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="p-5 bg-orange-600 rounded-full">
                  <i className="fas fa-users fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold text-gray-600 uppercase">Total Users</h5>
                <h3 className="text-3xl font-bold">
                  {totalUsers}{' '}
                  <span className="text-orange-500">
                    <i className="fas fa-exchange-alt"></i>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-3 md:w-1/2 xl:w-1/3">
          <div className="p-5 bg-green-100 border-b-4 border-green-600 rounded-lg shadow-lg">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="p-5 bg-green-600 rounded-full">
                  <i className="fa fa-wallet fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold text-gray-600 uppercase">Total Songs</h5>
                <h3 className="text-3xl font-bold">
                  162{' '}
                  <span className="text-green-500">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-3 md:w-1/2 xl:w-1/3">
          <div className="p-5 bg-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-lg">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="p-5 bg-yellow-600 rounded-full">
                  <i className="fas fa-user-plus fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold text-gray-600 uppercase">Total Songs(Johnsido)</h5>
                <h3 className="text-3xl font-bold">
                  10{' '}
                  <span className="text-yellow-600">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-3 md:w-1/2 xl:w-1/3">
          <div className="p-5 bg-blue-100 border-b-4 border-blue-500 rounded-lg shadow-lg">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="p-5 bg-blue-600 rounded-full">
                  <i className="fas fa-server fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold text-gray-600 uppercase">Total Songs(others)</h5>
                <h3 className="text-3xl font-bold">152</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-3 md:w-1/2 xl:w-1/3">
          <div className="p-5 bg-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-lg">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="p-5 bg-indigo-600 rounded-full">
                  <i className="fas fa-tasks fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold text-gray-600 uppercase">To Do List</h5>
                <h3 className="text-3xl font-bold">7 tasks</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-3 md:w-1/2 xl:w-1/3">
          <div className="p-5 bg-red-100 border-b-4 border-red-500 rounded-lg shadow-lg">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="p-5 bg-red-600 rounded-full">
                  <i className="fas fa-inbox fa-2x fa-inverse"></i>
                </div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold text-gray-600 uppercase">Issues</h5>
                <h3 className="text-3xl font-bold">
                  3{' '}
                  <span className="text-red-500">
                    <i className="fas fa-caret-up"></i>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Analytics.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  totalUsers: PropTypes.number.isRequired,
};

export default Analytics;
