import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import AddQues from "./components/AddQues.jsx";
import Contribute from "./components/Contribute.jsx";
import AddQuery from "./components/AddQuery.jsx";
import DisplayQueries from "./components/DisplayQueries.jsx";
import ForgotPass from "./components/ForgotPass.jsx";
import Solve from "./components/Solve.jsx";
import Questions from "./components/Questions.jsx";
import Home from "./components/Home.jsx";
import Admin from "./components/Admin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/:username/addQues",
        element: <AddQues />,
      },
      {
        path: "/:username/contribute",
        element: <Contribute />,
      },
      {
        path: "/:username/query",
        element: <AddQuery />,
      },
      {
        path: "/:username/displayQueries",
        element: <DisplayQueries />,
      },
      {
        path: "/forgot-pass",
        element: <ForgotPass />,
      },
      {
        path: "/:questionname/:username/solve",
        element: <Solve />,
      },
      {
        path: "/Questions",
        element: <Questions />,
      },
      {
        path: "/:username/admin",
        element: <Admin />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
