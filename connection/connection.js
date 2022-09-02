const mongoose = require("mongoose");
global.ObjectId = mongoose.Types.ObjectId;

module.exports.mongodb = async () => {
	await mongoose.connect(
		'mongodb+srv://nikhil:FMR4YFUQDYYEqNTf@cluster0.udzon.mongodb.net/?retryWrites=true&w=majority'||"mongodb://localhost:27017/csvService",
		{
			useUnifiedTopology: true,
			useFindAndModify: false,
			useNewUrlParser: true,
			useCreateIndex: true,
		},
		(error, result) => {
			error ? console.error("Mongo", error) : console.log("Mongo Connected");
		}
	);
};
