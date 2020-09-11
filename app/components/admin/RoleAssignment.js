import React from 'react';
import RoleUserTemplate from './RoleUserTemplate';

function RoleAssignment() {
  const array = [1, 2, 3];
  return (
    <div className="">
      <div className="bg-blue-800 px-2 pt-6 pb-4 shadow text-xl text-white">
        <h3 className="font-bold pl-2">Role Assignment</h3>
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
