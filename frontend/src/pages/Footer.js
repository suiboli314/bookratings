import React from "react";
// import PropTypes from "prop-types";

function Footer() {
  return (
    <div>
      <div className="fixed bottom-0 left-0 z-20 p-4 w-full bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
        <div className="items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          Made by Chen & Qishu with 😼
        </div>
      </div>
    </div>
  );
}

Footer.propTypes = {};

export default Footer;
