/**
 * Handles the signup HTTP request to add a new user to the database
 * The data needed for each user is First Name, Last Name, Username, Email, and Password
 */
const insertreview = async ({ bookName, userName, rating, review }) => {
  return await fetch(`/api/insertreview`, {
    method: "post",
    body: {
      bookName,
      userName,
      rating,
      review,
    },
  });
};

const deletereview = ({ bookName, userName }) => {
  return axios.delete(`/api/deleteuserbookreview`, {
    bookName,
    userName,
  });
};

const ReviewService = {
  insertreview,
  deletereview,
};

export default ReviewService;
