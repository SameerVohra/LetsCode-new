import { Outlet } from "react-router";
import Header from "./components/Header/Header.jsx";

function App() {
  console.log(localStorage.getItem("username"));
  console.log(localStorage.getItem("isAdmin"));
  return (
    <>
      <Header
        username={localStorage.getItem("username")}
        isAdmin={localStorage.getItem("isAdmin")}
      />
      <Outlet />
    </>
  );
}

export default App;
