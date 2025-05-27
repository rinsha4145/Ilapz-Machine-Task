import React, { useState } from "react";
import {
  FaBars,
  FaBox,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";

import { Outlet } from "react-router-dom";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import handleAsync from "../../utils/handleAsync";
import { toast } from "react-toastify";
import { setAdmin } from "../../redux/features/authSlice";
const AdmNavbar = () => {
  const [isOpen] = useState(false); // Sidebar toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu toggle

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdminLogout = handleAsync(async (e) => {
    e.preventDefault();
    const response = await api.post("/admin/logout");
    dispatch(setAdmin());

    if (response.status >= 200 && response.status < 300) {
      toast.success("Admin Logout successful", response.data);
      navigate("/");
      setIsMenuOpen(false);
    } else {
      throw new Error(response.data.message || "An error occurred");
    }
  });

  return (
    <>
      {/* Sidebar */}
      <div
        className={`flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800 overflow-y-auto overflow-x-hidden flex-grow ${
          isOpen ? "block" : "hidden"
        } lg:block`}
      >
        <div
          className={`fixed flex flex-col top-0 left-0 md:w-0 lg:w-64 bg-white h-full border-r gap-3 transition-width duration-300 overflow-y-auto overflow-x-hidden flex-grow ${
            isOpen ? "block" : "hidden"
          } lg:block`}
        >
          {/* Logo Section */}
          <div className="flex items-center gap-2 h-14 pt-10 px-4">
            <div className="text-lg font-semibold my-auto text-red-700">
              furnify
            </div>
          </div>

          {/* Menu Section */}
          <div
            className={`overflow-y-auto overflow-x-hidden pt-2 flex-grow ${
              isOpen ? "block" : "hidden"
            } lg:block`}
          >
            <ul className="flex flex-col py-4 space-y-1">
              {/* Products */}
              <li>
                <Link
                  to="/admin/product"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <FaBox className="h-6 w-6" />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Products
                  </span>
                </Link>
              </li>

              {/* Logout */}
              <li>
                <Link
                  onClick={handleAdminLogout}
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <FaSignOutAlt className="h-6 w-6" />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Logout
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div>
        <div className="lg:hidden flex items-center justify-end p-4">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-800"
          >
            <FaBars className="h-6 w-6" />
          </button>
        </div>

        {isMenuOpen && (
          <OutsideClickHandler onOutsideClick={() => setIsMenuOpen(false)}>
            <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50 lg:hidden">
              <Link
                to="/admin/product"
                className="block font-bold px-4 py-2 rounded-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                className="block font-bold px-4 py-2 rounded-full"
                // onClick={handleAdminLogout}
              >
                Logout
              </Link>
            </div>
          </OutsideClickHandler>
        )}
      </div>
       <div className="ml-64 p-4"> {/* Add margin so content isn't hidden behind sidebar */}
        <Outlet />
      </div>
    </>
  );
};

export default AdmNavbar;
