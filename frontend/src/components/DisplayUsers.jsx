import axios from "axios";
import Input from "./Input";
import React, { useEffect, useState } from "react";
import LinkBtn from "./Header/LinkBtn";

function DisplayUsers() {
  const [user, setUser] = useState([]);
  const [searchedUser, setSearchedUser] = useState([]);
  const [search, setSearch] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const users = async () => {
      const token = localStorage.getItem("jwtToken");
      try {
        const user = await axios.get(
          `https://letscode-new-backend.onrender.com/display-users`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        console.log(user.data);
        setUser(user.data);
      } catch (error) {
        console.log(error);
        setErr(error.message);
      }
    };
    users();
  }, []);

  const handleSearch = () => {
    if (search.trim !== "") {
      const searched = user.filter(
        (user) => user.username.toLowerCase() === search.toLowerCase(),
      );
      setSearchedUser(searched);
    } else {
      setSearchedUser([]);
    }
  };

  return (
    <>
      <div className="flex flex-wrap flex-row justify-center items-center mb-10">
        {" "}
        <Input
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder="Search User"
          className="w-3/6 p-5 rounded-2xl mt-5 static"
        />
        <button
          onClick={handleSearch}
          className="border-2 bg-sky-800 text-white hover:bg-blue-800 hover:text-lime-300 px-8 py-3 rounded-2xl static"
        >
          Search
        </button>
      </div>
      <div className="flex flex-row flex-wrap justify-center items-center px-10 gap-20">
        {searchedUser.length === 0
          ? user.map((u, ind) => (
              <div
                key={ind}
                className="bg-sky-300 px-10 rounded-xl flex flex-col justify-center items-center py-8 gap-2 w-10"
              >
                <h3>{u.username}</h3>
                <h3>{u.email}</h3>
                <h3>
                  {u.isAdmin
                    ? `${u.username} is an admin`
                    : `${u.username} is not an admin`}
                </h3>
                <LinkBtn
                  text="Info"
                  to={`/admin/${u.username}/userInfo`}
                  className="bg-cyan-800 text-white px-4 py-2 rounded-2xl hover:bg-blue-800 hover:text-lime-300 transition-all"
                />
              </div>
            ))
          : searchedUser.map((searched, ind) => (
              <div
                key={ind}
                className="bg-sky-300 px-10 rounded-xl flex flex-col justify-center items-center py-8 gap-2"
              >
                <h3>{searched.username}</h3>
                <h3>{searched.email}</h3>
                <h3>
                  {searched.isAdmin
                    ? `${searched.username} is an admin`
                    : `${searched.username} is not an admin`}
                </h3>
                <LinkBtn
                  text="Info"
                  to={`/admin/${searched.username}/userInfo`}
                  className="bg-cyan-800 text-white px-4 py-2 rounded-2xl hover:bg-blue-800 hover:text-lime-300 transition-all"
                />
              </div>
            ))}
      </div>
    </>
  );
}

export default DisplayUsers;
