import database from "../database/database.js";

function Review() {
  const review = {};
  const db = database.collection("review_native");
  const db_user = database.collection("user_native");
  const db_book = database.collection("book_native");

  review.insert = async (req, res) => {
    try {
      // Validate the user data
      const { bookName, userName, rating, review} = req.body; // Get the user data

      // Check if the user exists in the database
      const bookNameExists = await db_book.findOne({bookName: bookName});
      const userNameExists = await db_user.findOne({userName: userName});
      if (!(bookNameExists)) {
        return res.status(409).send("Book not in database.");
      }
      if (!(userNameExists)) {
        return res.status(409).send("User not in database.");
      }

      if(rating > 5 || rating < 0){
        return res.status(409).send("Rating must be in rang 0 to 5.");
      }


      // Create an user object
      const result = await db.insertOne({
        bookName: bookName,
        userName: userName,
        rating: rating,
        review: review,
      })

      // Send the email verification link
      return res.status(201).json(result)
    } catch (err) {
      console.error(err);
      return res.status(400).send(err.message);
    }
  };

  review.getallbookreview = async (req, res) => {
    try {
      // Get book data
      const { bookName} = req.body;
  
      // Validate bookname data
      if (!(bookName)) {
        res.status(400).send("All data is required");
      }
  
      // Validate if book exist in our database
      const bookreview = await db.find({bookName: bookName});
  
      if (bookreview) {
        // book
        res.status(200).json(bookreview);
      }
      else res.status(400).send("No book found by given name.");
    } catch (err) {
      console.error(err);
      return res.status(400).send(err.message);
    }
  };

  review.getalluserreview = async (req, res) => {
    try {
      // Get book data
      const {userName} = req.body;
  
      // Validate bookname data
      if (!(userName)) {
        res.status(400).send("All data is required");
      }
  
      // Validate if book exist in our database
      var alluserreview = await db.find({userName: userName}).toArray();
      console.log(userName);
      console.log(alluserreview);
      if(alluserreview){
        res.status(200).json(alluserreview);
      }
      else res.status(400).send("No book found by given user name.");
    } catch (err) {
      console.error(err);
      return res.status(400).send(err.message);
    }
  };

  review.getuserbookreview = async (req, res) => {
    try {
      // Get book data
      const {bookName, userName} = req.body;
  
      // Validate bookname data
      if (!(userName) || !(bookName)) {
        res.status(400).send("All data is required");
      }
  
      // Validate if book exist in our database
      const bookreview = await db.findOne({userName: userName, bookName: bookName});
  
      if (bookreview) {
        // book
        res.status(200).json(bookreview);
      }
      else res.status(400).send("No book review found by given user for given book.");
    } catch (err) {
      console.error(err);
      return res.status(400).send(err.message);
    }
  };
  
  return review;
}


export default Review();