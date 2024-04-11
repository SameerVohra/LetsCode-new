import axios from "axios";
import Button from "./Button";
import Input from "./Input";
import { useState } from "react";
import { useNavigate } from "react-router";
import LinkBtn from "./Header/LinkBtn";

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
      <div className="flex justify-center items-center h-screen">
        {err}
        <div className="bg-black h-fit w-fit px-10 py-5 flex flex-wrap justify-center items-center flex-col gap-2">
          <h2 className="text-white">Register</h2>
          <p className="text-white text-xl">USERNAME</p>
          <Input
            placeholder="Username"
            className="bg-white"
            onChange={(e) => setName(e.currentTarget.value)}
            value={name}
          />
          <p className="text-white text-xl">Email</p>
          <Input
            placeholder="Email"
            className="bg-white"
            onChange={(e) => setEmail(e.currentTarget.value)}
            value={email}
          />
          <p className="text-white text-xl">Password</p>
          <Input
            type="password"
            placeholder="Password"
            className="bg-white"
            onChange={(e) => setPass(e.currentTarget.value)}
            value={pass}
          />
          <p className="text-sm text-white">
            Existing User?{" "}
            <LinkBtn
              to="/login"
              text="Login"
              className="text-sm text-white underline"
            />
          </p>
          <Button
            children="Register"
            className="text-white border-2 border-white"
            onClick={handleInput}
          />
        </div>
      </div>
    </>
  );
}

export default Register;
