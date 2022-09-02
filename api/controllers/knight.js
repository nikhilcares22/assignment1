const Model = require("../models");

exports.predictMoves = async (req, res) => {
	try {
		let x = [2, 2, 1, 1, -2, -2, -1, -1]; //possible moves
		let y = [1, -1, 2, -2, 1, -1, 2, -2]; //possible moves

		// function predictMoves(pos, m, n) {
		//where m and n represent the length in x and y axis resp.
		if (!pos.hasOwnProperty("x") || !pos.hasOwnProperty("y"))
			throw new Error ("Invalid input, input must be in {x:0,y:0} form.");
		let X = pos.x;
		let Y = pos.y;
		let result = [];
		for (let i = 0; i < 8; i++) {
			let a = X + x[i];
			let b = Y + y[i];
			if (a >= 0 && b >= 0 && a < m && b < n) {
				result.push({ x: a, y: b });
			}
		}
		// }

		return res.status(200).json({
			message: "Successfull.",
			result,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: error.message });
	}
};
