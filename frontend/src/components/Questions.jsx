import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";
import { useNavigate } from "react-router";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import link from "../assets/link.json";

function Questions() {
  const [ques, setQues] = useState([]);
  const [err, setErr] = useState("");
  const [date, setDate] = useState(new Date());
  const [userSolved, setUserSolved] = useState({});
  const [easy, setEasy] = useState(0);
  const [medium, setMedium] = useState(0);
  const [hard, setHard] = useState(0);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("jwtToken");
<<<<<<< HEAD

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${link.url}/${username}/userInfo`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserSolved(response.data.quesSolvedNum);
      } catch (error) {
        setErr("Failed to fetch user data");
      }
    };
    fetchUserData();
  }, [username, token]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${link.url}/display-ques`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQues(response.data);
        const difficultyCount = { easy: 0, medium: 0, hard: 0 };
        response.data.forEach((q) => {
          if (q.difficulty === "easy") difficultyCount.easy++;
          else if (q.difficulty === "medium") difficultyCount.medium++;
          else difficultyCount.hard++;
        });
        setEasy(difficultyCount.easy);
        setMedium(difficultyCount.medium);
        setHard(difficultyCount.hard);
      } catch (error) {
        setErr("Failed to fetch questions");
      }
    };
    fetchQuestions();
  }, [token]);
=======
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);
  useEffect(() => {
    const data = async () => {
      const token = localStorage.getItem("jwtToken");
      try {
        const userData = await axios.get(`${link.url}/${username}/userInfo`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserSolved(userData.data.quesSolvedNum);
      } catch (error) {
        setErr(error);
      }
    };
    data();
  }, [username, userSolved]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          setErr("Not authorized for this action");
          return;
        } else {
          const ques = await axios.get(`${link.url}/display-ques`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setQues(ques.data);
          let e = 0;
          let m = 0;
          let h = 0;
          ques.data.forEach((q) => {
            if (q.difficulty === "easy") setEasy(++e);
            else if (q.difficulty === "medium") setMedium(++m);
            else setHard(++h);
          });
        }
      } catch (error) {
        setErr(error);
      }
    };
    fetchData();
  }, []);
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3

  const handleClick = (qId) => navigate(`/${qId}/${username}/code`);

  const isToday = (dateToCheck) => {
    const today = new Date();
    return (
      dateToCheck.getDate() === today.getDate() &&
      dateToCheck.getMonth() === today.getMonth() &&
      dateToCheck.getFullYear() === today.getFullYear()
    );
  };

  const tileClassName = ({ date }) => {
    if (isToday(date)) {
      return "today";
    }
    return null;
  };

  const onChange = (date) => {
    setDate(date);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "hard":
        return "bg-red-500";
      default:
        return "";
    }
  };
<<<<<<< HEAD

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          {ques.map((q, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 text-white rounded-lg ${getDifficultyColor(q.difficulty)}`}
            >
              <p className="flex-1 text-lg">{q.quesName}</p>
              <p className="text-lg">{q.difficulty}</p>
              <Button
                children="Solve"
                onClick={() => handleClick(q._id)}
                className="rounded-lg bg-cyan-400 hover:bg-cyan-300"
              />
            </div>
          ))}
          {err && <div className="text-red-500 text-lg">{err}</div>}
        </div>
        <div className="flex flex-col gap-4">
=======
  return (
    <div>
      <div
        className="grid grid-cols-2 items-start px-2 py-3"
        style={{ gridTemplateColumns: "1fr 0.3fr" }}
      >
        <div className="flex flex-wrap flex-col gap-2 mr-2">
          {ques.map((ques, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 gap-4 text-black ${getDifficultyColor(ques.difficulty)} px-6 py-3 text-xl items-center justify-center rounded-2xl`}
              style={{ gridTemplateColumns: "1fr 1fr 0.25fr" }}
            >
              <p>{ques.quesName}</p>
              <p>{ques.difficulty}</p>
              <Button
                children="Solve"
                onClick={() => handleClick(ques._id)}
                className=" rounded-2xl w-fit px-5 py-3 bg-cyan-400 hover:bg-cyan-300 hover:shadow-black hover:shadow-2xl"
              />
            </div>
          ))}
          {err && <div className="text-red-500">{err}</div>}
        </div>
        <div>
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
          <Calendar
            onChange={onChange}
            value={date}
            navigationType="none"
            tileClassName={tileClassName}
          />
<<<<<<< HEAD
          <div className="bg-cyan-600 text-white p-4 rounded-lg flex flex-col gap-2">
            <h1 className="text-xl font-bold text-center">Username: {username}</h1>
            <div className="flex flex-col gap-2">
              <h1 className="text-green-300">
                Easy: {userSolved.easy || 0} <span className="text-gray-700">/{easy}</span>
              </h1>
              <h1 className="text-yellow-500">
                Medium: {userSolved.medium || 0} <span className="text-gray-700">/{medium}</span>
              </h1>
              <h1 className="text-red-800">
                Hard: {userSolved.hard || 0} <span className="text-gray-700">/{hard}</span>
=======
          <div className="bg-cyan-600 text-2xl flex flex-wrap justify-center items-center flex-col w-full mt-4 py-8 px-3 rounded-2xl">
            <h1 className="text-xl text-center">Username: {username}</h1>
            <div className="flex flex-wrap flex-col justify-center items-start">
              <h1 className="text-green-300">
                Easy: {userSolved.easy}
                <span className="text-gray-700 text-lg">/{easy}</span>
              </h1>
              <h1 className="text-yellow-500">
                Medium: {userSolved.medium}
                <span className="text-gray-700 text-lg">/{medium}</span>
              </h1>
              <h1 className="text-red-800">
                Hard: {userSolved.hard}
                <span className="text-gray-700 text-lg">/{hard}</span>
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;
