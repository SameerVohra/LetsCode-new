import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

function RejectQuestion() {
  const params = useParams();
  const [reason, setReason] = useState("");
  const [err, setErr] = useState("");

  const qId = params.qId;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    const username = localStorage.getItem("username");
    try {
      if (!token) return setErr("Login");

      const reject = await axios.delete(`http://localhost:3000/${qId}/reject`, {
        data: { msg: reason },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (reject.status === 201) {
        navigate(`/${username}/admin/displayQuestions`);
      }
      console.log(qId);
      console.log(reject);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>Reason</h1>
      <textarea
        rows={4}
        cols={20}
        value={reason}
        onChange={(e) => setReason(e.currentTarget.value)}
      />
      <button onClick={handleSubmit}>Send</button>
    </>
  );
}

export default RejectQuestion;
