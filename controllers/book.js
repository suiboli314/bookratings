import database from "../database/database.js";

function Book() {
  const COLLECTION_NAME = "book_native";
  const book = {};
  const connect = () => database.collection(COLLECTION_NAME);

  book.insert = async (req, res) => {
    let client, db;
    try {
      [client, db] = await connect();
      // Validate the user data
      const { bookName, ISBN, authors, publishYear } = req.body; // Get the user data

      // Check if the user exists in the database
      const ISBNExists = await db.findOne({ ISBN: ISBN });
    } catch (err) {
      console.error(err);
      return res.status(400).send(err.message);
    } finally {
      await client.close();
    }
    if (ISBNExists) return res.status(409).send("Book already exist.");

    // Send the email verification link
    return res.status(201).json(book);
  };

  book.get = async (req, res) => {
    let client, db, book;
    try {
      [client, db] = await connect();
      // Get book data
      const { bookName } = req.body;

      // Validate bookname data
      if (!bookName) {
        return res.status(400).send("bookName is required");
      }

      // Validate if book exist in our database
      book = await db.findOne({ bookName: bookName });
    } catch (err) {
      console.error(err);
      return res.status(400).send(err.message);
    } finally {
      await client.close();
    }

    if (book) return res.status(200).json(book);
    else return res.status(400).send("No book found by given name.");
  };

  book.getAllBooks = async (req, res) => {
    const query = {
      bookName: { $exists: true },
      rating: { $exists: true, $gt: 4.0 },
    };
    // sort by rating in descending order, limit to only 100
    const options = { sort: { rating: -1 }, limit: 100 };

    let client, db, books;
    try {
      [client, db] = await connect();
      books = await db.find(query, options).toArray();
    } catch (err) {
      console.error(err);
      return res.status(400).send(err.message);
    } finally {
      await client.close();
    }

    if (books) return res.status(200).json(books);
    else return res.status(444).send("No book fetched from database.");
  };

  return book;
}

export default Book();
