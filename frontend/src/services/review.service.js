/**
 * Handles the signup HTTP request to add a new user to the database
 * The data needed for each user is First Name, Last Name, Username, Email, and Password
 */
const insertreview = async ({ bookName, userName, rating, review }) => {
  return await fetch(`/api/insertreview`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bookName: bookName,
      userName: userName,
      rating: rating,
      review: review,
    }),
  });
};

const deletereview = async ({ bookName, userName }) => {
  await fetch(`/api/deleteuserbookreview`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bookName: bookName,
      userName: userName,
    }),
  });
};

const ReviewService = {
  insertreview,
  deletereview,
};

export default ReviewService;
