import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LinkBtn from "./Header/LinkBtn";

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
            `https://lc-backend-jet.vercel.app/${username}/display-contributed`,
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
              className="border-2 border-black flex flex-wrap flex-row items-center justify-between p-4"
            >
              <div>
                <div>Contributed by: {q.contributedBy}</div>
                <div>Question Name: {q.quesName}</div>
                <div>Question Description: {q.description}</div>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <LinkBtn
                  className="border-2 bg-green-500 px-2 py-1"
                  to={`/${params.username}/${q._id}/accept`}
                  text="Accept"
                />
                <LinkBtn
                  className="border-2 bg-red-700 px-2 py-1"
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
