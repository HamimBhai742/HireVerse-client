import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate=useNavigate()
  const logout = () => {
    logOut(toast.success("Log out successful"));
    navigate("/login")
  }
  return (
    <div>
      <div className="navbar bg-base-100 font-montserrat">
        <div className="flex-1 gap-1">
          <img className="w-10" src="/logo.jpg" alt="" />
          <a className="text-3xl font-semibold">
            <span className="text-red-500">Hi</span>re
            <span className="text-green-500">Ver</span>se
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="flex gap-2">
            <NavLink
              to="/"
              className="hover:text-green-500 hover:underline hover:decoration-green-500 hover:font-medium"
            >
              Home
            </NavLink>
            <NavLink
              to="/all-jobs"
              className="hover:text-green-500 hover:underline hover:decoration-green-500 hover:font-medium"
            >
              Jobs
            </NavLink>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    user ? user.photoURL : "https://placeimg.com/192/192/people"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                {user ? (
                  <button onClick={logout}>Logout</button>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
              <li>
                <NavLink to="/add-job">Add Job</NavLink>
              </li>
              <li>
                <NavLink to="/my-posted-jobs">My Posted Job</NavLink>
              </li>
              <li>
                <NavLink to="/my-bids">My Bids</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
