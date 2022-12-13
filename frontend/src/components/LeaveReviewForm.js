import { useState, useContext, useEffect, useRef } from "react";
import { Context } from "../context.js";
import Loader from "./Loader.js";
import Alert from "./Alert.js";
import ReviewService from "../services/review.service.js";

const LeaveReviewForm = () => {
  const [bookName, setbookName] = useState("");
  const [review, setReview] = useState("");
  const [userName, setuserName] = useState([]);
  const ratingOutRef = useRef(null);
  const ratingRef = useRef(null);

  const { state } = useContext(Context);
  useEffect(() => {
    setuserName(state.user.userName);
  }, [state.user.userName]);

  const [processing, setProcessing] = useState(false);
  const [alertHidden, setAlertHidden] = useState(true);
  const [alertState, setAlertState] = useState({
    color: "pink-400",
    msg: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    ReviewService.insertreview({
      bookName,
      userName,
      rating: ratingRef.current.value,
      review,
    })
      .then((res) => {
        setProcessing(false);
        setAlertHidden(false);
        setAlertState({
          color: "green-500",
          msg: "Successfully leave a review!",
        });
      })
      .catch((err) => {
        console.log(err.message);
        setProcessing(false);
        setAlertHidden(false);
        setAlertState({
          color: "pink-500",
          msg: err.message || "Failed to leave a review",
        });
      });
  };

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
          <label htmlFor="bookName" className="sr-only">
            bookName
          </label>
          <span className="block text-sm font-medium text-slate-700">
            Book Name
          </span>
          <input
            id="bookName"
            name="bookName"
            type="text"
            required
            className="rounded flex w-full px-3 py-2 my-1 mb-8 border-seperate border-spacing-y-1 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
            value={bookName}
            onChange={(e) => setbookName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="rating" className="sr-only">
            rating
          </label>
          <span className="block text-sm font-medium text-slate-700">
            Book Score (Please choose from 0 to 5)
          </span>
          <input
            id="rating"
            name="rating"
            type="range"
            className="form-range self-center"
            min="0"
            max="5"
            step="1"
            ref={ratingRef}
            required
            onChange={(evt) => {
              ratingOutRef.current.value = +evt.target.value;
            }}
          />
          <output
            ref={ratingOutRef}
            className="ml-5 self-center text-sm font-medium"
          >
            5
          </output>
        </div>
        <div>
          <label htmlFor="review" className="sr-only">
            Review
          </label>
          <span className="block text-sm font-medium text-slate-700">
            Your Thoughts:
          </span>
          <textarea
            aria-label="reviewContent"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="appearance-none rounded relative block w-full px-3 py-2 h-40 border-seperate border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
          ></textarea>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-700 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          Leave review
        </button>
      </div>
      <div className="flex justify-center">
        {processing ? <Loader /> : null}
      </div>
    </form>
  );
};

LeaveReviewForm.propTypes = {};

export default LeaveReviewForm;
