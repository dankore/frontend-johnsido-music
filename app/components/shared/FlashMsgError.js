import React from 'react';
import PropTypes from 'prop-types';

function FlashMsgError({ errors }) {
  return (
    <div className="absolute w-full">
      <div className="bg-red-100 py-3 border-b border-red-900 text-center text-sm">
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
