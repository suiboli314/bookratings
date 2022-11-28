import React from "react";
import PropTypes from "prop-types";

const Alert = ({ color, msg }) => {
  const [showAlert, setShowAlert] = React.useState(true);
  return (
    <>
      {showAlert ? (
        <div
          className={`text-black px-6 py-4 border-0 rounded relative mb-4 bg-pink-${color}`}
        >
          <span className="text-xl inline-block mr-5 align-middle">
            <i className="fas fa-bell" />
          </span>
          <span className="inline-block align-middle mr-8">{msg}</span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            onClick={() => setShowAlert(false)}
          >
            <span></span>
          </button>
        </div>
      ) : null}
    </>
  );
};

Alert.propTypes = {
  color: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
};

export default Alert;
