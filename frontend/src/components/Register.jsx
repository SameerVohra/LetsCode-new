import axios from "axios";
import Button from "./Button";
import Input from "./Input";
import { useState } from "react";
import { useNavigate } from "react-router";
import LinkBtn from "./Header/LinkBtn";
import vct from "../assets/vector.png";
import link from "../assets/link.json";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
  const handleInput = async (e) => {
    e.preventDefault();
    try {
      if (!email || !name || !pass) {
        setErr("Every field is required!!");
        return;
      } else if (!emailRegex.test(email)) {
        setErr("Invalid email format");
        return;
      } else if (!passRegex.test(pass)) {
        setErr("Password Not Valid");
        return;
      } else {
        setErr("");
        const response = await axios.post(`${link.url}/register`, {
          username: name,
          email: email,
          password: pass,
        });
        if (response.status == 201) {
          navigate("/login");
        }
        if (response.status == 403) {
          setErr("User Already Exists");
          return;
        }
        if (response.status == 403) {
          setErr("Password Length should be atleast 8");
          return;
        }
      }
    } catch (error) {
      setErr("An error occured while registering the user");
    }
  };
  return (
    <>
      <div className="bg-blue-500 grid grid-cols-2">
        <div className="flex justify-center items-center h-screen text-xl">
          <div className="bg-sky-500 text-black shadow-2xl shadow-black h-auto w-fit px-20 py-10 flex flex-col gap-3 rounded-2xl">
            {err && (
              <div className="text-red-900 text-center text-sm w-full">
                {err}
              </div>
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
              children="Register"
              onClick={handleInput}
              className=" px-4 py-2 w-full rounded-2xl bg-lime-300 hover:bg-cyan-300 transition-all"
            />
            <p className="text-sm text-center">
              Existing User?{" "}
              <LinkBtn
                to="/login"
                text="Login"
                className="underline text-lime-300"
              />
            </p>
          </div>
        </div>
        <div className="max-h-screen bg-blue-400 flex justify-center items-center text-7xl">
          <img src={vct} />
        </div>
      </div>
    </>
  );
}

export default Register;
