import { fullDiv } from "../App";

import Barra from "./Barra";

const MainPage = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateRows: "50px auto 100px",
      }}
    >
      <Barra />
      <div style={{ ...fullDiv, backgroundColor: "blue" }}></div>
      <div style={{ ...fullDiv, backgroundColor: "green" }}></div>
    </div>
  );
};
export default MainPage;
