import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router";

function Questions() {
  const [ques, setQues] = useState([]);
  const [desc, setDesc] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          setErr("Not authorized for this action");
          return;
        } else {
          const ques = await axios.get("http://localhost:3000/display-ques", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(ques.data);
          setQues(ques.data);
        }
      } catch (error) {
        setErr(error);
      }
    };
    fetchData();
  }, []);
  const handleClick = () => alert("Coming Soon");

  return (
    <>
      <div className="flex flex-wrap px-4 py-5 flex-col gap-2">
        {ques.map((ques, index) => (
          <div
            key={index}
            className="text-black border-2 p-5 bg-red-300 flex flex-wrap justify-between"
          >
            <div>{ques.quesName}</div>
            <div>{ques.difficulty}</div>
            <Button children="Solve" onClick={handleClick} />
          </div>
        ))}
        {err}
      </div>
    </>
  );
}

export default Questions;
