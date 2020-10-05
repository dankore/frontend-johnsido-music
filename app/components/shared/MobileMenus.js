import React from 'react';
import { Link } from 'react-router-dom';

function MobileMenus() {
  return (
    <div className="absolute z-10 block w-full min-h-screen bg-gray-700 sm:hidden">
      <div className="px-2 pt-2 pb-3">
        <Link
          to="/my-songs"
          className="block px-3 py-2 mt-1 text-base font-medium text-gray-300 transition duration-150 ease-in-out hover:text-white hover:bg-blue-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          My Songs
        </Link>
        <Link
          to="/explore"
          className="block px-3 py-2 mt-1 text-base font-medium text-gray-300 transition duration-150 ease-in-out hover:text-white hover:bg-blue-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          Explore Other Artistes Songs
        </Link>
      </div>
    </div>
  );
}

export default MobileMenus;
