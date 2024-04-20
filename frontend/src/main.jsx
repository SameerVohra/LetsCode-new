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
import DisplayUsers from "./components/DisplayUsers.jsx";
import UserInfo from "./components/UserInfo.jsx";
import CodeEditor from "./components/CodeEditor/CodeEditor.jsx";
import { Provider } from "react-redux";
import store from "./Store/store.js";
import Profile from "./components/Profile.jsx";
const router = createBrowserRouter([
  {
    path: "/api",
    element: <App />,
    children: [
      {
        path: "/api",
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
      {
        path: ":username/admin/displayUsers",
        element: <DisplayUsers />,
      },
      {
        path: "admin/:username/userInfo",
        element: <UserInfo />,
      },
      {
        path: ":qId/:username/code",
        element: <CodeEditor />,
      },
      {
        path: "profile/:username",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
