import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import link from "../assets/link.json";

function ShowQuery() {
  const [userData, setUserData] = useState({});
  const [err, setErr] = useState("");
  const params = useParams();
  const navigate = useNavigate();
<<<<<<< HEAD
=======

>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
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
<<<<<<< HEAD
        setErr("Failed to fetch data: " + error.message);
=======
        setErr(error);
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
      }
    };

    getData();
  }, [queryId]);

  const handleResolve = async () => {
    try {
<<<<<<< HEAD
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setErr("Login required.");
        return;
      }
      const username = localStorage.getItem("username");
      await axios.put(`${link.url}/${queryId}/resolve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Query Resolved");
      navigate(`/${username}/admin/displayQueries`);
    } catch (error) {
      setErr("Failed to resolve query: " + error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-100 p-4">
      {userData && (
        <div className="flex flex-col items-center bg-cyan-400 p-6 rounded-2xl shadow-lg max-w-lg w-full">
          <h2 className="text-2xl font-semibold mb-2">USERNAME: {userData.username}</h2>
          <h2 className="text-xl mb-2">EMAIL: {userData.email}</h2>
          <h2 className="text-lg mb-4">QUERY: {userData.query}</h2>
          <button
            type="button"
            onClick={handleResolve}
            className="px-6 py-3 bg-blue-900 text-lime-300 rounded-lg hover:bg-cyan-600 hover:text-black transition-all"
          >
            Resolve
          </button>
        </div>
      )}
      {err && <h3 className="text-red-700 font-semibold mt-4">{err}</h3>}
    </div>
=======
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
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
  );
}

export default ShowQuery;
