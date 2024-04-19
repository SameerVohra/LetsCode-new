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
        const user = await axios.get(`http://localhost:3000/display-users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

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
      <Input
        label="Search users"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {searchedUser.length === 0
        ? user.map((u, ind) => (
            <div key={ind} className="border-2 border-black p-4">
              <h3>{u.username}</h3>
              <h3>{u.email}</h3>
              <h3>
                {u.isAdmin
                  ? `${u.username} is an admin`
                  : `${u.username} is not an admin`}
              </h3>
              <LinkBtn text="Info" to={`/admin/${u.username}/userInfo`} />
            </div>
          ))
        : searchedUser.map((searched, ind) => (
            <div key={ind} className="border-2 border-black p-4">
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
              />
            </div>
          ))}
    </>
  );
}

export default DisplayUsers;
