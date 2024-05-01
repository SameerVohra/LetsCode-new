import { useNavigate, useParams } from "react-router";
import Button from "./Button";
import Input from "./Input";
import { useEffect, useState } from "react";
import axios from "axios";
import link from "../assets/link.json";

function Contribute() {
  const [quesName, setQuesName] = useState("");
  const [quesDesc, setQuesDesc] = useState("");
  const [err, setErr] = useState("");
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setErr("Login to perform this action");
        return;
      }
      if (!quesName || !quesDesc) {
        setErr("Every field is required");
        return;
      } else {
        const question = await axios.post(
          `${link.url}/${params.username}/contribute`,
          {
            quesName: quesName,
            description: quesDesc,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setQuesName("");
        setQuesDesc("");
        alert("Thank you for your contribution");
      }
    } catch (error) {
      setErr("Internal Server Error");
    }
  };

  return (
    <>
      <div className="flex flex-wrap flex-col">
        <h1 className="text-center text-3xl">
          Contribute to the Coding Community
        </h1>
        <div className="flex flex-wrap flex-col justify-center items-center h-auto mt-1 ">
          <div className="border-2 flex flex-wrap justify-center items-center flex-col h-auto w-auto px-10 py-5 gap-3 bg-indigo-900 text-white rounded-3xl">
            <div className="flex flex-col justify-center items-start text-2xl w-full">
              <h1>Question Name: </h1>
              <Input
                placeholder="Question Name"
                onChange={(e) => setQuesName(e.currentTarget.value)}
                value={quesName}
                className="px-3 py-2 text-xl w-full rounded-xl border-2 border-black text-black p-3 font-sans"
              />
            </div>
            <div className="flex flex-col justify-center items-start text-2xl w-full">
              <h1>Question Description</h1>
              <textarea
                rows={10}
                cols={60}
                placeholder="Question Description"
                onChange={(e) => setQuesDesc(e.currentTarget.value)}
                value={quesDesc}
                className="border-2 border-black rounded-2xl text-black p-3 font-sans"
              />
            </div>
            <Button
              children="Submit"
              onClick={handleSubmit}
              className="border-2 border-black px-5 py-2 bg-sky-300 hover:bg-blue-600 hover:shadow-black hover:shadow-2xl transition-all rounded-2xl text-black hover:text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Contribute;
