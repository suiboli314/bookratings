/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from "./context.js";
import Navbar from "./components/Navbar.js";
import Signup from "./pages/Signup.js";
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";

const RequireAuth = ({ children }) => {
  const { state } = useContext(Context);
  return state.auth ? children : <Navigate to="/login" replace />;
};

const OnlyNotAuth = ({ children }) => {
  const { state } = useContext(Context);
  return !state.auth ? children : <Navigate to="/" replace />;
};

const App = () => {
  localStorage.clear()
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
  return (
    <>
      <Navbar auth={false} />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        <Route
          path="/signup"
          element={
            <OnlyNotAuth>
              <Signup />
            </OnlyNotAuth>
          }
        />
        <Route
          path="/login"
          element={
            <OnlyNotAuth>
              <Login />
            </OnlyNotAuth>
          }
        />
      </Routes>
    </>
  );
};

export default App;
