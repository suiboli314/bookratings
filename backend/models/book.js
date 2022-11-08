const mongoose = require("mongoose");
const Joi = require("joi");
const { Int32 } = require("mongodb");

const bookSchema = new mongoose.Schema({
  bookName: { type: String, default: null },
  ISBN: { type: Int32, default: null },
  Author: { type: String, unique: true }
});

const Book = mongoose.model("book", bookSchema);

const validate = (book) => {
  const schema = Joi.object({
    bookName: Joi.string().required(),
    ISBN: Joi.Int32.required(),
    Author_firstname: Joi.string().required(),
    Author_lastname: Joi.string().required(),
    Rating: Joi.Int32.required()
  });
  return schema.validate(book);
};

module.exports = { Book, validate };
