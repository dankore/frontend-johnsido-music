import React from 'react';
import PropTypes from 'prop-types';

function ReuseableButton({ handleToggle, username, btnText }) {
  let bgTextColor;
  if (btnText == 'Active' || btnText == 'Inactive') {
    bgTextColor = btnText == 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  }
  if (btnText == 'Admin' || btnText == 'User') {
    bgTextColor = btnText == 'Admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
  }

  return (
    <div className="bg-white">
      <button
        onClick={handleToggle}
        data-username={username}
        className={`underline px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgTextColor}`}
      >
        {btnText}
      </button>
    </div>
  );
}

ReuseableButton.propTypes = {
  btnText: PropTypes.string,
  username: PropTypes.string,
  handleToggle: PropTypes.func,
};

export default ReuseableButton;
