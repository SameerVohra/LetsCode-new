import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LinkBtn from "./Header/LinkBtn";
import link from "../assets/link.json";

function DisplayQuestions() {
  const [err, setErr] = useState("");
  const [ques, setQues] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          throw new Error("Login to display questions");
        } else {
          const { username } = params;
          const response = await axios.get(
            `${link.url}/${username}/display-contributed`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          const pendingQues = response.data.filter(
            (q) => q.isApproved !== true,
          );
          setQues(pendingQues);
        }
      } catch (error) {
        setErr(error.message);
      }
    };
<<<<<<< HEAD
=======
    ques.filter((q) => q.isApproved != true);
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
    fetchQuestions();
  }, [params]);

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-sky-100 py-8 px-4 sm:px-6 lg:px-8">
      {err && <p className="text-red-500 text-center mb-4">{err}</p>}
      <h1 className="text-center text-3xl mb-6">Pending Questions</h1>
      <div className="flex flex-col items-center gap-6">
=======
    <>
      <div className="flex flex-wrap flex-col gap-4 px-4 py-2">
        {err && <div>{err}</div>}
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
        {ques.length > 0 ? (
          ques.map((q) => (
            <div
              key={q._id}
<<<<<<< HEAD
              className="w-full max-w-4xl bg-cyan-600 p-4 rounded-2xl shadow-lg flex flex-col md:flex-row md:justify-between gap-4"
            >
              <div className="text-lg text-white">
=======
              className="flex flex-wrap flex-row justify-between items-center px-10 py-4 rounded-2xl bg-cyan-600"
            >
              <div className="px-3 py-1 text-2xl">
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
                <h1 className="font-bold font-serif">
                  Contributed by:{" "}
                  <span className="font-thin font-mono">{q.contributedBy}</span>
                </h1>
                <h1 className="font-bold font-serif">
                  Question Name:{" "}
                  <span className="font-thin font-mono">{q.quesName}</span>
                </h1>
                <h1 className="font-bold font-serif">
                  Question Description:{" "}
                  <span className="font-thin font-mono">{q.description}</span>
                </h1>
              </div>
<<<<<<< HEAD
              <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                <LinkBtn
                  className="bg-lime-500 px-4 py-2 text-white border-2 border-transparent rounded-xl shadow-md hover:bg-green-700 hover:shadow-lg transition-all"
=======
              <div className="flex flex-col justify-center items-center gap-2">
                <LinkBtn
                  className="border-2 bg-lime-500 px-5 py-2 hover:bg-green-700 hover:text-white transition-all rounded-xl hover:shadow-2xl hover:shadow-black shadow-xl"
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
                  to={`/${params.username}/${q._id}/accept`}
                  text="Accept"
                />
                <LinkBtn
<<<<<<< HEAD
                  className="bg-red-600 px-4 py-2 text-white border-2 border-transparent rounded-xl shadow-md hover:bg-red-800 hover:shadow-lg transition-all"
=======
                  className="border-2 bg-red-600 px-5 py-2 hover:bg-red-800 hover:text-white transition-all rounded-xl hover:shadow-2xl hover:shadow-black shadow-xl"
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
                  to={`/${params.username}/${q._id}/reject`}
                  text="Reject"
                />
              </div>
            </div>
          ))
        ) : (
<<<<<<< HEAD
          <p className="text-xl text-gray-500">No questions</p>
        )}
      </div>
    </div>
=======
          <div>No questions</div>
        )}
      </div>
    </>
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
  );
}

export default DisplayQuestions;
