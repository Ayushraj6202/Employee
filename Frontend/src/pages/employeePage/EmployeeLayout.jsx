import React, { useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EmployeeLayout = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const authentic = useSelector((state) => state.admin.isAuthenticated)

  return (
    <>
      {!authentic && <h1>Login First</h1>}
      {authentic && <>
        <div className="h-screen flex flex-col">
            <div className="flex-1 h-full overflow-y-auto">
              <Outlet />
            </div>
        </div>
      </>}
    </>
  );

};

export default EmployeeLayout;
