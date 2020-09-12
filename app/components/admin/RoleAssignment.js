import React from 'react';
import RoleUserTemplate from './RoleUserTemplate';

function RoleAssignment() {
  const array = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="">
      <div className="bg-blue-800 px-2 pt-6 pb-4 shadow text-xl text-white">
        <h3 className="font-bold pl-2">Role Assignment</h3>
      </div>
      <div>
        <div className="flex flex-1 mx-auto md:w-1/3 justify-center text-white">
          <span className="relative w-full">
            <input
              type="search"
              placeholder="Search"
              className="w-full bg-gray-900 text-sm text-white transition border border-transparent focus:outline-none focus:border-gray-700 py-1 px-2 pl-10 appearance-none leading-normal"
            />
            <div className="absolute" style={{ top: 0.5 + 'rem', left: 0.8 + 'rem' }}>
              <svg
                className="fill-current pointer-events-none text-white w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
              </svg>
            </div>
          </span>
        </div>
      </div>
      {array.map((user, index) => {
        return (
          <div key={index} className="mb-2">
            <RoleUserTemplate />
          </div>
        );
      })}
    </div>
  );
}

export default RoleAssignment;
