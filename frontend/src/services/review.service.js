import axios from "axios"; // HTTP Client

// const API_URL = "http://0.0.0.0:4000"; // The API endpoint to communicate with the server

/**
 * Handles the signup HTTP request to add a new user to the database
 * The data needed for each user is First Name, Last Name, Username, Email, and Password
 */
const insertreview = ({ bookName, userName, rating, review }) => {
  return axios.post(`/api/insertreview`, {
    bookName,
    userName,
    rating,
    review,
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
