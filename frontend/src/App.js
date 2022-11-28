/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from "react";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Context } from "./context.js";
import Signup from "./pages/Signup.js";
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import Ranking from "./pages/Ranking.js";
import LeaveaReview from "./pages/LeaveReview.js";

const RequireAuth = ({ children }) => {
  const { state } = useContext(Context);
  return state.auth ? children : <Navigate to="/login" replace />;
};

const OnlyNotAuth = ({ children }) => {
  const { state } = useContext(Context);
  return !state.auth ? children : <Navigate to="/home" replace />;
};

const App = () => {
  localStorage.clear();
  const { dispatch } = useContext(Context);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("educativeUser"));
    if (user)
      dispatch({
        type: "LOGIN",
        payload: {
          user: user,
          token: user?.token,
        },
      });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Ranking />,
    },
    {
      path: "/home",
      element: (
        <RequireAuth>
          <Home />
        </RequireAuth>
      ),
    },
    {
      path: "/signup",
      element: (
        <OnlyNotAuth>
          <Signup />
        </OnlyNotAuth>
      ),
    },
    {
      path: "/login",
      element: (
        <OnlyNotAuth>
          <Login />
        </OnlyNotAuth>
      ),
    },
    {
      path: "/leaveareview",
      element: (
        <RequireAuth>
          <LeaveaReview />
        </RequireAuth>
      ),
    },
    {
      path: "/ranking",
      element: (
        <RequireAuth>
          <Ranking />
        </RequireAuth>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
