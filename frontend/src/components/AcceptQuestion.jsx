import axios from "axios";
import Input from "./Input";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
function AcceptQuestion() {
  const params = useParams();

  const [err, setErr] = useState("");
  const [quesName, setQuesName] = useState("");
  const [quesDesc, setQuesDesc] = useState("");
  const [quesDiff, setQuesDiff] = useState("");
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
          const data = await axios.get(`/api/${qid}/approve-question`, {
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
          `/api/${username}/addQues`,
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

        const quesDel = await axios.put(`/api/${qId}/added`, {
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
      {err ? (
        err
      ) : (
        <div>
          {quesData && (
            <div>
              <h2>Contributed By: {quesData.contributedBy}</h2>
              <Input
                label="quesName"
                value={quesName}
                onChange={handleNameChange}
              />
              <Input
                label="description"
                value={quesDesc}
                className="h-20 w-fit"
                onChange={handleDescChange}
              />
              <select onChange={handleDiffChange}>
                <option>----Difficulty----</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <h3>Constraints</h3>
              <Input
                value={con}
                onChange={(e) => setCon(e.currentTarget.value)}
              />
              <button onClick={handleConstraints}>Add</button>
            </div>
          )}
        </div>
      )}
      {constraints && constraints.map((c, ind) => <div key={ind}>{c}</div>)}
      <button onClick={handleApprove}>Approve</button>
    </>
  );
}

export default AcceptQuestion;
