const mongoose = require("mongoose");
global.ObjectId = mongoose.Types.ObjectId;

module.exports.mongodb = async () => {
    console.log(process.env.MONGO_URL);
	await mongoose.connect(
		process.env.MONGO_URL||"mongodb://localhost:27017/csvService",
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
