import React, { useEffect, useContext } from 'react';
import DispatchContext from '../../contextsProviders/DispatchContext';

function Welcome() {
  const appDispatch = useContext(DispatchContext);

  useEffect(() => {
    if (localStorage.getItem('showWelcome')) {
      appDispatch({ type: 'showWelcome', hide: true });
      return;
    }
    localStorage.setItem('showWelcome', true);
    appDispatch({ type: 'showWelcome', hide: false });
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => appDispatch({ type: 'showWelcome', hide: true }), 7000);
    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="flex justify-center w-full bg-green-600 pr-3 text-lg text-white">
      <div className="w-full text-center">Thank you for visiting Johnsido Music</div>
      <button
        onClick={() => appDispatch({ type: 'showWelcome', hide: true })}
        className="focus:outline-none hover:text-gray-400"
      >
        X
      </button>
    </div>
  );
}

export default Welcome;
