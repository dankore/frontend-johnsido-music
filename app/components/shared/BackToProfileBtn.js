import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { linkCSS } from '../../helpers/CSSHelpers';

function BackToProfileBtn({ username, firstName, linkDomId, linkChild }) {
  return (
    <Link
      id={linkDomId && 'wrapper'}
      className={
        linkCSS + ' inline-block transition duration-500 ease-in-out transform hover:scale-110'
      }
      to={`/profile/${username}`}
    >
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#956503">
        <g>
          <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
        </g>
      </svg>
      {linkChild && <span className="text ml-10 block pt-1">Back {firstName}&apos;s profile</span>}
    </Link>
  );
}

BackToProfileBtn.propTypes = {
  username: PropTypes.string,
  firstName: PropTypes.string,
  linkDomId: PropTypes.bool,
  linkChild: PropTypes.bool,
};

export default BackToProfileBtn;
