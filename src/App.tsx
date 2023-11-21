import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MainPage from "./Pages/MainPage";
export const fullDiv = {
  width: "100%",
  height: "100%",
  display: "flex",
};
export const fullCenterDiv = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
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
      <MainPage />
    </div>
  );
}

export default App;
