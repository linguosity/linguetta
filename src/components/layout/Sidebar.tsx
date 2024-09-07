'use client'

import React, { useState } from 'react';

const Sidebar: React.FC = () => {
  // State to track whether the sidebar is collapsed or expanded
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Function to toggle the collapse state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-20 flex flex-col h-full pt-16 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-center p-4 border-b dark:border-gray-700">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {/* You can replace this with a toggle icon */}
          <span>{isCollapsed ? 'Expand' : 'Collapse'}</span>
        </button>
      </div>
      
      <div className="flex flex-col flex-1 overflow-y-auto">
        <ul className="space-y-2">
          <li>
            <a
              href="/dashboard"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {/* Icon */}
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                {/* SVG path */}
                <path
                  fillRule="evenodd"
                  d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                  clipRule="evenodd"
                />
              </svg>
              {/* Title */}
              {!isCollapsed && <span className="ml-3">Dashboard</span>}
            </a>
          </li>
          {/* Add more menu items here */}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
