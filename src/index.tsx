import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MainPage from "./Pages/MainPage";
import AdminEmpleados from "./Pages/Empleados/AdminEmpleados";
import AdminClientes from "./Pages/Clientes/AdminClientes";
import AdminRubros from "./Pages/Rubros/AdminRubros";

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
   {
     path: "/AdminClientes",
     element: <AdminClientes />,
   },
   {
     path: "/AdminRubros",
     element: <AdminRubros />,
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
