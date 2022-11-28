import React, { useContext } from "react";
import { Context } from "../context.js";
import UserComment from "../components/UserComment.js";
import BasePage from "./BasePage.js";

const Home = () => {
  const { state } = useContext(Context);
  return (
    <>
      <BasePage>
        <section className="py-24 2xl:py-44 bg-blueGray-100 rounded-t-10xl overflow-hidden">
          <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {`Welcome,  ${state.user.firstName}!`}
              </h2>
            </div>
          </div>
          <UserComment />
        </section>
      </BasePage>
    </>
  );
};

Home.propTypes = {};

export default Home;
