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
  const [testcases, setTestcases] = useState([]);
  const [testInput, setTestInput] = useState("");
  const [testOutput, setTestOutput] = useState("");
  const [err, setErr] = useState("");
  const params = useParams();
  const handleName = (e) => setQuesName(e.currentTarget.value);
  const handleDesc = (e) => setQuesDesc(e.currentTarget.value);
  const handleDiff = (e) => setQuesDiff(e.target.value);

  const handleAdd = () => {
    setConstraints((prev) => [...prev, con]);

    setCon("");
  };

  const handleAddTestCase = () => {
    if (testInput === "" || testOutput === "") {
      setErr("All fields are required");
    } else {
      setTestcases((prev) => [
        { input: testInput, output: testOutput },
        ...prev,
      ]);
      console.log(testcases);
      console.log("Adding TestCase");
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("jwtToken");
    const username = params.username;
    await axios.post(
      `https://lets-code-new-back.vercel.app/${username}/addQues`,
      {
        quesName: quesName,
        difficulty: quesDiff,
        description: quesDesc,
        constraints: constraints,
        testcases: testcases,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    setQuesName("");
    setQuesDiff("");
    setQuesDesc("");
    setConstraints([]);
    setTestcases([{ input: "", output: "" }]);
    alert("Question Added Successfully");
  };

  return (
    <>
      {err && <div className="text-red-500">{err}</div>}
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
      <Input
        label="Input"
        value={testInput}
        onChange={(e) => {
          setTestInput(e.currentTarget.value);
          console.log(testInput);
        }}
      />
      <Input
        label="Output"
        value={testOutput}
        onChange={(e) => setTestOutput(e.currentTarget.value)}
      />
      <button onClick={handleAddTestCase}>Add TestCase</button>
      <br /> <br />
      {testcases && (
        <ul>
          {testcases.map((val, ind) => (
            <li key={ind}>
              {val.input} -- {val.output}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleSubmit}>Add Question</button>
    </>
  );
}

export default AddQues;
