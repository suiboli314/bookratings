import database from "../database/database.js";

function Book() {
  const book = {};
  const db = database.collection("book_native");

  book.insert = async (req, res) => {
    try {
      // Validate the user data
      const { bookName, ISBN, authors, publishYear } = req.body; // Get the user data

      // Check if the user exists in the database
      const ISBNExists = await db.findOne({ ISBN: ISBN });
      if (ISBNExists) {
        return res.status(409).send("Book already exist.");
      }

      // Create an user object
      const result = db.insertOne({
        bookName: bookName,
        ISBN: ISBN,
        authors: authors,
        publishYear: publishYear,
      });

      // Send the email verification link
      return res.status(201).json(book);
    } catch (err) {
      console.error(err);
      return res.status(400).send(err.message);
    }
  };

  book.get = async (req, res) => {
    try {
      // Get book data
      const { bookName } = req.body;

      // Validate bookname data
      if (!bookName) {
        return res.status(400).send("bookName is required");
      }

      // Validate if book exist in our database
      const book = await db.findOne({ bookName: bookName });

      if (book) {
        // book
        res.status(200).json(book);
      } else res.status(400).send("No book found by given name.");
    } catch (err) {
      console.error(err);
      return res.status(400).send(err.message);
    }
  };

  book.getAllBooks = async (req, res) => {
    const query = {
      bookName: { $exists: true },
      rating: { $exists: true, $gt: 8.0 },
    };
    // sort by rating in descending order, limit to only 100
    const options = { sort: { rating: -1 }, limit: 100 };
    let books;
    try {
      books = await db.find(query, options).toArray();
    } catch (err) {
      console.error(err);
      return res.status(400).send(err.message);
    }

    if (books) res.status(200).json(books);
    else res.status(444).send("No book fetched from database.");
  };

  return book;
}

export default Book();
