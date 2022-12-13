import PropTypes from "prop-types";
import { GrFormClose } from "react-icons/gr/index.js";

const Alert = ({ color, msg, alertHidden, setAlertHidden }) => {
  return (
    <>
      {!alertHidden ? (
        <div
          className={`text-black dark:text-blue bg-${color} px-6 py-4 border-0 rounded relative mb-4 `}
        >
          <span className="text-xl inline-block mr-5 align-middle">
            <i className="fas fa-bell" />
          </span>
          <span className="inline-block align-middle mr-8">{msg}</span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            onClick={() => {
              setAlertHidden(true);
            }}
          >
            <GrFormClose />
          </button>
        </div>
      ) : null}
    </>
  );
};

Alert.propTypes = {
  color: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  alertHidden: PropTypes.bool.isRequired,
  setAlertHidden:PropTypes.func.isRequired,
};

export default Alert;
