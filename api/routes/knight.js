const express = require("express");
const router = express.Router();

const knightController = require('../controllers/knight');

//handel incoming GET request to /orders
router.post('/predictMoves', knightController.predictMoves);



module.exports = router;