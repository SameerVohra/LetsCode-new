import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { useParams } from "react-router";
import axios from "axios";

function AddQuery() {
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [err, setErr] = useState("");
  const params = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setErr("Login To perform this action");
        return;
      } else {
        if (!email || !query) {
          setErr("Every field is required");
          return;
        }
        setErr("");
        const queries = await axios.post(
          `http://localhost:3000/${params.username}/query`,
          {
            email,
            query,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        console.log(queries);
        alert("Query Recieved");
        setEmail("");
        setQuery("");
        setErr("");
      }
    } catch (error) {
      setErr("Internal Server Error");
    }
  };
  return (
    <>
      <div className="bg-sky-100 min-h-screen flex flex-wrap justify-center items-center">
        <div className="flex flex-wrap justify-center items-center h-auto mt-1 flex-col">
          <div className="border-2 flex flex-wrap justify-center items-center flex-col h-auto w-auto px-10 py-5 gap-3 bg-indigo-900 text-white rounded-3xl">
            <div className="flex flex-col justify-center items-start text-2xl w-full">
              <h2>Email: </h2>
              <Input
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
                value={email}
                className="px-3 py-2 text-xl w-full rounded-xl border-2 border-black text-black"
              />
            </div>
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
              />
            </div>
            <Button
              children="Submit"
              onClick={handleSubmit}
              className="border-2 border-black px-5 py-2 bg-sky-300 hover:text-white text-black rounded-2xl transition-all hover:shadow-black hover:shadow-2xl hover:bg-blue-600"
            />
          </div>
        </div>
      </div>
      {err}
    </>
  );
}

export default AddQuery;
