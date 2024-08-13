import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router";

function Home() {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
<<<<<<< HEAD

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  return (
    <div className="flex flex-col justify-center items-center p-5 mt-10 min-h-screen bg-gray-100">
      <div className="flex flex-col-reverse md:flex-row items-center w-full max-w-4xl mx-auto">
        <div className="flex-1 text-center md:text-left p-5">
          <img src={logo} alt="LetsCode Logo" className="w-full max-w-xs md:max-w-md" />
        </div>
        <div className="flex-1 text-3xl text-gray-600 flex flex-col justify-center items-center md:items-start">
          <h1 className="mb-4">Welcome to LetsCode,</h1>
=======
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);
  return (
    <div className="flex flex-wrap justify-center items-center p-5 mt-10">
      <div className="grid grid-cols-2">
        <div>
          <img src={logo} height={700} />
        </div>
        <div className="text-3xl flex flex-wrap justify-center items-center text-gray-600 w-full max-h-screen flex-col">
          <h1>Welcome to LetsCode, </h1>
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
          <Typewriter
            options={{
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString(username ? `${username}` : "LOGIN TO CONTINUE")
                .pauseFor(900)
                .deleteAll()
                .typeString(" Start Your Coding Journey today")
                .start();
            }}
          />
          <button
<<<<<<< HEAD
            onClick={() => navigate("/Questions")}
            className="text-2xl border-2 mt-10 px-5 py-3 bg-blue-500 rounded-2xl text-white transition-all hover:bg-blue-800 hover:shadow-2xl hover:shadow-black"
=======
            onClick={(e) => {
              e.preventDefault();
              navigate("/Questions");
            }}
            className="text-2xl border-2 mt-10 px-5 py-3 bg-blue-500 rounded-2xl text-white transition-all hover:bg-blue-800 hover: shadow-2xl hover:shadow-black"
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
          >
            START CODING
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
