import React from "react";
import Typewriter from "typewriter-effect";
function Home() {
  return (
    <>
      <h1>HELLO</h1>
      <Typewriter
        options={{
          loop: true,
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString("Welcome to")
            .pauseFor(1000)
            .deleteAll()
            .typeString("LetsCode")
            .start();
        }}
      />
    </>
  );
}

export default Home;
