import React from 'react';
import PropTypes from 'prop-types';

function FlashMsgError({ errors }) {
  return (
    <div className="absolute w-full">
      <div className="max-w-md mt-5 mx-auto bg-red-100 border border-red-900 text-center text-sm">
        {errors.map((error, index) => {
          return (
            <p className="text-red-700" key={index}>
              {error}
            </p>
          );
        })}
      </div>
    </div>
  );
}

FlashMsgError.propTypes = {
  errors: PropTypes.array,
};

export default FlashMsgError;
