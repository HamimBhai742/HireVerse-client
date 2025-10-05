
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  MdMenu,
  MdClose,
  MdWork,
  MdPerson,
  MdAdd,
  MdList,
  MdGavel,
  MdNotifications,
  MdLogout,
  MdLogin,
  MdDarkMode,
  MdLightMode,
  MdVerified
} from "react-icons/md";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const logout = () => {
    logOut(toast.success("Log out successful"));
    navigate("/login");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { to: "/", label: "Home", icon: null },
    { to: "/all-jobs", label: "Jobs", icon: MdWork }
  ];

  const userMenuItems = [
    { to: "/profile", label: "Profile", icon: MdPerson, badge: "New" },
    { to: "/add-job", label: "Add Job", icon: MdAdd },
    { to: "/my-posted-jobs", label: "My Posted Jobs", icon: MdList },
    { to: "/my-bids", label: "My Bids", icon: MdGavel },
    { to: "/bid-requests", label: "Bid Requests", icon: MdNotifications }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                className="w-10 h-10 rounded-lg shadow-md object-cover"
                src="/logo.jpg"
                alt="Logo"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
            </div>
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              <span className="text-red-500">Hi</span>re
              <span className="text-green-500">Ver</span>se
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                  }`
                }
              >
                {link.icon && <link.icon className="w-4 h-4 mr-2" />}
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? <MdLightMode className="w-5 h-5" /> : <MdDarkMode className="w-5 h-5" />}
            </button>

            {/* User Avatar & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="relative">
                  <img
                    className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 object-cover shadow-md"
                    src={user ? user.photoURL : "https://cdn-icons-png.flaticon.com/512/4042/4042356.png"}
                    alt="Profile"
                  />
                  {user && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                  )}
                </div>
                {user && (
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                      {user.displayName || "User"}
                      <MdVerified className="w-4 h-4 ml-1 text-blue-500" />
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
                  </div>
                )}
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-50">

                  {/* User Info Header */}
                  {user && (
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <img
                          className="w-12 h-12 rounded-full object-cover"
                          src={user.photoURL}
                          alt="Profile"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {user.displayName || "User"}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Menu Items */}
                  <div className="py-2">
                    {user ? (
                      <>
                        {userMenuItems.map((item) => (
                          <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <item.icon className="w-5 h-5 mr-3 text-gray-400" />
                            <span className="flex-1">{item.label}</span>
                            {item.badge && (
                              <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </NavLink>
                        ))}
                        <hr className="my-2 border-gray-200 dark:border-gray-700" />
                        <button
                          onClick={() => {
                            logout();
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <MdLogout className="w-5 h-5 mr-3" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <MdLogin className="w-5 h-5 mr-3 text-gray-400" />
                        Login
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isMenuOpen ? <MdClose className="w-6 h-6" /> : <MdMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  {link.icon && <link.icon className="w-5 h-5 mr-3" />}
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
