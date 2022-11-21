import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context.js";
import Loader from "./Loader.js";
import Alert from "./Alert.js";
import ReviewService from "../services/review.service.js";

const LeaveReviewForm = () => {
  const [bookName, setbookName] = useState("");
  const [review, setReview] = useState("");
  const [userName, setuserName] = useState([]);
  const [rating, setRating] = useState(0);

  const { state } = useContext(Context);
  useEffect(() => {
    setuserName(state.user.userName);
  }, []);

  const [processing, setProcessing] = useState(false);
  const [alertState, setAlertState] = useState({
    show: false,
    color: "green",
    msg: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    ReviewService.insertreview({ bookName, userName, rating, review })
      .then((res) => {
        console.log(res);
        setProcessing(false);
        setAlertState({
          show: true,
          color: "green",
          msg: "Successfully leave a review!",
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        setProcessing(false);
        setAlertState({
          show: true,
          color: "red",
          msg: err.response.data || "Failed to leave a review",
        });
      });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="flex justify-center">
        {alertState.show ? (
          <Alert color={alertState.color} msg={alertState.msg} />
        ) : null}
      </div>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="bookName" className="sr-only">
            bookName
          </label>
          <input
            id="bookName"
            name="bookName"
            type="text"
            autoComplete="bookName"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
            placeholder="book Name"
            value={bookName}
            onChange={(e) => setbookName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="rating" className="sr-only">
            rating
          </label>
          <input
            id="rating"
            name="rating"
            type="number"
            autoComplete="rating"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
            placeholder="Last Name"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="review" className="sr-only">
            Review
          </label>
          <input
            id="review"
            name="review"
            type="text"
            autoComplete="review"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
            placeholder="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-sky-500 group-hover:text-sky-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          Leave review
        </button>
      </div>
      <div className="flex justify-center">
        {processing ? <Loader /> : null}
      </div>
    </form>
  );
};

export default LeaveReviewForm;
