import PropTypes from "prop-types";
import { useState } from "react";
import { GoAlert } from "react-icons/go/index.js";
import { GrFormClose } from "react-icons/gr/index.js";

export default function Modal({ action, actionName, customStyle, children }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <button className={customStyle} type="button" onClick={handleOpen}>
        {children}
      </button>
      <div
        tabIndex="-1"
        className="mx-auto sm:w-2/4 md:w-2/4 fixed inset-x-0 top-10 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
        aria-hidden={!open} // hidden by default or not
        hidden={!open}
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-white rounded-lg shadow">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-sky-700 bg-transparent hover:bg-sky-200 hover:text-sky-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-sky-800 dark:hover:text-white"
              onClick={handleOpen}
            >
              <GrFormClose className="stroke-current fill-current" />
              <span className="sr-only">Close pop up window</span>
            </button>
            <div className="p-6 text-center">
              <GoAlert className="stroke-current fill-current" />
              <h3 className="mb-5 text-lg font-normal text-sky-800">
                Are you sure you want to {actionName}?
              </h3>
              <button
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={() => {
                  action();
                  handleOpen();
                }}
              >
                {actionName}
              </button>
              <button
                type="button"
                className="text-sky-800 bg-white hover:bg-sky-100 focus:ring-4 focus:outline-none focus:ring-sky-200 rounded-lg border border-sky-200 text-sm font-medium px-5 py-2.5 hover:text-sky-900 focus:z-10"
                onClick={handleOpen}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {
  // https://stackoverflow.com/questions/42122522/reactjs-what-should-the-proptypes-be-for-this-props-children
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  action: PropTypes.func.isRequired,
  actionName: PropTypes.string.isRequired,
  customStyle: PropTypes.string,
  hidden: PropTypes.string,
};
