import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function UserNotActive({ user }) {
  return (
    <div className="relative w-full mb-6 -mt-48 break-words">
      <div className="flex justify-center w-full">
        <img
          alt="Profile avatar"
          src={user.profileAvatar}
          className="w-48 h-48 align-middle border-none rounded-full shadow-xl"
        />
      </div>

      <div className="mt-5 text-center">
        <h3 className="text-4xl font-semibold leading-normal text-gray-800">
          {user.profileFirstName} {user.profileLastName}
        </h3>
        <p className="mb-2">@{user.profileUsername}</p>
      </div>
      <h2 className="px-3 text-2xl font-semibold text-center">Account suspended</h2>
      <h2 className="px-3 mx-auto mt-2 text-lg leading-8 text-center text-gray-900 font-display sm:leading-9 lg:leading-10">
        {user.profileFirstName} {user.profileLastName}&apos;s account is suspended due to violations
        of our
        <Link className="ml-2 js-brown focus:outline-none hover:underline" to="/terms">
          Policies
        </Link>
        .
      </h2>
    </div>
  );
}

UserNotActive.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserNotActive;
