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
import link from "../assets/link.json";

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
        const response = await axios.post(`${link.url}/login`, {
          username: name,
          email: email,
          password: pass,
        });
        if (response.status === 201) {
          success();
          localStorage.setItem("jwtToken", response.data.token);
          localStorage.setItem("isAdmin", response.data.isAdmin);
          localStorage.setItem("username", name);
          dispatch(login());
          navigate("/");
        } else if (response.status === 404) {
          setErr("User not found");
        } else if (response.status === 401) {
          setErr("Invalid credentials");
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) setErr("User not found");
        if (error.response.status === 401) setErr("Invalid credentials");
      } else {
        setErr("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <div className="bg-blue-500 grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="bg-blue-400 flex justify-center items-center text-7xl p-5">
          <img src={vct} alt="Vector illustration" className="w-full max-w-xs md:max-w-sm" />
        </div>
        <div className="flex justify-center items-center p-5">
          <div className="bg-sky-500 text-black shadow-2xl shadow-black p-8 flex flex-col gap-5 rounded-2xl w-full max-w-md">
            {err && <div className="text-red-900 text-center text-lg">{err}</div>}
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
              className="px-4 py-2 w-full rounded-2xl bg-lime-300 hover:bg-cyan-300 transition-all"
            />
            <p className="text-sm text-center">
              New User?{" "}
              <LinkBtn
                to="/register"
                text="Register"
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
