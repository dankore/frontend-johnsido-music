import React, { useContext } from 'react';
import StateContext from '../../contextsProviders/StateContext';

function FlashMsgSuccess() {
  const appState = useContext(StateContext);

  return (
    <div className="absolute w-full">
      <div className="bg-green-100 border-b border-green-900 text-center text-sm">
        {appState.flashMsgSuccess.value.map((success, index) => {
          return (
            <p className="text-green-700" key={index}>
              {success}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default FlashMsgSuccess;
