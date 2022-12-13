import { useRef, useState } from "react";
import { GoLock } from "react-icons/go/index.js";

import Loader from "../Loader.js";
import Alert from "../Alert.js";
import AuthService from "../../services/auth.service.js";

const SignupForm = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [processing, setProcessing] = useState(false);
  const [alertHidden, setAlertHidden] = useState(true);
  const [alertState, setAlertState] = useState({
    color: "green-500",
    msg: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      await AuthService.signup({
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        userName: userNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      setProcessing(false);
      setAlertHidden(false);
      setAlertState({
        color: "green-500",
        msg: "Successfully created account, please login.",
      });
    } catch (err) {
      setProcessing(false);
      setAlertHidden(false);
      setAlertState({
        color: "pink-500",
        msg: err.message || "Failed to create the account",
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
      <div className="rounded-md shadow-sm space-y-px">
        <div>
          <label htmlFor="firstName" className="sr-only">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            className={upstyle}
            placeholder="First Name"
            ref={firstNameRef}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="sr-only">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            className={style}
            placeholder="Last Name"
            ref={lastNameRef}
          />
        </div>
        <div>
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            className={style}
            placeholder="Username"
            ref={userNameRef}
          />
        </div>
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
            className={style}
            placeholder="Email address"
            ref={emailRef}
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
            className={btstyle}
            placeholder="Password"
            ref={passwordRef}
          />
        </div>
      </div>

      <div>
        <button type="submit" className={btnstyle}>
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <GoLock
              className="h-5 w-5 group-hover:text-sky-200 stroke-current fill-current"
              aria-hidden="true"
            />
          </span>
          Sign Up
        </button>
      </div>
      <div className="flex justify-center">
        {processing ? <Loader /> : null}
      </div>
    </form>
  );
};
SignupForm.propTypes = {};

export default SignupForm;
