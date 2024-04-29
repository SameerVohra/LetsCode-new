import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import link from "../assets/link.json";

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
        const user = await axios.get(`${link.url}/${username}/userInfo`, {
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
      await axios.put(`${link.url}/${username}/make-admin`);
      setUserData((prev) => ({ ...prev, isAdmin: true }));
    } catch (error) {
      setErr(error.message);
    }
  };

  const handleRemove = async () => {
    try {
      await axios.put(`${link.url}/${username}/remove-admin`);
      setUserData((prev) => ({ ...prev, isAdmin: false }));
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <>
      {userData && (
        <div className="flex flex-wrap justify-center items-center flex-col px-10 py-3">
          <div className=" bg-sky-400 px-32 py-20 rounded-xl text-center text-2xl">
            <h2>{userData.username}</h2>
            <h2>{userData.email}</h2>
            <h2>
              {userData.isAdmin
                ? `${userData.username} is an admin`
                : `${userData.username} is not an admin`}
            </h2>
            {!userData.isAdmin ? (
              <button
                onClick={handleMake}
                className="bg-blue-800 text-white px-4 py-2 rounded-2xl hover:bg-cyan-300 hover:text-black transition-all mt-4 text-xl"
              >
                Make Admin
              </button>
            ) : (
              <button
                onClick={handleRemove}
                className="bg-blue-800 text-white px-4 py-2 rounded-2xl hover:bg-cyan-300 hover:text-black transition-all mt-4 text-xl"
              >
                Remove as Admin
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default UserInfo;
