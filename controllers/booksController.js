const { getDb } = require('../data/database');
const { ObjectId } = require('mongodb');

const getAllBooks = async (req, res) => {
  try {
    const books = await getDb()
      .collection('books')
      .find()
      .toArray();

    res.status(200).json(books);
  } catch (error) {
    console.error('Error retrieving books:', error);
    res.status(500).json({
      message: 'An error occurred while retrieving books.'
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;

    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({
        message: 'Invalid book ID.'
      });
    }

    const book = await getDb()
      .collection('books')
      .findOne({ _id: new ObjectId(bookId) });

    if (!book) {
      return res.status(404).json({
        message: 'Book not found.'
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('Error retrieving book:', error);

    return res.status(500).json({
      message: 'An error occurred while retrieving the book.'
    });
  }
};

const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      publicationYear,
      pages,
      publisher,
      isbn,
      status
    } = req.body;

    if (
      !title ||
      !author ||
      !genre ||
      !publicationYear ||
      !pages ||
      !publisher ||
      !isbn ||
      !status
    ) {
      return res.status(400).json({
        message: 'All book fields are required.'
      });
    }

    if (
      typeof publicationYear !== 'number' ||
      typeof pages !== 'number'
    ) {
      return res.status(400).json({
        message: 'Publication year and pages must be numbers.'
      });
    }

    if (pages <= 0) {
      return res.status(400).json({
        message: 'Pages must be greater than zero.'
      });
    }

    const validStatuses = ['Reading', 'Finished', 'Wishlist'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Status must be Reading, Finished, or Wishlist.'
      });
    }

    const book = {
      title,
      author,
      genre,
      publicationYear,
      pages,
      publisher,
      isbn,
      status
    };

    const result = await getDb()
      .collection('books')
      .insertOne(book);

    return res.status(201).json({
      message: 'Book created successfully.',
      bookId: result.insertedId
    });
  } catch (error) {
    console.error('Error creating book:', error);

    return res.status(500).json({
      message: 'An error occurred while creating the book.'
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({
        message: 'Invalid book ID.'
      });
    }

    const {
      title,
      author,
      genre,
      publicationYear,
      pages,
      publisher,
      isbn,
      status
    } = req.body;

    if (
      !title ||
      !author ||
      !genre ||
      !publicationYear ||
      !pages ||
      !publisher ||
      !isbn ||
      !status
    ) {
      return res.status(400).json({
        message: 'All book fields are required.'
      });
    }

    if (
      typeof publicationYear !== 'number' ||
      typeof pages !== 'number'
    ) {
      return res.status(400).json({
        message: 'Publication year and pages must be numbers.'
      });
    }

    if (pages <= 0) {
      return res.status(400).json({
        message: 'Pages must be greater than zero.'
      });
    }

    const validStatuses = ['Reading', 'Finished', 'Wishlist'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Status must be Reading, Finished, or Wishlist.'
      });
    }

    const updatedBook = {
      title,
      author,
      genre,
      publicationYear,
      pages,
      publisher,
      isbn,
      status
    };

    const result = await getDb()
      .collection('books')
      .updateOne(
        { _id: new ObjectId(bookId) },
        { $set: updatedBook }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Book not found.'
      });
    }

    return res.status(200).json({
      message: 'Book updated successfully.'
    });
  } catch (error) {
    console.error('Error updating book:', error);

    return res.status(500).json({
      message: 'An error occurred while updating the book.'
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({
        message: 'Invalid book ID.'
      });
    }

    const result = await getDb()
      .collection('books')
      .deleteOne({ _id: new ObjectId(bookId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Book not found.'
      });
    }

    return res.status(200).json({
      message: 'Book deleted successfully.'
    });

  } catch (error) {
    console.error('Error deleting book:', error);

    return res.status(500).json({
      message: 'An error occurred while deleting the book.'
    });
  }
};

module.exports = {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook 
};