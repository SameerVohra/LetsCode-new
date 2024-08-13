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
<<<<<<< HEAD

=======
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
<<<<<<< HEAD
        setErr("Login to perform this action");
=======
        setErr("Login To perform this action");
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
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
<<<<<<< HEAD
          }
        );
        alert("Query Received");
=======
          },
        );
        alert("Query Recieved");
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
        setEmail("");
        setQuery("");
        setErr("");
      }
    } catch (error) {
      setErr("Internal Server Error");
    }
  };
<<<<<<< HEAD

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
=======
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);
  return (
    <>
      <div className="flex flex-wrap justify-center items-center">
        <div className="flex flex-wrap justify-center items-center h-auto mt-1 flex-col">
          <div className="border-2 flex flex-wrap justify-center items-center flex-col h-auto w-auto px-10 py-5 gap-3 bg-indigo-900 text-white rounded-3xl">
            <div className="flex flex-col justify-center items-start text-2xl w-full">
              <h2>Email: </h2>
              <Input
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
                value={email}
                className="px-3 py-2 text-xl w-full rounded-xl border-2 border-black text-black"
              />
            </div>
<<<<<<< HEAD
            <div className="flex flex-col justify-start items-start w-full mb-4">
              <label htmlFor="query" className="text-xl mb-2">Query:</label>
              <textarea
                id="query"
                rows={6}
                placeholder="Enter your Query"
                onChange={(e) => setQuery(e.currentTarget.value)}
                value={query}
                className="border-2 border-black rounded-2xl text-black p-3 w-full resize-none"
=======
            <div className="flex flex-col justify-center items-start text-2xl w-full font-sans">
              <h2>Query:</h2>
              <textarea
                rows={10}
                cols={60}
                placeholder="Enter your Query"
                onChange={(e) => {
                  setQuery(e.currentTarget.value);
                }}
                value={query}
                className="border-2 border-black rounded-2xl text-black p-3 font-sans"
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
              />
            </div>
            <Button
              children="Submit"
              onClick={handleSubmit}
<<<<<<< HEAD
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
=======
              className="border-2 border-black px-5 py-2 bg-sky-300 hover:text-white text-black rounded-2xl transition-all hover:shadow-black hover:shadow-2xl hover:bg-blue-600"
            />
          </div>
        </div>
      </div>
      {err}
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
    </>
  );
}

export default AddQuery;
