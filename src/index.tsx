import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import MainPage from "./Pages/MainPage";
import AdminEmpleados from "./Pages/Empleados/AdminEmpleados";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/MainPage",
    element: <MainPage />,
  },
  {
    path: "/AdminEmpleados",
    element: <AdminEmpleados />,
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
