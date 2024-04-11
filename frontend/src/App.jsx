import { Outlet } from "react-router";
import Header from "./components/Header/Header.jsx";

function App() {
  console.log(localStorage.getItem("username"));
  return (
    <>
      <Header username={localStorage.getItem("username")} />
      <Outlet />
    </>
  );
}

export default App;
