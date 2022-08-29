const mongoose = require("mongoose");

const DocSchema = new mongoose.Schema({
	title: { type: String, default: "" },
	isbn: { type: String, unique: true },
	authors: { type: Array },
	description: { type: String, default: "" },
	publishedAt: { type: String, default: "" },
	type: { type: Number, default: 0, enum: [0, 1] },//0 for book 1 for magazine
	addedViaApi: { type: Number, default: 0, enum: [0, 1] },//0 for csc 1 for api
});

module.exports = mongoose.model("Books", DocSchema);
