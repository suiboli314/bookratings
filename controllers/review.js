import database from "../database/database.js";
import book from "./book.js";

function Review() {
  const review = {};
  const COLLECTION_NAME_BOOK = "book_native";
  const COLLECTION_NAME_REVIEW = "review_native";
  const COLLECTION_NAME_USER = "user_native";

  review.insert = async (req, res) => {
    const { bookName, userName, rating, review } = req.body;

    if (rating > 5 || rating < 0)
      return res.status(409).send("Rating must be in range 0 to 5.");

    let client, db_user;
    try {
      [client, db_user] = await database.collection(COLLECTION_NAME_USER);

      // Check if the user exists in the database
      const userNameExists = await db_user.findOne({ userName: userName });
      if (!userNameExists) return res.status(409).send("User not in database.");
    } catch (err) {
      return res.status(400).send(err.message);
    } finally {
      await client.close();
    }

    let db_review;
    try {
      [client, db_review] = await database.collection(COLLECTION_NAME_REVIEW);

      const result = await db_review.insertOne({
        bookName: bookName,
        userName: userName,
        rating: rating,
        review: review,
      });

      // TODO: calculated and updated weighted rating value for the book just reated
      return res.status(201).json(result);
    } catch (err) {
      return res.status(400).send(err.message);
    } finally {
      await client.close();
    }
  };

  /**
   * Given a book name, find all reviews of such a book
   *
   * @param {*} req body has a field of bookName
   * @returns all reviews of a given book
   */
  review.getBookAllReview = async (req, res) => {
    const { bookName } = req.body;
    if (!bookName) return res.status(400).send("All data is required");

    let client, db_review;
    try {
      [client, db_review] = await database.collection(COLLECTION_NAME_REVIEW);
      const bookreview = await db_review.find({ bookName: bookName }).toArray();

      if (bookreview) return res.status(200).json(bookreview);
    } catch (err) {
      return res.status(400).send(err.message);
    } finally {
      await client.close();
    }

    return res.status(400).send("No book found by given name.");
  };

  review.getUserAllReview = async (req, res) => {
    const { userName } = req.body;
    if (!userName) return res.status(400).send("All data is required");

    let client, db_review;
    try {
      [client, db_review] = await database.collection(COLLECTION_NAME_REVIEW);

      // Validate if user exist in our database
      var alluserreview = await db_review
        .find({ userName: userName })
        .toArray();

      if (alluserreview) return res.status(200).json(alluserreview);
    } catch (err) {
      return res.status(400).send(err.message);
    } finally {
      await client.close();
    }
    return res.status(400).send("No book found by given user name.");
  };

  review.getuserbookreview = async (req, res) => {
    const { bookName, userName } = req.body;

    if (!userName || !bookName)
      return res.status(400).send("All data is required");

    let client, db_review;
    try {
      [client, db_review] = await database.collection(COLLECTION_NAME_REVIEW);

      // Validate if book and user exist in our database
      const bookreview = await db_review.findOne({
        userName: userName,
        bookName: bookName,
      });

      if (bookreview) return res.status(200).json(bookreview);
    } catch (err) {
      return res.status(400).send(err.message);
    } finally {
      await client.close();
    }

    return res
      .status(400)
      .send("No book review found by given user for given book.");
  };

  return review;
}

export default Review();
