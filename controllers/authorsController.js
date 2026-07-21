const { ObjectId } = require('mongodb');
const { getDb } = require('../data/database');

const getAllAuthors = async (req, res) => {
  try {
    const authors = await getDb()
      .collection('authors')
      .find()
      .toArray();

    return res.status(200).json(authors);
  } catch (error) {
    console.error('Error retrieving authors:', error);

    return res.status(500).json({
      message: 'An error occurred while retrieving authors.'
    });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const authorId = req.params.id;

    if (!ObjectId.isValid(authorId)) {
      return res.status(400).json({
        message: 'Invalid author ID.'
      });
    }

    const author = await getDb()
      .collection('authors')
      .findOne({ _id: new ObjectId(authorId) });

    if (!author) {
      return res.status(404).json({
        message: 'Author not found.'
      });
    }

    return res.status(200).json(author);
  } catch (error) {
    console.error('Error retrieving author:', error);

    return res.status(500).json({
      message: 'An error occurred while retrieving the author.'
    });
  }
};

const createAuthor = async (req, res) => {
  try {
    const {
      name,
      country,
      birthYear,
      website,
      specialty
    } = req.body;

    if (!name || !country || !birthYear || !website || !specialty) {
      return res.status(400).json({
        message: 'All author fields are required.'
      });
    }

    if (typeof birthYear !== 'number') {
      return res.status(400).json({
        message: 'Birth year must be a number.'
      });
    }

    const author = {
      name,
      country,
      birthYear,
      website,
      specialty
    };

    const result = await getDb()
      .collection('authors')
      .insertOne(author);

    return res.status(201).json({
      message: 'Author created successfully.',
      authorId: result.insertedId
    });
  } catch (error) {
    console.error('Error creating author:', error);

    return res.status(500).json({
      message: 'An error occurred while creating the author.'
    });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;

    if (!ObjectId.isValid(authorId)) {
      return res.status(400).json({
        message: 'Invalid author ID.'
      });
    }

    const {
      name,
      country,
      birthYear,
      website,
      specialty
    } = req.body;

    if (!name || !country || !birthYear || !website || !specialty) {
      return res.status(400).json({
        message: 'All author fields are required.'
      });
    }

    if (typeof birthYear !== 'number') {
      return res.status(400).json({
        message: 'Birth year must be a number.'
      });
    }

    const updatedAuthor = {
      name,
      country,
      birthYear,
      website,
      specialty
    };

    const result = await getDb()
      .collection('authors')
      .updateOne(
        { _id: new ObjectId(authorId) },
        { $set: updatedAuthor }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Author not found.'
      });
    }

    return res.status(200).json({
      message: 'Author updated successfully.'
    });
  } catch (error) {
    console.error('Error updating author:', error);

    return res.status(500).json({
      message: 'An error occurred while updating the author.'
    });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;

    if (!ObjectId.isValid(authorId)) {
      return res.status(400).json({
        message: 'Invalid author ID.'
      });
    }

    const result = await getDb()
      .collection('authors')
      .deleteOne({ _id: new ObjectId(authorId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Author not found.'
      });
    }

    return res.status(200).json({
      message: 'Author deleted successfully.'
    });
  } catch (error) {
    console.error('Error deleting author:', error);

    return res.status(500).json({
      message: 'An error occurred while deleting the author.'
    });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};