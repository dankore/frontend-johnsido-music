import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { activeNavCSS, linkCSS, navLinkCSS } from '../../helpers/CSSHelpers';

function FollowPage({ profileUser, error }) {
  return (
    <div
      className="relative px-2 lg:px-0 border-b"
      style={{
        overflowWrap: 'break-word',
        minWidth: 0 + 'px',
      }}
    >
      {/* ERROR DISPLAY */}
      {error.hasErrors && <div className="liveValidateMessage w-full h-12">{error.message}</div>}

      <div className="flex justify-between">
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
  error: PropTypes.object,
};

export default FollowPage;
