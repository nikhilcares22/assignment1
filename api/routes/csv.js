const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const csvController = require('../controllers/csv.js');

//handel incoming GET request to /orders
router.post('/addData', csvController.addData);
router.get('/getData', csvController.getData);



module.exports = router;