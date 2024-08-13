import axios from "axios";
import Input from "./Input";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import link from "../assets/link.json";
<<<<<<< HEAD

=======
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
function AcceptQuestion() {
  const params = useParams();

  const [err, setErr] = useState("");
  const [quesName, setQuesName] = useState("");
  const [quesDesc, setQuesDesc] = useState("");
  const [quesDiff, setQuesDiff] = useState("");
  const [testcases, setTestCases] = useState([]);
  const [testInput, setTestInput] = useState("");
  const [testOutput, setTestOutput] = useState("");
  const [con, setCon] = useState("");
  const [constraints, setConstraints] = useState([]);
  const [quesData, setQuesData] = useState([]);
<<<<<<< HEAD

=======
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
  useEffect(() => {
    const ques = async () => {
      const token = localStorage.getItem("jwtToken");
      try {
        if (!token) {
          setErr("Login to access this data");
          return;
        } else {
          const qid = params.qId;
          const data = await axios.get(`${link.url}/${qid}/approve-question`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setQuesData(data.data.ques);
          setQuesName(data.data.ques.quesName);
          setQuesDesc(data.data.ques.description);
        }
      } catch (error) {
        setErr(error);
      }
    };
    ques();
  }, [params.qId]);

  const handleNameChange = (e) => {
    setQuesName(e.currentTarget.value);
  };

  const handleDescChange = (e) => {
    setQuesDesc(e.currentTarget.value);
  };

  const handleDiffChange = (e) => {
    setQuesDiff(e.target.value);
  };

  const handleConstraints = (e) => {
    setConstraints((prevConst) => [...prevConst, con]);
    setCon("");
  };
<<<<<<< HEAD

=======
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
  const handleAddTestCase = () => {
    if (testInput === "" || testOutput === "") {
      setErr("All fields are required");
    } else {
      setTestCases((prev) => [
        { input: testInput, output: testOutput },
        ...prev,
      ]);
      setTestOutput("");
      setTestInput("");
    }
  };

  const handleApprove = async (e) => {
    const username = params.username;
    const qId = params.qId;
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setErr("Login to perform this action");
        return;
      } else {
        const approve = await axios.post(
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
          },
        );

        const quesDel = await axios.put(`${link.url}/${qId}/added`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Question Added successfully");
      }
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-wrap flex-col justify-center items-center w-full">
<<<<<<< HEAD
        <div className="flex flex-wrap justify-center items-center flex-col px-4 py-2 border-2 bg-blue-200 rounded-xl mt-4 md:px-10 md:py-4">
          {err ? (
            err
          ) : (
            <div className="px-4 py-5 w-full gap-5 flex flex-wrap md:px-10">
              {quesData && (
                <div className="flex flex-col justify-center items-center text-lg md:text-2xl w-full">
=======
        <div className="flex flex-wrap justify-center items-center flex-col px-10 py-2 border-2 bg-blue-200 rounded-xl mt-4">
          {err ? (
            err
          ) : (
            <div className="px-10 py-5 w-fit gap-5 flex flex-wrap">
              {quesData && (
                <div className="flex flex-col justify-center items-center text-2xl">
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
                  <Input
                    label="Question Name"
                    value={quesName}
                    onChange={handleNameChange}
<<<<<<< HEAD
                    className="text-base md:text-xl w-full rounded-2xl p-3 md:p-5"
                  />
                  <h1 className="mt-4">Question Description</h1>
                  <textarea
                    value={quesDesc}
                    rows={8}
                    cols={30}
                    onChange={handleDescChange}
                    className="rounded-2xl p-3 md:p-5 text-base md:text-xl w-full"
                  />
                  <select
                    onChange={handleDiffChange}
                    className="mt-4 rounded-xl px-6 py-2 text-base md:text-xl text-center bg-sky-100 w-full md:w-auto"
=======
                    className="text-xl w-full rounded-2xl p-5"
                  />
                  <h1>Question Description</h1>
                  <textarea
                    value={quesDesc}
                    rows={10}
                    cols={40}
                    onChange={handleDescChange}
                    className="rounded-2xl p-5 text-xl"
                  />
                  <select
                    onChange={handleDiffChange}
                    className="mt-4 rounded-xl px-10 py-2 text-xl text-center bg-sky-100 w-auto"
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
                  >
                    <option className="text-center">Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>

<<<<<<< HEAD
                  <h1 className="text-lg md:text-xl mt-4">Constraints</h1>
                  <Input
                    value={con}
                    onChange={(e) => setCon(e.currentTarget.value)}
                    className="text-base md:text-xl p-2 md:p-3 rounded-xl w-full"
                  />
                  <button
                    onClick={handleConstraints}
                    className="px-6 py-2 bg-blue-800 text-white hover:bg-blue-500 hover:text-black hover:font-semibold transition-all rounded-xl hover:shadow-xl hover:shadow-black text-base md:text-lg mt-4"
=======
                  <h1 className="text-xl">Constraints</h1>
                  <Input
                    value={con}
                    onChange={(e) => setCon(e.currentTarget.value)}
                    className="text-xl p-3 rounded-xl "
                  />
                  <button
                    onClick={handleConstraints}
                    className="px-6 py-2 bg-blue-800 text-white hover:bg-blue-500 hover:text-black hover:font-semibold transition-all rounded-xl hover:shadow-xl hover:shadow-black text-lg"
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          )}
<<<<<<< HEAD
          <h3 className="text-lg md:text-xl mt-4">Added Constraint Values</h3>
          {constraints &&
            constraints.map((c, ind) => (
              <div key={ind} className="font-mono text-base md:text-lg">
                {c}
              </div>
            ))}
          <h2 className="text-xl md:text-2xl mt-8">TestCases</h2>
          <Input
            label="Input"
            className="rounded-xl w-full p-3 md:p-5 text-base md:text-xl"
=======
          <h3 className="text-xl">Added Constraint Values</h3>
          {constraints &&
            constraints.map((c, ind) => (
              <div key={ind} className="font-mono text-lg">
                {c}
              </div>
            ))}
          <h2 className="text-2xl mt-8">TestCases</h2>
          <Input
            label="Input"
            className="rounded-xl w-full p-5 text-xl"
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
            value={testInput}
            onChange={(e) => {
              setTestInput(e.currentTarget.value);
            }}
          />
          <Input
<<<<<<< HEAD
            className="rounded-xl w-full p-3 md:p-5 text-base md:text-xl"
=======
            className="rounded-xl w-full p-5 text-xl"
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
            label="Output"
            value={testOutput}
            onChange={(e) => setTestOutput(e.currentTarget.value)}
          />
          <button
            onClick={handleAddTestCase}
<<<<<<< HEAD
            className="px-6 py-2 bg-blue-800 text-white hover:text-black hover:bg-blue-500 transition-all hover:shadow-black hover:shadow-lg rounded-xl text-base md:text-lg mt-4"
          >
            Add TestCase
          </button>
          <br />
          {testcases && (
            <ul>
              {testcases.map((val, ind) => (
                <li key={ind} className="text-base md:text-lg">
=======
            className="px-6 py-2 bg-blue-800 text-white hover:text-black hover:bg-blue-500 transition-all hover:shadow-black hover:shadow-lg rounded-xl text-lg"
          >
            Add TestCase
          </button>
          <br />{" "}
          {testcases && (
            <ul>
              {testcases.map((val, ind) => (
                <li key={ind}>
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
                  {val.input} -- {val.output}
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={handleApprove}
<<<<<<< HEAD
            className="px-6 py-3 bg-blue-800 hover:bg-blue-500 hover:font-semibold rounded-sm text-lg md:text-xl mt-7"
=======
            className="px-6 py-3 bg-blue-800 hover:bg-blue-500 hover:font-semibold rounded-sm text-xl mt-7"
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
          >
            Approve
          </button>
        </div>
      </div>
    </>
  );
}

export default AcceptQuestion;
