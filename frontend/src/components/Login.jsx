import axios from "axios";
import Button from "./Button";
import Input from "./Input";
import { useState } from "react";
import { useNavigate } from "react-router";
import LinkBtn from "./Header/LinkBtn";
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice";
import vct from "../assets/vector.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const success = () => {
    toast.success("Login Successful");
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleInput = async (e) => {
    e.preventDefault();
    try {
      if (!email || !name || !pass) {
        setErr("Every field is required!!");
        return;
      } else if (!emailRegex.test(email)) {
        setErr("Invalid email format");
        return;
      } else {
        setErr("");
        const response = await axios.post(
          "https://letscode-new-backend.onrender.com/login",
          {
            username: name,
            email: email,
            password: pass,
          },
        );
        if (response.status === 201) {
          success();
          localStorage.setItem("jwtToken", response.data.token);
          localStorage.setItem("isAdmin", response.data.isAdmin);
          localStorage.setItem("username", name);
          dispatch(login());

          navigate("/");
        }
        if (response.status === 404) {
          setErr("User not found");
          return;
        }
        if (response.status === 401) {
          setErr("Invalid credentials");
          return;
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) setErr("User not found");
      if (error.response.status === 401) return setErr("Invalid Credentials");
    }
  };
  return (
    <>
      <div className="bg-blue-500 grid grid-cols-2">
        <div className="max-h-screen bg-blue-400 flex justify-center items-center text-7xl">
          <img src={vct} />
        </div>
        <div className="flex justify-center items-center h-screen text-xl">
          <div className="bg-sky-500 text-black shadow-2xl shadow-black h-auto w-auto px-20 py-10 flex flex-col gap-3 rounded-2xl">
            {err && (
              <div className="text-red-900 text-center text-2xl">{err}</div>
            )}
            <Input
              label="Username"
              placeholder="Username"
              className="bg-white rounded-2xl"
              onChange={(e) => setName(e.currentTarget.value)}
              value={name}
            />
            <Input
              label="Email"
              placeholder="Email"
              className="bg-white rounded-2xl"
              onChange={(e) => setEmail(e.currentTarget.value)}
              value={email}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Password"
              className="bg-white rounded-2xl"
              onChange={(e) => setPass(e.currentTarget.value)}
              value={pass}
            />

            <Button
              children="Login"
              onClick={handleInput}
              className=" px-4 py-2 w-full rounded-2xl bg-lime-300 hover:bg-cyan-300 transition-all"
            />
            <p className="text-sm text-center">
              New User?{"  "}
              <LinkBtn
                to="/register"
                text=" Register"
                className="underline text-lime-300"
              />
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
