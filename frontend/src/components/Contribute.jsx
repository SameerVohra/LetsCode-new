import { useParams } from "react-router";
import Button from "./Button";
import Input from "./Input";
import { useState } from "react";
import axios from "axios";

function Contribute() {
  const [quesName, setQuesName] = useState("");
  const [quesDesc, setQuesDesc] = useState("");
  const [err, setErr] = useState("");

  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(params.username);
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
          `http://localhost:3000/${params.username}/contribute`,
          {
            quesName: quesName,
            description: quesDesc,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        console.log(question);
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
      <div>
        <Input
          label="Question Name"
          placeholder="Enter the name of the question"
          onChange={(e) => setQuesName(e.currentTarget.value)}
          value={quesName}
        />
        <Input
          label="Question Description"
          placeholder="Question Description"
          onChange={(e) => setQuesDesc(e.currentTarget.value)}
          value={quesDesc}
        />
        <Button children="Submit" onClick={handleSubmit} />
      </div>
      {quesName}
    </>
  );
}

export default Contribute;
