import React, { useContext } from 'react';
import HeaderLoggedIn from './HeaderLoggedIn';
import HeaderLoggedOut from './HeaderLoggedOut';
import StateContext from '../../contextsProviders/StateContext';

function Header() {
  const appState = useContext(StateContext);
  return <>{appState.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}</>;
}

export default Header;
