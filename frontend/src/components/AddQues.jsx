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
      `/api/${username}/addQues`,
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
      <div className="flex flex-wrap justify-center items-center">
        <div className="flex flex-wrap justify-center items-center flex-col w-3/6 gap-5 px-6 py-2">
          {err && <div className="text-red-500">{err}</div>}
          <Input
            label="Ques Name"
            onChange={handleName}
            className="w-10/12 p-5 text-xl rounded-xl"
            placeholder="Enter Question Name"
          />
          <h1>Question Description</h1>
          <textarea
            onChange={handleDesc}
            rows={10}
            cols={50}
            className="p-5 text-xl rounded-xl"
            placeholder="Enter Question Description"
          />
          <select
            onChange={handleDiff}
            className="px-6 py-2 bg-white text-black text-xl text-center rounded-2xl"
          >
            <option value="">---DIFFICULTY---</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <Input
            label="Constraints"
            value={con}
            placeholder="Enter Constraints"
            className="p-5 rounded-xl"
            onChange={(e) => setCon(e.currentTarget.value)}
          />
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-blue-800 text-lime-300 rounded-xl hover:bg-cyan-700 hover:text-black hover:shadow-black hover:shadow-2xl transition-all"
          >
            Add Constraint
          </button>
          {constraints &&
            constraints.map((c, ind) => (
              <div key={ind} className="font-mono text-lg">
                {c}
              </div>
            ))}
          <h2 className="text-2xl">TestCases</h2>
          <Input
            label="Input"
            value={testInput}
            onChange={(e) => {
              setTestInput(e.currentTarget.value);
              console.log(testInput);
            }}
            className="p-5 text-lg rounded-2xl w-full"
            placeholder="Input Value"
          />
          <Input
            label="Output"
            value={testOutput}
            onChange={(e) => setTestOutput(e.currentTarget.value)}
            className="p-5 text-lg rounded-2xl w-full"
            placeholder="Output Value"
          />
          <button
            onClick={handleAddTestCase}
            className="px-6 py-2 bg-blue-800 text-lime-300 rounded-xl hover:bg-cyan-700 hover:text-black hover:shadow-black hover:shadow-2xl transition-all"
          >
            Add TestCase
          </button>
          {testcases && (
            <ul>
              {testcases.map((val, ind) => (
                <li key={ind}>
                  {val.input} -- {val.output}
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-800 text-lime-300 rounded-xl text-2xl hover:bg-cyan-700 hover:text-white hover:shadow-black hover:shadow-2xl transition-all"
          >
            Add Question
          </button>
        </div>
      </div>
    </>
  );
}

export default AddQues;
