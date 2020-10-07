import React from 'react';
import PropTypes from 'prop-types';

function ReuseableButton({ handleToggle, username, btnText }) {
  function bgTextColor() {
    if (btnText == 'Active' || btnText == 'Inactive') {
      return btnText == 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
    }
    if (btnText == 'Admin' || btnText == 'User') {
      return btnText == 'Admin' ? 'bg-green-200 text-green-800' : 'bg-indigo-200 text-indigo-600';
    }
  }

  return (
    <button
      onClick={handleToggle}
      data-username={username}
      className={`underline px-2 focus:outline-none focus:shadow-outline inline-flex text-xs leading-5 font-semibold rounded-full ${bgTextColor()}`}
    >
      {btnText}
    </button>
  );
}

ReuseableButton.propTypes = {
  btnText: PropTypes.string,
  username: PropTypes.string,
  handleToggle: PropTypes.func,
};

export default ReuseableButton;
