import axios from "axios";
import Input from "./Input";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import link from "../assets/link.json";
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
          console.log(data.data.ques);
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
    console.log(con);
    setConstraints((prevConst) => [...prevConst, con]);
    setCon("");
  };
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
      console.log(testcases);
      console.log("Adding TestCase");
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

        console.log(approve);
        alert("Question Added successfully");
      }
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-wrap flex-col justify-center items-center w-full">
        <div className="flex flex-wrap justify-center items-center flex-col px-10 py-2 border-2 bg-blue-200 rounded-xl mt-4">
          {err ? (
            err
          ) : (
            <div className="px-10 py-5 w-fit gap-5 flex flex-wrap">
              {quesData && (
                <div className="flex flex-col justify-center items-center text-2xl">
                  <Input
                    label="Question Name"
                    value={quesName}
                    onChange={handleNameChange}
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
                  >
                    <option className="text-center">Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>

                  <h1 className="text-xl">Constraints</h1>
                  <Input
                    value={con}
                    onChange={(e) => setCon(e.currentTarget.value)}
                    className="text-xl p-3 rounded-xl "
                  />
                  <button
                    onClick={handleConstraints}
                    className="px-6 py-2 bg-blue-800 text-white hover:bg-blue-500 hover:text-black hover:font-semibold transition-all rounded-xl hover:shadow-xl hover:shadow-black text-lg"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          )}
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
            value={testInput}
            onChange={(e) => {
              setTestInput(e.currentTarget.value);
              console.log(testInput);
            }}
          />
          <Input
            className="rounded-xl w-full p-5 text-xl"
            label="Output"
            value={testOutput}
            onChange={(e) => setTestOutput(e.currentTarget.value)}
          />
          <button
            onClick={handleAddTestCase}
            className="px-6 py-2 bg-blue-800 text-white hover:text-black hover:bg-blue-500 transition-all hover:shadow-black hover:shadow-lg rounded-xl text-lg"
          >
            Add TestCase
          </button>
          <br />{" "}
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
            onClick={handleApprove}
            className="px-6 py-3 bg-blue-800 hover:bg-blue-500 hover:font-semibold rounded-sm text-xl mt-7"
          >
            Approve
          </button>
        </div>
      </div>
    </>
  );
}

export default AcceptQuestion;
