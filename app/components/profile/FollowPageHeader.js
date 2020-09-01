import React from 'react';
import { NavLink } from 'react-router-dom';
import Page from '../layouts/Page';
import PropTypes from 'prop-types';
import { activeNavCSS } from '../../helpers/CSSHelpers';

function FollowPage({ profileUser }) {
  return (
    <Page title="Follow Page">
      <div className="flex justify-between p-3">
        <NavLink
          activeStyle={activeNavCSS}
          to={`/profile/${profileUser.profileUsername}/followers`}
        >
          Followers
        </NavLink>

        <NavLink
          activeStyle={activeNavCSS}
          to={`/profile/${profileUser.profileUsername}/following`}
        >
          Following
        </NavLink>
      </div>
    </Page>
  );
}

FollowPage.propTypes = {
  profileUser: PropTypes.object,
};

export default FollowPage;
