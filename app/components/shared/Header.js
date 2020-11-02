import React, { useContext } from 'react';
import HeaderLoggedIn from './HeaderLoggedIn';
import HeaderLoggedOut from './HeaderLoggedOut';
import StateContext from '../../contextsProviders/StateContext';
import Welcome from './Welcome';

function Header() {
  const appState = useContext(StateContext);
  return (
    <div>
      <Welcome />
      {appState && appState.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
    </div>
  );
}

export default Header;
