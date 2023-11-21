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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminManufacturado from "./Pages/Manufacturados/AdminManufacturados";
import Login from "./Pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/Login",
    element: <Login />,
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
   },{
    path: "/AdminManufacturados",
    element: <AdminManufacturado />,
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}  /></QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
