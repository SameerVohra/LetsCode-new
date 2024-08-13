import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import LinkBtn from "./Header/LinkBtn";
import link from "../assets/link.json";

function Admin() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const userAdmin = async () => {
      const response = await axios.get(`${link.url}/${username}/userInfo`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(response.data);
    };
    userAdmin();
  }, [username]);

  return (
    <>
      <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
        <div className="flex flex-wrap justify-center items-center gap-5 mt-5 mb-10 text-lime-300">
          <LinkBtn
            to={`displayQueries`}
            text="Display Query"
            className="rounded-xl px-5 py-3 bg-cyan-600 hover:bg-sky-900 hover:text-cyan-500 transition-all hover:shadow-2xl hover:shadow-black text-center w-full sm:w-auto"
          />
          <LinkBtn
            to={`displayQuestions`}
            text="Display Question"
            className="rounded-xl px-5 py-3 bg-cyan-600 hover:bg-sky-900 hover:text-cyan-500 transition-all hover:shadow-2xl hover:shadow-black text-center w-full sm:w-auto"
          />
          <LinkBtn
            to={`addQues`}
            text="Add Questions"
            className="rounded-xl px-5 py-3 bg-cyan-600 hover:bg-sky-900 hover:text-cyan-500 transition-all hover:shadow-2xl hover:shadow-black text-center w-full sm:w-auto"
          />
          <LinkBtn
            to={`displayUsers`}
            text="Display Users"
            className="rounded-xl px-5 py-3 bg-cyan-600 hover:bg-sky-900 hover:text-cyan-500 transition-all hover:shadow-2xl hover:shadow-black text-center w-full sm:w-auto"
          />
        </div>
        <div className="flex justify-center items-center w-full mt-10">
          <div className="w-full max-w-xl p-8 flex flex-col justify-center items-center rounded-2xl bg-blue-400 gap-6 text-xl">
            <h1 className="text-center">
              Username:{" "}
              <span className="text-sky-900">{userData.username}</span>
            </h1>
            <h1 className="text-center">
              Email: <span className="text-sky-900">{userData.email}</span>
            </h1>
            <h1 className="text-center">
              Total Questions Solved:{" "}
              <span className="text-sky-900">
                {userData.quesSolved ? userData.quesSolved.length - 1 : 0}
              </span>
            </h1>
            <button
              className="transition-all px-6 py-3 rounded-2xl bg-blue-900 text-lime-300 hover:text-cyan-500 hover:bg-sky-900 hover:shadow-black hover:shadow-2xl"
              onClick={() => navigate(`/profile/${username}`)}
            >
              Continue to Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
