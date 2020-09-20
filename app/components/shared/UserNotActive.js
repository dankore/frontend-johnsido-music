import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function UserNotActive({ user }) {
  return (
    <div className="relative break-words w-full mb-6 -mt-48">
      <div className="flex justify-center  w-full">
        <img
          alt="Profile avatar"
          src={user.profileAvatar}
          className="shadow-xl rounded-full w-48 h-48 align-middle border-none"
        />
      </div>

      <div className="text-center mt-5">
        <h3 className="text-4xl font-semibold leading-normal text-gray-800">
          {user.profileFirstName} {user.profileLastName}
        </h3>
        <p className="mb-2">@{user.profileUsername}</p>
      </div>
      <h2 className="text-center text-2xl px-3 font-semibold">Account suspended</h2>
      <h2 className="mt-2 px-3 text-lg mx-auto leading-8 font-display text-gray-900 sm:leading-9 lg:leading-10 text-center">
        {user.profileFirstName} {user.profileLastName}&apos;s account is suspended due to violations
        of our
        <Link className="js-brown focus:outline-none hover:underline ml-2" to="#">
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
