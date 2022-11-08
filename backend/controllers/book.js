const { Book, validate } = require("../models/book");


exports.insert = async (req, res) => {
  try {
    // Validate the user data
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { bookName, ISBN, Author_firstname, Author_lastname} = req.body; // Get the user data

    // Check if the user exists in the database
    const ISBNExists = await Book.findOne({ISBN});
    if (ISBNExists) {
      return res.status(409).send("Book already exist.");
    }

    // Create an user object
    let book = await Book.create({
      bookName: bookName.toLowerCase(),
      ISBN,
      Author_firstname: Author_firstname.toLowerCase(),
      Author_lastname: Author_lastname.toLowerCase(),
    });

    // Send the email verification link
    return res.status(201).json(book)
  } catch (err) {
    console.error(err);
    return res.status(400).send(err.message);
  }
};

exports.get = async (req, res) => {
    try {
      // Get book data
      const { bookName } = req.body;
  
      // Validate bookname data
      if (!(bookName)) {
        res.status(400).send("All data is required");
      }
  
      // Validate if book exist in our database
      const book = await Book.findOne(bookName);
  
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
  