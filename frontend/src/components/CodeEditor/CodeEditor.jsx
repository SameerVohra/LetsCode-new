import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { useParams } from "react-router";
import link from "../../assets/link.json";

function CodeEditor() {
  const [code, setCode] = useState("");
  const [compileResult, setCompileResult] = useState(null);
  const [err, setErr] = useState("");
  const [quesInfo, setQuesInfo] = useState([]);
  const params = useParams();
  const qId = params.qId;
  const username = params.username;
  const solved = async () => {
    const token = localStorage.getItem("jwtToken");
    try {
      if (!token) return setErr("Login to perform this action");
      const data = await axios.put(`${link.url}/${qId}/${username}/solved`);
    } catch (error) {
      setErr(error.message);
    }
  };

  useEffect(() => {
    const quesInfo = async () => {
      try {
        const data = await axios.get(`${link.url}/${qId}/ques-details`);

        setQuesInfo(data.data);
      } catch (error) {
        setErr(error.message);
      }
    };
    quesInfo();
  }, [qId]);
  const handleCompile = async () => {
    try {
      const response = await axios.post(`${link.url}/${qId}/compile-cpp`, {
        code: code,
      });
      if (response.data.totalCount === response.data.passedCount)
        await solved();
      setCompileResult(response.data);
      setErr("");
    } catch (error) {
      setErr("Error compiling code");
      setCompileResult(null);
    }
  };

  return (
    <div className="px-5 py-3">
      <div className="grid grid-cols-2 mt-5 gap-4">
        <div
          className="grid grid-rows-3"
          style={{ gridTemplateRows: "1.25fr 0.25fr 1.50fr" }}
        >
          {quesInfo && (
            <div>
              <h1 className="font-bold">Question Name</h1>
              <p>{quesInfo.quesName}</p>
              <h2 className="font-bold">Description</h2>
              <p>{quesInfo.description}</p>
              <h3 className="font-bold">Difficulty</h3>
              <p>{quesInfo.difficulty}</p>
              <h4 className="font-bold">Constraints</h4>
              {quesInfo.constraints &&
                quesInfo.constraints.map((constraint, index) => (
                  <ul key={index} className="text-gray-500">
                    <li>{constraint}</li>
                  </ul>
                ))}
            </div>
          )}

          <button
            onClick={handleCompile}
            className="border-black border-2 px-3 py-2 w-fit mb-2"
          >
            Compile
          </button>
          <div className="bg-black flex flex-wrap items-center justify-start flex-col">
            <h1 className="text-white font-bold text-2xl">Output:</h1>
            {err && <div className="text-red-500">{err}</div>}

            {compileResult && (
              <div
                className={`text-xl mt-10 ${compileResult.passedCount === compileResult.totalCount ? "text-green-400" : "text-red-500"}`}
              >
                <div>
                  <pre>
                    <h3>
                      Total testcases:{" "}
                      {JSON.stringify(compileResult.totalCount, null, 2)}
                    </h3>{" "}
                    <h3>
                      Passed testcases:{" "}
                      {JSON.stringify(compileResult.passedCount, null, 2)}
                    </h3>{" "}
                    <h3>
                      Passed Percentage:{" "}
                      {JSON.stringify(compileResult.passedPercentage, null, 2)}
                    </h3>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          {" "}
          <Editor
            height="80vh"
            width="100%"
            theme="vs-dark"
            language="cpp"
            onChange={setCode}
            value={code}
            defaultValue={`#include<iostream>\nusing namespace std;\n\nint main(){\n\t\n\treturn 0;\n}`}
          />
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
