import React, { useContext } from 'react';
import StateContext from '../../contextsProviders/StateContext';
import DispatchContext from '../../contextsProviders/DispatchContext';

function FlashMsgSuccess() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  return (
    <div className="absolute z-50 w-full">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white border-b border-r border-green-500">
        <div className="flex items-center justify-center w-12 bg-green-500">
          <svg
            className="w-6 h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
          </svg>
        </div>

        <div className="w-full px-4 py-2 -mx-3">
          <div className="mx-3">
            <div className="flex justify-between">
              <span className="font-semibold text-green-500">Success</span>
              <button
                onClick={() => appDispatch({ type: 'turnOff' })}
                className="font-semibold text-green-500"
              >
                X
              </button>
            </div>
            {appState.flashMsgSuccess.value.map((success, index) => {
              return (
                <p className="mx-3" key={index}>
                  {success}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlashMsgSuccess;
