import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../layouts/Page';
import PropTypes from 'prop-types';

function FollowPage({ profileUser }) {
  return (
    <Page title="Follow Page">
      <div className="flex justify-between bg-gray-200 p-3">
        <Link to={`/profile/${profileUser.profileUsername}/followers`}>Followers</Link>

        <Link to={`/profile/${profileUser.profileUsername}/following`}>Following</Link>
      </div>
    </Page>
  );
}

FollowPage.propTypes = {
  profileUser: PropTypes.object,
};

export default FollowPage;
