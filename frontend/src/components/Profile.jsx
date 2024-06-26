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
    <>
      {err && <div className="text-red-500 text-2xl">{err}</div>}
      <div
        className="grid grid-cols-2 gap-5 px-5 py-5"
        style={{ gridTemplateColumns: "0.5fr 1.5fr" }}
      >
        {data && (
          <div className="flex flex-wrap justify-center items-center flex-col bg-sky-400 rounded-xl">
            <div className="flex flex-col">
              <h1>Username: {data.username}</h1>
              <h1>Email: {data.email}</h1>
            </div>
            <div className="flex flex-wrap justify-center items-center flex-col">
              <h1>
                Total Questions Solved:{" "}
                {data.quesSolved ? data.quesSolved.length - 1 : 0}
              </h1>
              <h2>Easy: {data.quesSolvedNum?.easy || 0}</h2>
              <h2>Medium: {data.quesSolvedNum?.medium || 0}</h2>
              <h3>Hard: {data.quesSolvedNum?.hard || 0}</h3>
            </div>
          </div>
        )}
        <div className="bg-blue-600 rounded-xl">
          <h2 className="text-center">Questions Solved</h2>
          {data.quesSolved &&
            data.quesSolved.map((ques, ind) => (
              <div
                className="px-4 py-3 w-full h-auto text-center text-3xl"
                key={ind}
              >
                {ques.name}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Profile;
