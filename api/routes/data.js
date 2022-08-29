const express = require("express");
const router = express.Router();

const BooksController = require('../controllers/booksmagazines');

router.get('/getAllBooksAndMagazines', BooksController.getAllBooksAndMagazines);

router.post('/getBooksOrMagazinesByIsbn', BooksController.getBooksOrMagazinesByIsbn);

router.post('/getBooksOrMagazinesByEmail', BooksController.getBooksOrMagazinesByEmail);

router.get('/getBooksAndMagazinesSorted', BooksController.getBooksAndMagazinesSorted);

router.post('/addBookOrMagazine', BooksController.addBookOrMagazine);

router.get('/exportNewData', BooksController.exportNewData);

module.exports = router;