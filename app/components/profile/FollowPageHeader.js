import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { activeNavCSS, linkCSS, navLinkCSS } from '../../helpers/CSSHelpers';

function FollowPage({ profileUser }) {
  return (
    <div className="px-2 lg:px-0">
      <div className="mt-2 mb-2">
        <div className="flex items-center">
          <Link className={linkCSS} to={`/profile/${profileUser.profileUsername}`}>
            <svg viewBox="0 0 24 24" className="w-8 h-8" stroke="#956503" strokeWidth="0.5">
              <g>
                <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
              </g>
            </svg>
          </Link>{' '}
          <p className="font-bold ml-4">
            {profileUser.profileFirstName} {profileUser.profileLastName}{' '}
          </p>
        </div>
        <p className="ml-12 -m-2 text-gray-700">@{profileUser.profileUsername}</p>
      </div>
      <div className="flex justify-between pb-2">
        <NavLink
          className={linkCSS + navLinkCSS + ' js-brown-bg-hover'}
          activeStyle={activeNavCSS}
          to={`/profile/${profileUser.profileUsername}/followers`}
        >
          Followers
        </NavLink>

        <NavLink
          className={linkCSS + navLinkCSS + ' js-brown-bg-hover'}
          activeStyle={activeNavCSS}
          to={`/profile/${profileUser.profileUsername}/following`}
        >
          Following
        </NavLink>
      </div>
    </div>
  );
}

FollowPage.propTypes = {
  profileUser: PropTypes.object,
};

export default FollowPage;
