import React, { useState, useContext } from "react";
import { GoLock } from "react-icons/go/index.js";

import { Context } from "../context.js";
import Alert from "./Alert.js";
import Loader from "./Loader.js";
import AuthService from "../services/auth.service.js";

const LoginForm = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(Context);

  const [processing, setProcessing] = useState(false);
  const [alertState, setAlertState] = useState({
    show: false,
    color: "400",
    msg: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    AuthService.login({ emailOrUsername, password })
      .then((res) => {
        console.log(res);
        console.log(localStorage);
        console.log(JSON.stringify(res));
        localStorage.setItem("educativeUser", JSON.stringify(res));
        console.log(localStorage["educativeUser"]);
        dispatch({
          type: "LOGIN",
          payload: {
            user: res,
            token: res.token,
          },
        });
        setProcessing(false);
      })
      .catch((err) => {
        console.log(err);
        setProcessing(false);
        setAlertState({
          show: true,
          color: "700",
          msg: err.response.data || "Failed to process the data",
        });
      });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="flex justify-center">
        {alertState.show ? (
          <Alert color={alertState.color} msg={alertState.msg} />
        ) : null}
      </div>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-s'k'y-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <GoLock
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              aria-hidden="true"
            />
          </span>
          Login
        </button>
      </div>
      <div className="flex justify-center">
        {processing ? <Loader /> : null}
      </div>
    </form>
  );
};

export default LoginForm;
