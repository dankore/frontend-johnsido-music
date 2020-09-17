import React from 'react';
import PropTypes from 'prop-types';

function UserNotActive({ user }) {
  return (
    <div className="relative absolute break-words w-full mb-6 lg:-mt-48">
      <div className="flex justify-center  w-full">
        <img
          alt="Profile avatar"
          src={user.profileAvatar}
          className="shadow-xl rounded-full h-auto align-middle border-none"
          style={{ maxWidth: '150px' }}
        />
      </div>

      <div className="text-center mt-5">
        <h3 className="text-4xl font-semibold leading-normal text-gray-800">
          {user.profileFirstName} {user.profileLastName}
        </h3>
        <p className="mb-2">@{user.profileUsername}</p>
      </div>
      <h2 className="text-center text-2xl px-3">Deactivated Account</h2>
      <h2 className="mt-2 px-3 max-w-lg mx-auto leading-8 font-semibold font-display text-gray-600 sm:leading-9 lg:leading-10 text-center">
        {user.profileFirstName} {user.profileLastName}&apos;s account has been deactivated by this
        website&apos;s admin.
      </h2>
    </div>
  );
}

UserNotActive.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserNotActive;
