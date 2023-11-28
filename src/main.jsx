import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./About.jsx";
import App from "./App.jsx";
import "./index.css";
import MapMini from "./MapMini.jsx";
import AuthMiddleware from "../middleware/AuthMiddleware.jsx";
import Signin from "./Signin.jsx";
import Signup from "./Signup.jsx";
import Profile from "./Profile.jsx";
import CreateArticle from "./CreateArticle.jsx";
import Articles from "./Articles.jsx";
import Article from "./Article.jsx";
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
  ,
  {
    path: "/signin",
    element: (
      <AuthMiddleware>
        <Signin />
      </AuthMiddleware>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthMiddleware>
        <Signup />
      </AuthMiddleware>
    ),
  },
  {
    path: "/profile",
    element: (
      <AuthMiddleware>
        <Profile />
      </AuthMiddleware>
    ),
  },
  {
    path: "/create/article",
    element: (
      <AuthMiddleware>
        <CreateArticle />
      </AuthMiddleware>
    ),
  },
  {
    path: "/articles",
    element: <Articles />,
  },
  {
    path: "/articles/:id",
    element: <Article />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Suspense fallback={<div>Loading...</div>}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.Suspense>
);
