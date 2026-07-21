const express = require('express');
const router = express.Router();

const authorsController = require('../controllers/authorsController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *         - name
 *         - country
 *         - birthYear
 *         - website
 *         - specialty
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB-generated author ID
 *         name:
 *           type: string
 *           example: James Clear
 *         country:
 *           type: string
 *           example: United States
 *         birthYear:
 *           type: integer
 *           example: 1986
 *         website:
 *           type: string
 *           example: https://jamesclear.com
 *         specialty:
 *           type: string
 *           example: Habits and Productivity
 */

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Personal library author management
 */

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: List of authors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB author ID
 *     responses:
 *       200:
 *         description: Author retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       400:
 *         description: Invalid author ID
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: Invalid author data
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an existing author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB author ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: Invalid author ID or author data
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB author ID
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *       400:
 *         description: Invalid author ID
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */

router.get('/', authorsController.getAllAuthors);
router.get('/:id', authorsController.getAuthorById);
router.post('/', authorsController.createAuthor);
router.put('/:id', authorsController.updateAuthor);
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;