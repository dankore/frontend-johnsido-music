import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Followers({ followers }) {
  console.log({ followers });

  return (
    <div className="mx-auto bg-yellow-300">
      {followers.map((follower, index) => {
        return (
          <Link
            className="flex items-center"
            key={index}
            to={`/profile/${follower.author.username}`}
          >
            <img className="w-12 h-12 rounded-full mr-3" src={`${follower.author.avatar}`} />

            <p>{follower.author.firstName}</p>
          </Link>
        );
      })}
    </div>
  );
}

Followers.propTypes = {
  followers: PropTypes.array,
};

export default Followers;
