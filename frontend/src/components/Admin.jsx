import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function Admin() {
  const [queries, setQueries] = useState([]);
  const [err, setErr] = useState("");
  const params = useParams();
  useEffect(() => {
    console.log("hello");
    const query = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const username = params.username;
        if (!token) {
          setErr("Not Authorized for this action");
          return;
        } else {
          const data = await axios.get(
            `http://localhost:3000/${username}/display-queries`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          console.log(data.data.queries);
          console.log({ ...[data.data.queries.query] });
          setQueries(data.data.queries);
        }
      } catch (error) {
        setErr(error);
        return;
      }
    };
    query();
  }, [params.username]);
  return (
    <>
      <h1>ADMIN</h1>
      {queries &&
        queries.map((q, index) => (
          <div key={index}>
            {q.query} <span>by</span>{" "}
            <span className="font-bold">{q.username}</span>{" "}
            <button onClick={(e) => console.log(e)}>Resolve</button>
          </div>
        ))}
    </>
  );
}

export default Admin;
