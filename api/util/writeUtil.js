const fs = require("fs");
const { Parser } = require("json2csv");

exports.writeCSVFromJson = function (data, path, headers) {
	return new Promise(async (resolve, reject) => {
		try {
			const parser = new Parser({
				fields: headers,
				delimiter: ";",
			});
			const result = parser.parse(data);
			await fs.writeFileSync(path, result);
			return resolve(result);
		} catch (error) {
			console.log(error);
			return reject(error);
		}
	});
};
