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
<<<<<<< HEAD

=======
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
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
<<<<<<< HEAD
            }
          );
          const queryArr = data.data.queries;
          setQueries(queryArr.filter((q) => !q.isResolved));
        }
      } catch (error) {
        setErr("Failed to fetch queries");
=======
            },
          );
          const queryArr = data.data.queries;
          queryArr.filter((q) => q.isResolved !== true);
          setQueries(queryArr);
        }
      } catch (error) {
        setErr(error);
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
      }
    };
    fetchQueries();
  }, [params]);

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-sky-100 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-3xl mb-6">Unresolved Queries</h1>
      {err && <p className="text-red-500 text-center mb-4">{err}</p>}
      <div className="flex flex-col items-center gap-6">
=======
    <>
      <div className=" px-10 py-5 flex flex-col justify-start items-center gap-10 min-h-screen bg-sky-100 text-xl ">
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
        {queries.length > 0 ? (
          queries.map((q, index) => (
            <div
              key={index}
<<<<<<< HEAD
              className="bg-cyan-400 w-full max-w-4xl p-4 rounded-xl shadow-lg flex flex-col gap-4"
            >
              <div className="text-lg font-semibold">
                Query: <span className="font-normal">{q.query}</span>
              </div>
              <div className="text-lg font-semibold">
                Username: <span className="text-gray-600">{q.username}</span>
=======
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
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
              </div>
              <LinkBtn
                to={`/${q._id}/show-query`}
                text="Resolve"
<<<<<<< HEAD
                className="text-lg px-4 py-2 bg-blue-900 text-lime-300 hover:bg-blue-800 hover:text-white transition-all rounded-lg shadow-md hover:shadow-lg"
=======
                className="text-xl px-5 py-2 bg-blue-900 text-lime-300 hover:bg-blue-800 hover:text-white transition-all hover:shadow-black hover:shadow-2xl"
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
              />
            </div>
          ))
        ) : (
<<<<<<< HEAD
          <h1 className="text-xl text-gray-500">No Queries</h1>
        )}
      </div>
    </div>
=======
          <h1>No Queries</h1>
        )}
      </div>
    </>
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
  );
}

export default DisplayQueries;
