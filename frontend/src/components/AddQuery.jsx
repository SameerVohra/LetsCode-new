import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import link from "../assets/link.json";

function AddQuery() {
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [err, setErr] = useState("");
  const params = useParams();
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setErr("Login to perform this action");
        return;
      } else {
        if (!email || !query) {
          setErr("Every field is required");
          return;
        }
        setErr("");
        await axios.post(
          `${link.url}/${params.username}/query`,
          {
            email,
            query,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Query Received");
        setEmail("");
        setQuery("");
        setErr("");
      }
    } catch (error) {
      setErr("Internal Server Error");
    }
  };

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  return (
    <>
      <div className="flex flex-wrap justify-center items-center min-h-screen bg-gray-100">
        <div className="flex flex-wrap justify-center items-center w-full sm:w-auto mt-5">
          <div className="border-2 flex flex-col justify-center items-center w-full max-w-lg p-6 bg-indigo-900 text-white rounded-3xl shadow-lg">
            <div className="flex flex-col justify-start items-start w-full mb-4">
              <label htmlFor="email" className="text-xl mb-2">Email:</label>
              <Input
                id="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.currentTarget.value)}
                value={email}
                className="px-3 py-2 text-xl w-full rounded-xl border-2 border-black text-black"
              />
            </div>
            <div className="flex flex-col justify-start items-start w-full mb-4">
              <label htmlFor="query" className="text-xl mb-2">Query:</label>
              <textarea
                id="query"
                rows={6}
                placeholder="Enter your Query"
                onChange={(e) => setQuery(e.currentTarget.value)}
                value={query}
                className="border-2 border-black rounded-2xl text-black p-3 w-full resize-none"
              />
            </div>
            <Button
              children="Submit"
              onClick={handleSubmit}
              className="border-2 border-black px-5 py-2 bg-sky-300 hover:text-white text-black rounded-2xl transition-all hover:shadow-lg hover:bg-blue-600 w-full"
            />
            {err && (
              <div className="text-red-500 mt-4">
                {err}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddQuery;
