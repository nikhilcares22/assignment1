const Joi = require("joi");

Joi.objectId = () => Joi.string().pattern(/^[0-9a-f]{24}$/, "valid ObjectId");

module.exports.identify = Joi.object({
	id: Joi.objectId().required(),
});

module.exports.getBooksOrMagazinesByIsbn = Joi.object({
	isbn: Joi.string()
		.regex(/^[0-9]{4}-[0-9]{4}-[0-9]{4}$/, "Valid isbn")
		.required(),
});
module.exports.getBooksOrMagazinesByEmail = Joi.object({
	email: Joi.string().email().required(),
});
module.exports.addBookOrMagazine = Joi.object({
	title: Joi.string().required(),
	isbn: Joi.string().regex(/^[0-9]{4}-[0-9]{4}-[0-9]{4}$/, "Valid isbn").required(),
	authors: Joi.array().items(Joi.string().email().required()),
	type: Joi.string().allow(0,1).required(),
	description: Joi.alternatives().conditional("type", {
		is: 0,
		then: Joi.string().required(),
	}),
	publishedAt: Joi.alternatives().conditional("type", {
		is: 1,
		then: Joi.string().regex(/^[0-9]{2}.[0-9]{2}.[0-9]{4}$/, "Valid published at").required(),
	}),
});

// firstname: Joi.alternatives().conditional('type', { is: 1, then: Joi.string().required() }),


