import { useState, useContext } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

import {
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineRead,
  AiOutlineLogout,
  AiOutlineUserDelete,
} from "react-icons/ai/index.js";
import { BiReset, BiUserCircle } from "react-icons/bi/index.js";
import { FiEdit } from "react-icons/fi/index.js";

import { MdMenuOpen, MdClose } from "react-icons/md/index.js";
import { Context } from "../context.js";
import AuthService from "../services/auth.service.js";
import Modal from "./ModalPopUp.js";

const Actions = ({ auth, customStyle, state, dispatch }) => {
  return (
    <>
      {auth ? (
        <div className="flex content-center">
          <Link to="/home" className={customStyle}>
            <span className="flex space-x-1">
              <div className="self-center">
                <BiUserCircle />
              </div>
              <div>{state.user.userName}'s Home</div>
            </span>
          </Link>
          <Link to="/leaveareview" className={customStyle}>
            <span className="flex space-x-1">
              <div className="self-center">
                <FiEdit />
              </div>
              <div>Leave Review</div>
            </span>
          </Link>
          <Link to="/resetPass" className={customStyle}>
            <span className="flex space-x-1">
              <div className="self-center">
                <BiReset />
              </div>
              <div>Reset Password</div>
            </span>
          </Link>
          <Modal
            customStyle={customStyle}
            data-modal-toggle="popup-modal"
            action={async () =>
              await AuthService.deleteUser({ state, dispatch })
            }
            actionName="Delete User"
          >
            <div className="flex space-x-1">
              <div className="self-center">
                <AiOutlineUserDelete />
              </div>
              <div>Delete User</div>
            </div>
          </Modal>
          <button
            className={customStyle}
            onClick={() => AuthService.logout({ dispatch })}
          >
            <div className="flex space-x-1">
              <div className="flex space-x-1">
                <div className="self-center">
                  <AiOutlineLogout />
                </div>
                <div>Log Out</div>
              </div>
            </div>
          </button>
        </div>
      ) : (
        <div className="flex content-center">
          <Link to="/login" className={customStyle}>
            <div className="flex space-x-1">
              <div className="self-center">
                <AiOutlineLogin />
              </div>
              <div>Login</div>
            </div>
          </Link>
          <Link to="/signup" className={customStyle}>
            <div className="flex space-x-1">
              <div className="self-center">
                <AiOutlineUserAdd />
              </div>
              <div>Sign Up</div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

const Navbar = () => {
  const { state, dispatch } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  const mainstyle =
    "hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium";

  const sidstyle =
    "hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium";

  const mobileStyle =
    "bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white";

  return (
    <>
      <nav className="bg-sky-900 fixed w-full z-20 top-0 left-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link to="/" className={mainstyle}>
                    <div className="flex space-x-1">
                      <div className="self-center">
                        <AiOutlineRead />
                      </div>
                      <div>Browsing</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <Actions
                auth={state.auth}
                customStyle={sidstyle}
                state={state}
                dispatch={dispatch}
              />
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className={mobileStyle}
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? <MdMenuOpen /> : <MdClose />}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link to="/" className={mainstyle}>
                  Ranking
                </Link>
                <Actions
                  auth={state.auth}
                  state={state}
                  dispatch={dispatch}
                  customStyle={mainstyle}
                />
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </>
  );
};

Navbar.propTypes = {};

export default Navbar;
