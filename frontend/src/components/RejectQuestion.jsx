import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import link from "../assets/link.json";

function RejectQuestion() {
<<<<<<< HEAD
  const { qId } = useParams();
  const [reason, setReason] = useState("");
  const [err, setErr] = useState("");

=======
  const params = useParams();
  const [reason, setReason] = useState("");
  const [err, setErr] = useState("");

  const qId = params.qId;
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    const username = localStorage.getItem("username");
<<<<<<< HEAD

    if (!token) {
      setErr("Login required.");
      return;
    }

    try {
      const response = await axios.delete(`${link.url}/${qId}/reject`, {
=======
    try {
      if (!token) return setErr("Login");

      const reject = await axios.delete(`${link.url}/${qId}/reject`, {
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
        data: { msg: reason },
        headers: { Authorization: `Bearer ${token}` },
      });

<<<<<<< HEAD
      if (response.status === 201) {
        navigate(`/${username}/admin/displayQuestions`);
      } else {
        setErr("Failed to reject the question.");
      }
    } catch (error) {
      setErr("An error occurred: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-4">Reason for Rejecting the Question</h1>
      <textarea
        rows={6}
        cols={40}
        value={reason}
        onChange={(e) => setReason(e.currentTarget.value)}
        className="rounded-lg border-gray-300 border p-4 text-lg w-full max-w-md"
        placeholder="Enter reason here"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-900 text-white hover:bg-cyan-600 hover:text-black px-6 py-2 transition-all rounded-lg"
      >
        Send
      </button>
      {err && <h3 className="text-red-700 font-semibold mt-4">{err}</h3>}
    </div>
=======
      if (reject.status === 201) {
        navigate(`/${username}/admin/displayQuestions`);
      }
    } catch (error) {
      setErr(error.message);
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
        {err && <h3 className="text-red-700 font-bold">{err}</h3>}
      </div>
    </>
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
  );
}

export default RejectQuestion;
