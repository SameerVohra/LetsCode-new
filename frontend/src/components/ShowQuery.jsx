import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import link from "../assets/link.json";

function ShowQuery() {
  const [userData, setUserData] = useState({});
  const [err, setErr] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const { queryId } = params;

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          setErr("Login to see the queries");
          return;
        }
        const queryData = await axios.get(`${link.url}/${queryId}/show-query`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(queryData.data);
      } catch (error) {
        setErr(error);
      }
    };

    getData();
  }, [queryId]);

  const handleResolve = async () => {
    try {
      const username = localStorage.getItem("username");
      const data = await axios.put(`${link.url}/${queryId}/resolve`);
      setUserData(data);
      alert("Query Resolved");
      navigate(`/${username}/admin/displayQueries`);
    } catch (error) {
      setErr(error);
    }
  };
  return (
    <>
      <div className="flex flex-wrap justify-center items-center flex-row min-h-screen bg-blue-100">
        {userData && (
          <div className="min-h-screen flex flex-wrap justify-center items-center flex-col">
            <div className="flex flex-col flex-wrap gap-5 justify-center items-center px-16 py-5 h-auto max-w-3/6 bg-cyan-400 rounded-2xl">
              <h2>USERNAME: {userData.username}</h2>
              <h2>EMAIL: {userData.email}</h2>
              <h2>QUERY: {userData.query}</h2>
            </div>
            <button
              onClick={handleResolve}
              className="mt-5 px-5 py-3 bg-blue-900 text-lime-300 hover:shadow-black hover:shadow-2xl transition-all hover:bg-cyan-600 hover:text-black "
            >
              Resolve
            </button>
          </div>
        )}
        {err && err.message}{" "}
      </div>
    </>
  );
}

export default ShowQuery;
