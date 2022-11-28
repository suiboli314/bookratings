import React from "react";
import ResetForm from "../components/Auth/ResetForm.js";
import logo from "../assets/logo.png";
import BasePage from "./BasePage.js";

const Login = () => {
  return (
    <>
      <BasePage>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img className="mx-auto h-12 w-auto" src={logo} alt="Logo" />
              <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Reset Your Password
              </h1>
            </div>
            <ResetForm />
          </div>
        </div>
      </BasePage>
    </>
  );
};

export default Login;