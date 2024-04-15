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
import ShowQuery from "./components/ShowQuery";
import DisplayQuestions from "./components/DisplayQuestions.jsx";
import AcceptQuestion from "./components/AcceptQuestion.jsx";
import RejectQuestion from "./components/RejectQuestion.jsx";
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
        path: "/:username/admin/addQues",
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
        path: "/:username/admin/displayQueries",
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
      {
        path: "/:queryId/show-query",
        element: <ShowQuery />,
      },
      {
        path: "/:username/admin/displayQuestions",
        element: <DisplayQuestions />,
      },
      {
        path: "/:username/:qId/accept",
        element: <AcceptQuestion />,
      },
      {
        path: "/:username/:qId/reject",
        element: <RejectQuestion />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
