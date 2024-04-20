import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

function UserInfo() {
  const [userData, setUserData] = useState([]);
  const [err, setErr] = useState("");
  const params = useParams();
  const username = params.username;
  useEffect(() => {
    const findUser = async () => {
      const token = localStorage.getItem("jwtToken");
      try {
        if (!token) return setErr("Login to perform this action");
        const user = await axios.get(`/api/${username}/userInfo`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(user.data);
        setUserData(user.data);
      } catch (error) {
        console.log(error);
        setErr(error.message);
      }
    };
    findUser();
  }, [username]);

  const handleMake = async () => {
    try {
      console.log(username);
      await axios.put(`/api/${username}/make-admin`);
      setUserData((prev) => ({ ...prev, isAdmin: true }));
    } catch (error) {
      setErr(error.message);
    }
  };

  const handleRemove = async () => {
    try {
      await axios.put(`/api/${username}/remove-admin`);
      setUserData((prev) => ({ ...prev, isAdmin: false }));
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <>
      {userData && (
        <div>
          <h2>{userData.username}</h2>
          <h2>{userData.email}</h2>
          <h2>
            {userData.isAdmin
              ? `${userData.username} is an admin`
              : `${userData.username} is not an admin`}
          </h2>
          {!userData.isAdmin ? (
            <button onClick={handleMake}>Make Admin</button>
          ) : (
            <button onClick={handleRemove}>Remove as Admin</button>
          )}
        </div>
      )}
    </>
  );
}

export default UserInfo;
