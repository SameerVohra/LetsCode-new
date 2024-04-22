import React, { useState } from "react";
import LinkBtn from "./LinkBtn";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/authSlice";
import { useNavigate } from "react-router";

function Header({ isAdmin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = localStorage.getItem("username");
  const authStatus = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
    navigate("/login");
    dispatch(logout());
  };

  return (
    <>
      <div className=" bg-blue-900 w-full h-auto text-lime-300 flex flex-wrap justify-between items-center px-4 py-5">
        <h1 className="text-5xl font-mono ">LetsCode</h1>
        <div className="flex flex-wrap justify-between items-center gap-16">
          <LinkBtn to="/" text="Home" className="hover:text-white" />
          <LinkBtn
            className="hover:text-white transition-all"
            to={`/${username}/contribute`}
            text="Contribute A Question"
          />
          <LinkBtn
            to={`/${username}/query`}
            text="Query"
            className="hover:text-white transition-all"
          />
          <LinkBtn
            to="/Questions"
            text="Questions"
            className="hover:text-white transition-all"
          />
          {!authStatus.auth ? (
            <LinkBtn
              text="Login"
              to="/login"
              className="text-black transition-all border-2 border-black px-4 py-2 rounded-2xl bg-cyan-300  hover:bg-lime-300"
            />
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              {authStatus.auth && (
                <span className="cursor-pointer">Welcome, {username}</span>
              )}

              {isDropdownOpen === true && (
                <div className="absolute top-full left-0 bg-blue-900 border border-gray-300 py-4 px-4 shadow-md rounded w-fit ">
                  {isAdmin === "true" && (
                    <LinkBtn
                      text="Admin"
                      to={`${username}/admin`}
                      className="block hover:text-white"
                    />
                  )}
                  <LinkBtn
                    text="Profile"
                    to={`/profile/${username}`}
                    className="block hover:text-white"
                  />
                  <LinkBtn
                    text="Logout"
                    to="/login"
                    onClick={handleLogout}
                    className="block hover:text-white"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
