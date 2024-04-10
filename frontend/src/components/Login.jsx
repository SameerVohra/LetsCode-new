import Button from "./Button";
import Input from "./Input";
import React, { useState } from "react";
function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    console.log(`${name}\n${email}\n${pass}`);
    setName("");
    setEmail("");
    setPass("");
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-black h-fit w-fit px-10 py-5 flex flex-wrap justify-center items-center flex-col gap-2">
          <h2 className="text-white">LOGIN</h2>
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
          <Button
            children="Login"
            className="text-white border-2 border-white"
            onClick={handleInput}
          />
        </div>
      </div>
    </>
  );
}

export default Login;
