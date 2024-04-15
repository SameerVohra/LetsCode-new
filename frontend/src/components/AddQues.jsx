import axios from "axios";
import Input from "./Input";
import { useState } from "react";
import { useParams } from "react-router";

function AddQues() {
  const [quesName, setQuesName] = useState("");
  const [quesDesc, setQuesDesc] = useState("");
  const [quesDiff, setQuesDiff] = useState("");
  const [con, setCon] = useState("");
  const [constraints, setConstraints] = useState([]);
  const params = useParams();
  const handleName = (e) => setQuesName(e.currentTarget.value);
  const handleDesc = (e) => setQuesDesc(e.currentTarget.value);
  const handleDiff = (e) => setQuesDiff(e.target.value);

  const handleAdd = (e) => {
    setConstraints((prev) => [...prev, con]);

    setCon("");
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("jwtToken");
    const username = params.username;
    const add = await axios.post(
      `http://localhost:3000/${username}/addQues`,
      {
        quesName: quesName,
        difficulty: quesDiff,
        description: quesDesc,
        constraints: constraints,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    setQuesName("");
    setQuesDiff("");
    setQuesDesc("");
    setConstraints([]);
    alert("Question Added Successfully");
  };

  return (
    <>
      <Input label="Ques Name" onChange={handleName} />
      <Input label="Ques Description" onChange={handleDesc} />
      <select onChange={handleDiff}>
        <option value="">---DIFFICULTY---</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <Input
        label="Constraints"
        value={con}
        onChange={(e) => setCon(e.currentTarget.value)}
      />

      <button onClick={handleAdd}>Add Constraint</button>
      <br />

      <button onClick={handleSubmit}>Add Question</button>
    </>
  );
}

export default AddQues;
