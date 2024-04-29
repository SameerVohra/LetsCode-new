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
          console.log(response.data);
          const pendingQues = response.data.filter(
            (q) => q.isApproved !== true,
          );
          setQues(pendingQues);
        }
      } catch (error) {
        setErr(error.message);
      }
    };
    ques.filter((q) => q.isApproved != true);
    fetchQuestions();
  }, [params]);

  return (
    <>
      <div className="flex flex-wrap flex-col gap-4 px-4 py-2">
        {err && <div>{err}</div>}
        {ques.length > 0 ? (
          ques.map((q) => (
            <div
              key={q._id}
              className="flex flex-wrap flex-row justify-between items-center px-10 py-4 rounded-2xl bg-cyan-600"
            >
              <div className="px-3 py-1 text-2xl">
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
              <div className="flex flex-col justify-center items-center gap-2">
                <LinkBtn
                  className="border-2 bg-lime-500 px-5 py-2 hover:bg-green-700 hover:text-white transition-all rounded-xl hover:shadow-2xl hover:shadow-black shadow-xl"
                  to={`/${params.username}/${q._id}/accept`}
                  text="Accept"
                />
                <LinkBtn
                  className="border-2 bg-red-600 px-5 py-2 hover:bg-red-800 hover:text-white transition-all rounded-xl hover:shadow-2xl hover:shadow-black shadow-xl"
                  to={`/${params.username}/${q._id}/reject`}
                  text="Reject"
                />
              </div>
            </div>
          ))
        ) : (
          <div>No questions</div>
        )}
      </div>
    </>
  );
}

export default DisplayQuestions;
