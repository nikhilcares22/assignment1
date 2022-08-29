const csv = require("csvtojson");
const fs = require("fs");
const request = require("request");

exports.readFileAndConvertToJson = function (url) {
	return new Promise(async (resolve, reject) => {
		try {
			if (!url) throw new Error("No Url Provided");
			request(
				{
					url,
					method: "GET",
				},
				function (error, res) {
					csv({
						delimiter: ";",
						colParser: {
							email: function (item, head, resultRow, row, colIdx) {
								return item.replace(/null-/g, "");
							},
							authors: function (item, head, resultRow, row, colIdx) {
								return item.replace(/null-/g, "").split(",");
							},
							publishedAt: function (
								item,
								head,
								resultRow,
								row,
								colIdx
							) {
								resultRow.type = 1;
                                return item
							},
						},
					})
						.on("header", (header) => {
							if (header[4] == "publishedAt") {
								header.push(type);
							}
						})
						.fromString(res.body)
						.then((data) => {
							return resolve(data);
						});
				}
			);
		} catch (error) {
			console.log(error);
			return reject(error);
		}
	});
};
exports.readDb = function (db) {
	return new Promise(async (resolve, reject) => {
		try {
			let path;
			switch (db) {
				case "books":
					path = `${process.env.PWD}/api/models/books.json`;
					break;
				case "authors":
					path = `${process.env.PWD}/api/models/authors.json`;
					break;
				case "magazines":
					path = `${process.env.PWD}/api/models/magazines.json`;
					break;
				default:
					path = `${process.env.PWD}/api/models/books.json`;
					break;
			}

			const data = await fs.readFileSync(path, "utf-8");
			return resolve(JSON.parse(data));
		} catch (error) {
			console.log(error);
			return reject(error);
		}
	});
};
