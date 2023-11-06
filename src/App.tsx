import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./Pages/Login";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <Login />
    </div>
  );
}

export default App;
