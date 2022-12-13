import { useState } from "react";
import PropTypes from "prop-types";

import { BiTrashAlt } from "react-icons/bi/index.js";

import ReviewService from "../services/review.service.js";
import Alert from "./Alert.js";

export default function ListItem({ book, userName, setTime }) {
  const [alertHidden, setAlertHidden] = useState(true);
  const [alertState, setAlertState] = useState({
    color: "green-500",
    msg: "",
  });

  const deletereview = (bookName, userName) => {
    ReviewService.deletereview({ bookName, userName })
      .then((res) => {
        setTime(new Date());
        setAlertHidden(false);
        setAlertState({
          color: "green-500",
          msg: "Successfully delete a review!",
        });
      })
      .catch((err) => {
        console.log(err.message);
        setAlertHidden(false);
        setAlertState({
          color: "pink-500",
          msg: err.message || "Failed to leave a review",
        });
      });
  };

  const star = (num) => {
    return (
      <svg
        aria-hidden="true"
        className="w-5 h-5 text-yellow-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        key={num.toString()}
      >
        <title>the {num} star</title>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    );
  };

  const getStars = (rating) => {
    let stars = [];
    for (let i = 0; i < rating; i++) stars.push(star(i));

    return stars;
  };

  return (
    <article>
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
      <div className="relative m-9 mb-8 pb-3 border rounded-lg border-b-2 border-sky-600 dark:bg-slate-800">
        <div className="flex items-center mb-4 space-x-4"></div>
        <div className="ml-4 flex items-center mb-1">
          <h1 className="ml-4 text-sm font-semibold text-gray-900 dark:text-white">
            {book.bookName}
          </h1>
          {getStars(book.rating)}

          <button
            aria-label="delete"
            className="flex pl-2 dark:text-white"
            onClick={() => {
              deletereview(book.bookName, userName);
            }}
          >
            <BiTrashAlt />
          </button>
        </div>
        <p className="ml-10 font-light text-gray-500 dark:text-white">
          {book.review}
        </p>
      </div>
    </article>
  );
}

ListItem.propTypes = {
  book: PropTypes.object.isRequired,
  userName: PropTypes.string.isRequired,
  setTime: PropTypes.func,
};
