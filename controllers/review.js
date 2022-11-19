import database from "../database/database.js";
import book from "./book.js";

function Review() {
  const review = {};
  const db_review = database.collection("review_native");
  const db_user = database.collection("user_native");
  const db_book = database.collection("book_native");

  review.insert = async (req, res) => {
    try {
      // Validate the user data
      const { bookName, userName, rating, review } = req.body; // Get the user data

      // Check if the user exists in the database
      const userNameExists = await db_user.findOne({ userName: userName });
      if (!userNameExists) {
        return res.status(409).send("User not in database.");
      }

      if (rating > 5 || rating < 0) {
        return res.status(409).send("Rating must be in range 0 to 5.");
      }

      // Create an user object
      const result = await db_review.insertOne({
        bookName: bookName,
        userName: userName,
        rating: rating,
        review: review,
      });

      // TODO: calculated and updated weighted rating value for the book just reated
      return res.status(201).json(result);
    } catch (err) {
      console.error(err);
      return res.status(400).send(err.message);
    }
  };

  /**
   * Given a book name, find all reviews of such a book
   * 
   * @param {*} req body has a field of bookName
   * @returns all reviews of a given book
   */
  review.getBookAllReview = async (req, res) => {
    try {
      // Get book data
      const { bookName } = req.body;

      // Validate bookname data
      if (!bookName) {
        return res.status(400).send("All data is required");
      }

      // Validate if book exist in our database
      const bookreview = await db_review.find({ bookName: bookName }).toArray();

      if (bookreview) {
        // book
        res.status(200).json(bookreview);
      } else res.status(400).send("No book found by given name.");
    } catch (err) {
      console.error(err);
      return res.status(400).send(err.message);
    }
  };

  review.getUserAllReview = async (req, res) => {
    try {
      // Get user data
      const { userName } = req.body;

      // Validate user data
      if (!userName) {
        return res.status(400).send("All data is required");
      }

      // Validate if user exist in our database
      var alluserreview = await db_review
        .find({ userName: userName })
        .toArray();
      console.log(userName);
      console.log(alluserreview);
      if (alluserreview) {
        res.status(200).json(alluserreview);
      } else res.status(400).send("No book found by given user name.");
    } catch (err) {
      console.error(err);
      return res.status(400).send(err.message);
    }
  };

  review.getuserbookreview = async (req, res) => {
    try {
      // Get book and user data
      const { bookName, userName } = req.body;

      // Validate bookname and user data
      if (!userName || !bookName) {
        return res.status(400).send("All data is required");
      }

      // Validate if book and user exist in our database
      const bookreview = await db_review.findOne({
        userName: userName,
        bookName: bookName,
      });

      if (bookreview) {
        // book
        res.status(200).json(bookreview);
      } else
        res
          .status(400)
          .send("No book review found by given user for given book.");
    } catch (err) {
      console.error(err);
      return res.status(400).send(err.message);
    }
  };

  return review;
}

export default Review();
