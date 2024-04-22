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

      const reject = await axios.delete(
        `https://letscode-new-backend.onrender.com/${qId}/reject`,
        {
          data: { msg: reason },
          headers: { Authorization: `Bearer ${token}` },
        },
      );

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
      <div className=" flex flex-wrap justify-center items-center flex-col gap-10 py-10">
        <h1 className="text-2xl">Reason for Rejecting The Question</h1>
        <textarea
          rows={10}
          cols={50}
          value={reason}
          onChange={(e) => setReason(e.currentTarget.value)}
          className="rounded-2xl p-5 text-xl"
          placeholder="Enter Reason here"
        />
        <button
          onClick={handleSubmit}
          className=" bg-blue-900 text-white hover:bg-cyan-600 hover:text-black px-10 py-3 transition-all rounded-3xl "
        >
          Send
        </button>
      </div>
    </>
  );
}

export default RejectQuestion;
