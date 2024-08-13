import axios from "axios";
import Input from "./Input";
import { useState } from "react";
import { useParams } from "react-router";
import link from "../assets/link.json";

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
<<<<<<< HEAD

=======
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
  const handleName = (e) => setQuesName(e.currentTarget.value);
  const handleDesc = (e) => setQuesDesc(e.currentTarget.value);
  const handleDiff = (e) => setQuesDiff(e.target.value);

  const handleAdd = () => {
    setConstraints((prev) => [...prev, con]);
<<<<<<< HEAD
=======

>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
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
<<<<<<< HEAD
      setTestInput("");
      setTestOutput("");
      setErr("");
=======
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("jwtToken");
    const username = params.username;
    await axios.post(
      `${link.url}/${username}/addQues`,
      {
        quesName: quesName,
        difficulty: quesDiff,
        description: quesDesc,
        constraints: constraints,
        testcases: testcases,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
<<<<<<< HEAD
      }
=======
      },
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
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
<<<<<<< HEAD
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center justify-center w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 gap-5 p-6 bg-white shadow-lg rounded-xl">
          {err && <div className="text-red-500">{err}</div>}
          
          <Input
            label="Ques Name"
            onChange={handleName}
            className="w-full p-3 text-lg rounded-xl border border-gray-300"
            placeholder="Enter Question Name"
          />
          
          <h1 className="self-start text-xl font-semibold">Question Description</h1>
          <textarea
            onChange={handleDesc}
            rows={5}
            className="w-full p-3 text-lg rounded-xl border border-gray-300 resize-none"
            placeholder="Enter Question Description"
          />
          
          <select
            onChange={handleDiff}
            className="w-full p-3 bg-white text-lg border border-gray-300 rounded-xl"
=======
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
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
          >
            <option value="">---DIFFICULTY---</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
<<<<<<< HEAD
          
=======
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
          <Input
            label="Constraints"
            value={con}
            placeholder="Enter Constraints"
<<<<<<< HEAD
            className="w-full p-3 text-lg rounded-xl border border-gray-300"
            onChange={(e) => setCon(e.currentTarget.value)}
          />
          
          <button
            onClick={handleAdd}
            className="w-full p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all"
          >
            Add Constraint
          </button>
          
          {constraints && constraints.length > 0 && (
            <div className="w-full">
              <h2 className="text-xl font-semibold">Constraints:</h2>
              <ul className="list-disc list-inside">
                {constraints.map((c, ind) => (
                  <li key={ind} className="font-mono text-lg">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <h2 className="self-start text-xl font-semibold">Test Cases</h2>
          
          <Input
            label="Input"
            value={testInput}
            onChange={(e) => setTestInput(e.currentTarget.value)}
            className="w-full p-3 text-lg rounded-xl border border-gray-300"
            placeholder="Input Value"
          />
          
=======
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
            }}
            className="p-5 text-lg rounded-2xl w-full"
            placeholder="Input Value"
          />
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
          <Input
            label="Output"
            value={testOutput}
            onChange={(e) => setTestOutput(e.currentTarget.value)}
<<<<<<< HEAD
            className="w-full p-3 text-lg rounded-xl border border-gray-300"
            placeholder="Output Value"
          />
          
          <button
            onClick={handleAddTestCase}
            className="w-full p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all"
          >
            Add Test Case
          </button>
          
          {testcases && testcases.length > 0 && (
            <div className="w-full">
              <h2 className="text-xl font-semibold">Test Cases:</h2>
              <ul className="list-disc list-inside">
                {testcases.map((val, ind) => (
                  <li key={ind} className="font-mono text-lg">
                    Input: {val.input}, Output: {val.output}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <button
            onClick={handleSubmit}
            className="w-full p-3 bg-green-600 text-white text-lg rounded-xl hover:bg-green-500 transition-all"
=======
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
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
          >
            Add Question
          </button>
        </div>
      </div>
    </>
  );
}

export default AddQues;
