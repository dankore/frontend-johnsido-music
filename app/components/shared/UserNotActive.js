import React from 'react';
import PropTypes from 'prop-types';

function UserNotActive({ user }) {
  return (
    <div className="w-full -mt-56">
      <div className="flex justify-center">
        <img
          alt="Profile avatar"
          src={user.profileAvatar}
          className="shadow-xl rounded-full h-auto align-middle border-none"
          style={{ maxWidth: '150px' }}
        />
      </div>
      <div className="text-center">
        <h3 className="text-4xl font-semibold leading-normal text-gray-800">
          {user.profileFirstName} {user.profileLastName}
        </h3>
        <p className="mb-2">@{user.profileUsername}</p>
      </div>
      <h2 className="mt-2 max-w-lg mx-auto text-2xl leading-8 font-semibold font-display text-gray-600 sm:text-3xl sm:leading-9 lg:text-4xl lg:leading-10 text-center">
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
