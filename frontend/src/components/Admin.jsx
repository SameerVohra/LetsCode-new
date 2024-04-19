import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";
import LinkBtn from "./Header/LinkBtn";

function Admin() {
  const [username, setUsername] = useState("");
  const [ques, setQues] = useState([]);
  const [err, setErr] = useState("");
  const params = useParams();

  return (
    <>
      <h1>{username}</h1>
      <LinkBtn to={`displayQueries`} text="Display Query" />
      <LinkBtn to={`displayQuestions`} text="Display Question" />
      <LinkBtn to={`addQues`} text="Add Questions" />
      <LinkBtn to={`displayUsers`} text="Display Users" />
    </>
  );
}

export default Admin;
