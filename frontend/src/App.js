/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Ranking />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/leaveareview"
          element={
            <RequireAuth>
              <LeaveaReview />
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
    </BrowserRouter>
  );
};

export default App;
