import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LinkBtn from "./Header/LinkBtn";

function DisplayQueries() {
  const params = useParams();
  const [queries, setQueries] = useState([]);
  const [err, setErr] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const username = params.username;
        setUsername(username);
        if (!token) {
          setErr("Not Authorized for this action");
          return;
        } else {
          const data = await axios.get(`/api/${username}/display-queries`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(data.data.queries);
          const queryArr = data.data.queries;
          queryArr.filter((q) => q.isResolved !== true);
          console.log(queryArr);
          setQueries(queryArr);
        }
      } catch (error) {
        setErr(error);
      }
    };
    fetchQueries();
  }, [params]);

  return (
    <>
      {queries.length > 0
        ? queries.map((q, index) => (
            <div key={index}>
              {q.query} <span>by</span>{" "}
              <span className="font-bold">
                {q.username} query id {q._id}
              </span>
              <LinkBtn
                to={`/${q._id}/show-query`}
                text="Resolve"
                className="text-black"
              />
            </div>
          ))
        : "no queries"}
    </>
  );
}

export default DisplayQueries;
