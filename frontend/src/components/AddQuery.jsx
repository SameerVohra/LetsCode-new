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
        console.log(id);
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
      <h1>Queries</h1>
      <div>
        <Input
          label="email"
          placeholder="Enter email"
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
          value={email}
        />
        <Input
          label="query"
          placeholder="Enter your Query"
          onChange={(e) => {
            setQuery(e.currentTarget.value);
          }}
          value={query}
        />
        <Button children="Submit" onClick={handleSubmit} />
      </div>
      {err}
    </>
  );
}

export default AddQuery;
