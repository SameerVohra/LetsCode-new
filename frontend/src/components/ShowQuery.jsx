import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

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
        console.log(token);
        const queryData = await axios.get(
          `http://localhost:3000/${queryId}/show-query`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        console.log(queryData.data);
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
      const data = await axios.put(`http://localhost:3000/${queryId}/resolve`);
      setUserData(data);
      navigate(`/${username}/admin/displayQueries`);
    } catch (error) {
      console.log(error);
      setErr(error);
    }
  };
  return (
    <>
      {userData && (
        <div>
          <h2>USERNAME: {userData.username}</h2>
          <h2>EMAIL: {userData.email}</h2>
          <h2>QUERY: {userData.query}</h2>
          <button onClick={handleResolve}>Resolve</button>
        </div>
      )}
      {err && err.message}
    </>
  );
}

export default ShowQuery;
