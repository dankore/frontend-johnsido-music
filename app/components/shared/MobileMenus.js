import React from 'react';
import { Link } from 'react-router-dom';

function MobileMenus() {
  return (
    <div className="block sm:hidden absolute bg-gray-700 min-h-screen w-full z-10">
      <div className="px-2 pt-2 pb-3">
        <Link
          to="/my-songs"
          className="mt-1 block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-blue-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
        >
          My Songs
        </Link>
        <Link
          to="/explore"
          className="mt-1 block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-blue-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
        >
          Explore Other Artistes Songs
        </Link>
      </div>
    </div>
  );
}

export default MobileMenus;
