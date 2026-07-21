const express = require('express');
const router = express.Router();

const booksController = require('../controllers/booksController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - genre
 *         - publicationYear
 *         - pages
 *         - publisher
 *         - isbn
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB-generated book ID
 *         title:
 *           type: string
 *           example: Atomic Habits
 *         author:
 *           type: string
 *           example: James Clear
 *         genre:
 *           type: string
 *           example: Self Help
 *         publicationYear:
 *           type: integer
 *           example: 2018
 *         pages:
 *           type: integer
 *           example: 320
 *         publisher:
 *           type: string
 *           example: Avery
 *         isbn:
 *           type: string
 *           example: "9780735211292"
 *         status:
 *           type: string
 *           enum:
 *             - Reading
 *             - Finished
 *             - Wishlist
 *           example: Reading
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Personal library book management
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: List of books retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB book ID
 *     responses:
 *       200:
 *         description: Book retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid book ID
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Invalid book data
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update an existing book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Invalid book ID or book data
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       400:
 *         description: Invalid book ID
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);
router.post('/', booksController.createBook);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;