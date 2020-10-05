import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { activeNavCSS, linkCSS, navLinkCSS } from '../../helpers/CSSHelpers';

function FollowPageHeader({ profileUser, error }) {
  return (
    <div className="relative border-b">
      {/* ERROR DISPLAY */}
      {error.hasErrors && (
        <div
          style={{
            overflowWrap: 'break-word',
            minWidth: 0 + 'px',
          }}
          className="w-full h-12 liveValidateMessage"
        >
          {error.message}
        </div>
      )}

      <div className="flex items-center justify-between">
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

FollowPageHeader.propTypes = {
  profileUser: PropTypes.object,
  error: PropTypes.object,
};

export default FollowPageHeader;
