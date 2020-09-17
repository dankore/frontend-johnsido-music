import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import StateContext from '../../contextsProviders/StateContext';

function ReuseableButton({ handleToggle, username, btnText }) {
  const appState = useContext(StateContext);

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
      disabled={appState.user.username === username && btnText == 'User'} // PREVENT LOGGED IN ADMIN FROM OPENING MODAL
      onClick={handleToggle}
      data-username={username}
      className={`underline px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgTextColor()}`}
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
