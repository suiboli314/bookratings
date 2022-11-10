import database from "../database/database.js";

function Book() {
  const book = {};
  const db = database.collection("book_native");

  book.insert = async (req, res) => {
    try {
      // Validate the user data
      const { bookName, ISBN, Author_firstname, Author_lastname} = req.body; // Get the user data

      // Check if the user exists in the database
      const ISBNExists = await db.findOne({ISBN: ISBN});
      if (ISBNExists) {
        return res.status(409).send("Book already exist.");
      }

      // Create an user object
      const result = db.insertOne({
        bookName:bookName,
        ISBN:ISBN,
        Author_firstname: Author_firstname,
        Author_lastname: Author_lastname,
      })

      // Send the email verification link
      return res.status(201).json(book)
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
      if (!(bookName)) {
        res.status(400).send("All data is required");
      }
  
      // Validate if book exist in our database
      const book = await db.findOne({bookName: bookName});
  
      if (book) {
        // book
        res.status(200).json(book);
      }
      else res.status(400).send("No book found by given name.");
    } catch (err) {
      console.error(err);
      return res.status(400).send(err.message);
    }
  };
  
  return book;
}


export default Book();