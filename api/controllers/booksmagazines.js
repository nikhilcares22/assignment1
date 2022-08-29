const Model = require("../models");
const fs = require("fs");
const writeUtil = require("../util/writeUtil");
const Validations = require("../validation/index");

exports.getAllBooksAndMagazines = async (req, res) => {
	try {
		let pipeline = [
			{
				$addFields: {
					type: {
						$cond: {
							if: { $eq: ["$type", 0] },
							then: "Book",
							else: "Magazine",
						},
					},
				},
			},
		];
		let data = await Model.Books.aggregate(pipeline);

		return res.status(200).json({
			message: "Successfully Fetched Books.",
			data,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: error.message });
	}
};
exports.getBooksOrMagazinesByIsbn = async (req, res) => {
	try {
		await Validations.Books.getBooksOrMagazinesByIsbn.validateAsync(req.body);
		let pipeline = [
			{
				$match: {
					$expr: { $eq: [req.body.isbn, "$isbn"] },
				},
			},
			{
				$addFields: {
					type: {
						$cond: {
							if: { $eq: ["$type", 0] },
							then: "Book",
							else: "Magazine",
						},
					},
				},
			},
		];
		let data = await Model.Books.aggregate(pipeline);
		if (!data.length)
			return res.status(200).json({
				message: "No Data Found.",
			});
		return res.status(200).json({
			message: "Successfully Fetched Data.",
			data: data[0],
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: error.message });
	}
};
exports.getBooksOrMagazinesByEmail = async (req, res) => {
	try {
		await Validations.Books.getBooksOrMagazinesByEmail.validateAsync(req.body);
		let pipeline = [
			{
				$match: {
					$expr: { $in: [req.body.email, "$authors"] },
				},
			},
			{
				$addFields: {
					type: {
						$cond: {
							if: { $eq: ["$type", 0] },
							then: "Book",
							else: "Magazine",
						},
					},
				},
			},
		];
		let data = await Model.Books.aggregate(pipeline);
		if (!data.length)
			return res.status(200).json({
				message: "No Data Found.",
			});
		return res.status(200).json({
			message: "Successfully Fetched Data.",
			data,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: error.message });
	}
};
exports.getBooksAndMagazinesSorted = async (req, res) => {
	try {
		let pipeline = [
			{ $sort: { title: 1 } },
			{
				$addFields: {
					type: {
						$cond: {
							if: { $eq: ["$type", 0] },
							then: "Book",
							else: "Magazine",
						},
					},
				},
			},
		];
		let data = await Model.Books.aggregate(pipeline);
		console.log(data);
		if (!data.length)
			return res.status(200).json({
				message: "No Data Found.",
			});
		return res.status(200).json({
			message: "Successfully Fetched Books.",
			data,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: error.message });
	}
};
exports.addBookOrMagazine = async (req, res) => {
	try {
		await Validations.Books.addBookOrMagazine.validateAsync(req.body);
		let { isbn, title, description, publishedAt, authors, type } = req.body;

		const checkResult = await Model.Books.findOne({ isbn });
		if (checkResult)
			return res.status(409).json({ message: "isbn already exists." });
		req.body.addedViaApi = 1;
		const data = await Model.Books.create(req.body);
		return res.status(200).json({
			message: "Successfull.",
			data,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: error.message });
	}
};
exports.exportNewData = async (req, res) => {
	try {
		let jsonData = await Model.Books.aggregate([
			{ $match: { addedViaApi: 1 } },
			{
				$addFields: {
					authors: {
						$reduce: {
							input: "$authors",
							initialValue: "",
							in: { $concat: ["$$value", "$$this", ","] },
						},
					},
				},
			},
			{
				$project: {
					publishedAt: 1,
					authors: 1,
					description: 1,
					isbn: 1,
					title: 1,
					_id: 0,
				},
			},
		]);
		let path = `${process.env.PWD}/uploads/out.csv`;
		await writeUtil.writeCSVFromJson(jsonData, path, [
			"publishedAt",
			"title",
			"authors",
			"description",
			"isbn",
		]);
		res.download(path, "out.csv");
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: error.message });
	}
};
