import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import link from "../assets/link.json";

function UserInfo() {
<<<<<<< HEAD
  const [userData, setUserData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const username = params.username;

=======
  const [userData, setUserData] = useState([]);
  const [err, setErr] = useState("");
  const params = useParams();
  const username = params.username;
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
  useEffect(() => {
    const findUser = async () => {
      const token = localStorage.getItem("jwtToken");
      try {
<<<<<<< HEAD
        if (!token) {
          setErr("Login to perform this action");
          return;
        }
=======
        if (!token) return setErr("Login to perform this action");
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
        const user = await axios.get(`${link.url}/${username}/userInfo`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(user.data);
      } catch (error) {
<<<<<<< HEAD
        setErr("Failed to fetch user data: " + error.message);
      } finally {
        setLoading(false);
=======
        setErr(error.message);
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
      }
    };
    findUser();
  }, [username]);

  const handleMake = async () => {
    try {
      await axios.put(`${link.url}/${username}/make-admin`);
      setUserData((prev) => ({ ...prev, isAdmin: true }));
    } catch (error) {
<<<<<<< HEAD
      setErr("Failed to update user role: " + error.message);
=======
      setErr(error.message);
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
    }
  };

  const handleRemove = async () => {
    try {
      await axios.put(`${link.url}/${username}/remove-admin`);
      setUserData((prev) => ({ ...prev, isAdmin: false }));
    } catch (error) {
<<<<<<< HEAD
      setErr("Failed to update user role: " + error.message);
    }
  };

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-12">
      {err && <div className="text-red-700 font-bold mb-4 text-center">{err}</div>}
      {userData ? (
        <div className="bg-sky-400 w-full max-w-md p-6 rounded-xl text-center text-lg sm:text-xl lg:text-2xl">
          <h2 className="font-semibold">{userData.username}</h2>
          <h2 className="text-base sm:text-lg lg:text-xl">{userData.email}</h2>
          <h2 className="text-base sm:text-lg lg:text-xl">
            {userData.isAdmin
              ? `${userData.username} is an admin`
              : `${userData.username} is not an admin`}
          </h2>
          {!userData.isAdmin ? (
            <button
              onClick={handleMake}
              className="bg-blue-800 text-white px-4 py-2 rounded-2xl hover:bg-cyan-300 hover:text-black transition-all mt-4 text-base sm:text-lg lg:text-xl"
            >
              Make Admin
            </button>
          ) : (
            <button
              onClick={handleRemove}
              className="bg-blue-800 text-white px-4 py-2 rounded-2xl hover:bg-cyan-300 hover:text-black transition-all mt-4 text-base sm:text-lg lg:text-xl"
            >
              Remove as Admin
            </button>
          )}
        </div>
      ) : (
        <div className="text-center text-lg sm:text-xl lg:text-2xl">No user data found</div>
      )}
    </div>
=======
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
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
  );
}

export default UserInfo;
