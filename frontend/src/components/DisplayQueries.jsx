import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LinkBtn from "./Header/LinkBtn";
import link from "../assets/link.json";

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
          const data = await axios.get(
            `${link.url}/${username}/display-queries`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const queryArr = data.data.queries;
          queryArr.filter((q) => q.isResolved !== true);
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
      <div className=" px-10 py-5 flex flex-col justify-start items-center gap-10 min-h-screen bg-sky-100 text-xl ">
        {queries.length > 0 ? (
          queries.map((q, index) => (
            <div
              key={index}
              className="bg-cyan-400 flex px-10 py-3 w-3/6 justify-center items-center flex-col h-auto gap-4 rounded-xl shadow-black shadow-2xl"
            >
              <div className="font-bold">
                Query: <span className="font-mono font-thin">{q.query}</span>
              </div>
              <div className="font-bold">
                Username:{" "}
                <span className="text-gray-600 font-semibold">
                  {q.username}
                </span>
              </div>
              <LinkBtn
                to={`/${q._id}/show-query`}
                text="Resolve"
                className="text-xl px-5 py-2 bg-blue-900 text-lime-300 hover:bg-blue-800 hover:text-white transition-all hover:shadow-black hover:shadow-2xl"
              />
            </div>
          ))
        ) : (
          <h1>No Queries</h1>
        )}
      </div>
    </>
  );
}

export default DisplayQueries;
