import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import {
  faChevronRight,
  faChevronLeft,
  faHome,
  faUserPlus,
  faClipboardList,
  faIdCard,
  faFileAlt,
  faCertificate,
  faCog,
  faHandsHelping,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const Navigate = useNavigate();
  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } bg-gray-800 text-white min-h-screen transition-all duration-300 flex flex-col`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-2">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white focus:outline-none"
        >
          <FontAwesomeIcon
            icon={isSidebarOpen ? faChevronLeft : faChevronRight}
            className="text-lg"
          />
        </button>
      </div>

      {/* Menu Items */}
      <ul className="mt-4">
        <li
          className="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
          title="Dashboard"
        >
          <FontAwesomeIcon icon={faHome} className="mr-3" onClick={()=>{Navigate("/")}} />
          {isSidebarOpen && <a href="/">Dashboard</a>}
        </li>
        <li
          className="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
          title="Apply For Membership"
        >
          <FontAwesomeIcon icon={faUserPlus} className="mr-3"  />
          {isSidebarOpen && <a href="/membership">Apply For Membership</a>}
        </li>
        <li
          className="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
          title="Membership Status"
        >
          <FontAwesomeIcon icon={faClipboardList} className="mr-3" />
          {isSidebarOpen && <a href="/membership-status">Membership Status</a>}
        </li>
        <li
          className="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
          title="Generate ID Card"
        >
          <FontAwesomeIcon icon={faIdCard} className="mr-3" />
          {isSidebarOpen && <a href="/generate-id">Generate ID Card</a>}
        </li>
        <li
          className="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
          title="Appointment Letter"
        >
          <FontAwesomeIcon icon={faFileAlt} className="mr-3" />
          {isSidebarOpen && <a href="/appointment-letter">Appointment Letter</a>}
        </li>
        <li
          className="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
          title="Our Certificate"
        >
          <FontAwesomeIcon icon={faCertificate} className="mr-3" />
          {isSidebarOpen && <a href="/certificate">Our Certificate</a>}
        </li>
        <li
          className="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
          title="Account"
        >
          <FontAwesomeIcon icon={faCog} className="mr-3" />
          {isSidebarOpen && <a href="/account">Account</a>}
        </li>
        <li
          className="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
          title="Donate Now"
        >
          <FontAwesomeIcon icon={faHandsHelping} className="mr-3" onClick={()=>{Navigate("/donation")}} />
          {isSidebarOpen && <a href="/donation">Donate Now</a>}
        </li>
        <li
          className="flex items-center p-4 hover:bg-gray-700 cursor-pointer"
          title="Receipt"
        >
          <FontAwesomeIcon icon={faReceipt} className="mr-3" />
          {isSidebarOpen && <a href="/receipt">Receipt</a>}
        </li>
      </ul>
    </div>
  );
}
