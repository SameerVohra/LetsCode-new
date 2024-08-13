import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import link from "../assets/link.json";

function Profile() {
  const [data, setData] = useState({});
  const [err, setErr] = useState("");
  const params = useParams();
  const username = params.username;

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const fetchUserData = async () => {
      try {
        if (!token) return setErr("Login to see your data");
        const response = await axios.get(`${link.url}/${username}/userInfo`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (error) {
        setErr(error.message);
      }
    };
    fetchUserData();
  }, [username]);

  return (
    <div className="p-5">
      {err && <div className="text-red-500 text-2xl mb-4">{err}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-sky-400 p-5 rounded-xl flex flex-col items-center">
          <div className="flex flex-col mb-4">
            <h1 className="text-xl font-bold">Username: {data.username}</h1>
            <h1 className="text-xl font-bold">Email: {data.email}</h1>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-semibold">
              Total Questions Solved: {data.quesSolved ? data.quesSolved.length : 0}
            </h1>
            <h2 className="text-md">Easy: {data.quesSolvedNum?.easy || 0}</h2>
            <h2 className="text-md">Medium: {data.quesSolvedNum?.medium || 0}</h2>
            <h2 className="text-md">Hard: {data.quesSolvedNum?.hard || 0}</h2>
          </div>
        </div>
        <div className="bg-blue-600 p-5 rounded-xl flex flex-col">
          <h2 className="text-center text-xl font-bold text-white mb-4">Questions Solved</h2>
          {data.quesSolved &&
            data.quesSolved.map((ques, ind) => (
              <div
                className="px-4 py-3 mb-2 bg-blue-500 text-center text-white rounded-lg"
                key={ind}
              >
                {ques.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
