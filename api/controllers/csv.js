const dbService = require("../services/dbService");
const readUtil = require("../util/readUtil");
const writeUtil = require("../util/writeUtil");
const Model = require("../models");

exports.addData = async (req, res) => {
	try {
		const [booksUrl, authorsUrl, magazinesUrl] = [
			req.body.booksUrl,
			req.body.authorsUrl,
			req.body.magazinesUrl,
		];
		//clear all data
		await Promise.all([
			Model.Books.deleteMany({ addedViaApi: 0 }),
			Model.Author.deleteMany({}),
		]);
		if (!req.body.booksUrl || !req.body.authorsUrl || !req.body.magazinesUrl)
			throw new Error("No Url Provided");

		let d1 = readUtil.readFileAndConvertToJson(booksUrl);
		let d2 = readUtil.readFileAndConvertToJson(authorsUrl);
		let d3 = readUtil.readFileAndConvertToJson(magazinesUrl);
		let [booksData, authorsData, magazinesData] = await Promise.all([
			d1,
			d2,
			d3,
		]);

		console.log(booksData.length, magazinesData.length);
		let p1 = Model.Books.insertMany(booksData);
		let p2 = Model.Author.insertMany(authorsData);
		let p3 = Model.Books.insertMany(magazinesData);

		const result = await Promise.all([p1, p2, p3]);

		res.status(200).json({
			status: "Successfull",
			data: {
				booksData: result[0],
				authorsData: result[1],
				magazinesData: result[2],
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: error.message,
		});
	}
};

exports.getData = async (req, res) => {
	try {
		let PromiseArr = [];

		PromiseArr.push(Model.Books.find(), Model.Author.find(), Model.Book.find());
		let result = await Promise.all(PromiseArr);
		let responseData = {};
		responseData["Books"] = result[0];
		responseData["Magazines"] = result[2];
		responseData["Authors"] = result[1];
		res.status(200).json({
			status: "Successfull",
			data: responseData,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: error.message,
		});
	}
};
