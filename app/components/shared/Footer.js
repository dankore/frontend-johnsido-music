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
    <div className="relative mt-10 mb-5 text-center">
      {welcome && state && <Welcome />}
      {/* MODAL OVERLAYS */}
      {appState && appState.editComment && (
        <div
          onClick={() => appDispatch({ type: 'editComment' })}
          className="absolute bg-gray-300 bg-opacity-50 cursor-pointer modal-overlay"
        ></div>
      )}
      {appState && appState.commentHistory && (
        <div
          onClick={() => appDispatch({ type: 'commentHistory' })}
          className="absolute bg-gray-300 bg-opacity-50 cursor-pointer modal-overlay"
        ></div>
      )}
      <div>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/terms">Terms</Link> |{' '}
        <Link to="/privacy">Privacy</Link> | <Link to="/cookies">Cookies</Link>
      </div>
      <p>&copy; {new Date().getFullYear()} Johnsido</p>
      <p className="text-xs">
        Developed by{' '}
        <a className="hover:text-jsBrown1" href="https://www.dankore.com/">
          Adamu M. Dankore.
        </a>
      </p>
    </div>
  );
}

export default Footer;
