/**
 * Handles the signup HTTP request to add a new user to the database
 * The data needed for each user is First Name, Last Name, Username, Email, and Password
 */
const insertreview = async ({ bookName, userName, rating, review }) => {
  const res = await fetch(`/api/insertreview`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bookName: bookName,
      userName: userName,
      rating: rating,
      review: review,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
};

const deletereview = async ({ bookName, userName }) => {
  const res = await fetch(`/api/deleteuserbookreview`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bookName: bookName,
      userName: userName,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
};

const getreview = async ({ bookName, userName }) => {
  const res = await fetch(`/api/getuserbookreview`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bookName: bookName,
      userName: userName,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
};

const revisereview = async ({ bookName, userName, rating, review }) => {
  const res = await fetch(`/api/reviseuserbookreview`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bookName: bookName,
      userName: userName,
      rating: rating,
      review: review,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
};

const ReviewService = {
  insertreview,
  deletereview,
  getreview,
  revisereview,
};

export default ReviewService;
