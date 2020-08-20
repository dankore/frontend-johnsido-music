import React from 'react';
import PropTypes from 'prop-types';

function FlashMsgError({ errors }) {
  return (
    <div className="absolute w-full">
      <div className=" flex max-w-sm w-full mx-auto bg-white overflow-hidden">
        <div className="flex justify-center items-center w-12 bg-red-500">
          <svg
            className="h-6 w-6 fill-current text-white"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
          </svg>
        </div>
        <div className="-mx-3 py-2 px-4">
          <div className="mx-3">
            <span className="text-red-500 font-semibold">Error</span>
            {errors.map((error, index) => {
              return (
                <p className="text-gray-600 text-sm" key={index}>
                  {error}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

FlashMsgError.propTypes = {
  errors: PropTypes.array,
};

export default FlashMsgError;
