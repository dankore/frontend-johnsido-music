import React from 'react';
import PropTypes from 'prop-types';

function RoleUserTemplate({ user }) {
  return (
    <div className="flex flex-wrap bg-white justify-center">
      <div className="px-6 py-4 whitespace-no-wrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
          </div>
          <div className="ml-4">
            <div className="text-sm leading-5 font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-sm leading-5 text-gray-500">{user.username}</div>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 whitespace-no-wrap">
        <div className="text-sm leading-5 text-gray-900">{user.about.bio.substring(0, 15)}</div>
        <div className="text-sm leading-5 text-gray-500">Optimization</div>
      </div>
      <div className="px-6 py-4 whitespace-no-wrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      </div>
      <div className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
        {user.scope.indexOf('admin') > -1 ? 'Admin' : 'User'}
      </div>
      <div className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          Edit
        </a>
      </div>
    </div>
  );
}

RoleUserTemplate.propTypes = {
  user: PropTypes.object.isRequired,
};

export default RoleUserTemplate;
