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
          <Calendar
            onChange={onChange}
            value={date}
            navigationType="none"
            tileClassName={tileClassName}
          />
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
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;
