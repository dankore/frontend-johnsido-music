import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StateContext from '../../contextsProviders/StateContext';
import DispatchContext from '../../contextsProviders/DispatchContext';
import Welcome from './Welcome';

function Footer() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [state, setState] = useState(true);
  const [welcome, setWelcome] = useState();

  useEffect(() => {
    if (localStorage.getItem('welcome')) {
      setWelcome(false);
      return;
    }
    localStorage.setItem('welcome', true);
    setWelcome(true);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setState(false);
    }, 7000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="text-center mt-10 relative">
      {welcome && state && <Welcome />}
      {/* MODAL OVERLAY */}
      {appState && appState.editComment && (
        <div
          onClick={() => appDispatch({ type: 'editComment' })}
          className="modal-overlay  absolute cursor-pointer"
        ></div>
      )}
      <div>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/terms">Terms</Link> |{' '}
        <Link to="/privacy">Privacy</Link> | <Link to="/cookies">Cookies</Link>
      </div>
      Developed by {new Date().getFullYear()}{' '}
      <a href="https://www.dankore.com/">Adamu M. Dankore.</a>
    </div>
  );
}

export default Footer;
