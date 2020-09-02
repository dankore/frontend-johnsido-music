import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { activeNavCSS } from '../../helpers/CSSHelpers';

function FollowPage({ profileUser }) {
  return (
    <div className="flex justify-between p-3">
      <NavLink activeStyle={activeNavCSS} to={`/profile/${profileUser.profileUsername}/followers`}>
        Followers
      </NavLink>

      <NavLink activeStyle={activeNavCSS} to={`/profile/${profileUser.profileUsername}/following`}>
        Following
      </NavLink>
    </div>
  );
}

FollowPage.propTypes = {
  profileUser: PropTypes.object,
};

export default FollowPage;
