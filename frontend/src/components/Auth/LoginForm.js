import { useState, useContext, useRef } from "react";
import { GoLock } from "react-icons/go/index.js";

import { Context } from "../../context.js";
import Alert from "../Alert.js";
import Loader from "../Loader.js";
import AuthService from "../../services/auth.service.js";

const LoginForm = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { dispatch } = useContext(Context);

  const [processing, setProcessing] = useState(false);
  const [alertHidden, setAlertHidden] = useState(true);
  const [alertState, setAlertState] = useState({
    color: "pink-400",
    msg: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await AuthService.login({
        emailOrUsername: emailRef.current.value,
        password: passwordRef.current.value,
        dispatch,
      });
      setProcessing(false);
    } catch (err) {
      setProcessing(false);
      setAlertHidden(false);
      setAlertState({
        color: "pink-500",
        msg: err.message || "Something Wrong while Login",
      });
    }
  };

  const style = `appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm`;
  const upstyle = style + " rounded-t-md";
  const btstyle = style + " rounded-b-md";
  const btnstyle =
    "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-700 hover:bg-s'k'y-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500";

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="flex justify-center">
        {!alertHidden ? (
          <Alert
            color={alertState.color}
            msg={alertState.msg}
            alertHidden={alertHidden}
            setAlertHidden={setAlertHidden}
          />
        ) : null}
      </div>
      <div className="rounded-md shadow-sm -space-y-px">
        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <input
          id="email-address"
          name="email"
          type="email"
          autoComplete="email"
          required
          autoFocus
          className={upstyle}
          placeholder="Email address"
          ref={emailRef}
        />

        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={btstyle}
          placeholder="Password"
          ref={passwordRef}
        />
      </div>

      <button type="submit" className={btnstyle}>
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <GoLock
            className="h-5 w-5 group-hover:text-sky-200 stroke-current fill-current"
            aria-hidden="true"
          />
        </span>
        Login
      </button>

      <div className="flex justify-center">
        {processing ? <Loader /> : null}
      </div>
    </form>
  );
};

export default LoginForm;
