const mongoose = require("mongoose");

const DocSchema = new mongoose.Schema(
	{
		email: { type: String, unique: true },
		firstname: { type: String, default: "" },
		lastname: { type: String, default: "" },
	}
);

module.exports = mongoose.model("Authors", DocSchema);
