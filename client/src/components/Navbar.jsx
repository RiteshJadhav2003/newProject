import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUserCircle, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
export default function Navbar() {
  const Navigate=useNavigate();
  return (
    <div className="bg-gray-800 text-white flex items-center justify-between px-8 py-4">
      {/* Breadcrumb Section */}
      <div className="flex items-center">
        <span className="text-sm flex items-center hover:bg-blue-500 text-gray-200 h-10 ">User / UserProfile</span>
      </div>

      {/* User Profile and Notifications */}
      <div className="flex items-center">
        <FontAwesomeIcon icon={faBell} className="text-lg mr-4 cursor-pointer" />
        <FontAwesomeIcon
          icon={faUserCircle}
          className="text-2xl mr-2 cursor-pointer"
        />
        <div className="ml-2 relative group">
          <button className="text-sm focus:outline-none">
          Anushka Gupta <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
          </button>
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg hidden group-hover:block">
            <a
              href="/profile"
              className="block px-4 py-2 hover:bg-gray-100 text-sm"
            >
              Profile
            </a>
            <a
              href="/forgot-password"
              className="block px-4 py-2 hover:bg-gray-100 text-sm"
            >
              Forgot Password
            </a>
            <a
              href="/logout"
              className="block px-4 py-2 hover:bg-gray-100 text-sm"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
