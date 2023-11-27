import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./About.jsx";
import App from "./App.jsx";
import "./index.css";
import MapMini from "./MapMini.jsx";
import.meta.env;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <About />,
  },

  {
    path: "/mapMini",
    element: <MapMini />,
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Suspense fallback={<div>Loading...</div>}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.Suspense>
);
