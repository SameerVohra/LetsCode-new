import React, { useEffect, useState } from "react";
import LinkBtn from "./LinkBtn";

function Header({ username, isAdmin }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token !== null) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [username, isAdmin]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
  };

  console.log(isAdmin);

  return (
    <>
      <div className=" bg-black border-2 border-black w-full h-auto text-white flex flex-wrap justify-between items-center px-4 py-8">
        <h1 className="text-2xl font-bold">LetsCode</h1>
        <div className="flex flex-wrap justify-between items-center gap-16">
          <LinkBtn to="/" text="Home" />
          <LinkBtn
            to={`/${username}/contribute`}
            text="Contribute A Question"
          />
          <LinkBtn to={`/${username}/query`} text="Query" />
          <LinkBtn to="/Questions" text="Questions" />
          {!isLoggedIn ? (
            <LinkBtn text="Login/SignUp" to="/login" />
          ) : (
            <LinkBtn text="Logout" to="/login" onClick={handleLogout} />
          )}
          {isLoggedIn && username && <div>Welcome, {username}</div>}
          {isLoggedIn && isAdmin === "true" && (
            <LinkBtn text="admin panel" to={`${username}/admin`} />
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
