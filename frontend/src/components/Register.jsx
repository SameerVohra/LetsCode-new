import axios from "axios";
import Button from "./Button";
import Input from "./Input";
import { useState } from "react";
import { useNavigate } from "react-router";
import LinkBtn from "./Header/LinkBtn";
import vct from "../assets/vector.png";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const handleInput = async (e) => {
    e.preventDefault();
    try {
      if (!email || !name || !pass) {
        setErr("Every field is required!!");
        return;
      } else {
        setErr("");
        const response = await axios.post("http://localhost:3000/register", {
          username: name,
          email: email,
          password: pass,
        });
        if (response.status == 201) {
          navigate("/login");
        }
        if (response.status == 400) {
          setErr("User Already Exists");
          return;
        }
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };
  return (
    <>
      <div className="bg-blue-500 grid grid-cols-2">
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
