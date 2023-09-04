const { fnSequelize } = require("../db/config");
const msgError = require("../utils/msgError");

exports.getCategories = async (req, res) => {
	const { id } = req.query;

	try {
		const sequelize = fnSequelize();

		const categories = await sequelize.query(
			`EXEC sp_lst_category ${id === undefined ? "null" : id}`,
		);
		sequelize.close();

		res.json(categories);
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};

exports.createCategory = async (req, res) => {
	const { idArea, nameCategory, valueCategory } = req.body;

	try {
		const sequelize = fnSequelize();

		await sequelize.query(
			`EXEC sp_category null, ${idArea}, '${nameCategory}', ${valueCategory}, 1, ${req.usuario.id}`,
		);
		sequelize.close();

		res.json(msgError("categoryOk"));
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};

exports.editCategory = async (req, res) => {
	const {
		body: { idArea, nameCategory, valueCategory },
		query: { id },
	} = req;

	try {
		const sequelize = fnSequelize();
		await sequelize.query(
			`EXEC sp_category ${id}, ${idArea}, '${nameCategory}', ${valueCategory}, 1, ${req.usuario.id}`,
		);
		sequelize.close();

		res.json(msgError("categoryUpdated"));
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};

exports.deleteCategory = async (req, res) => {
	const {
		query: { id },
	} = req;

	try {
		const sequelize = fnSequelize();

		await sequelize.query(
			`EXEC sp_category ${id}, '', '', '', 0, ${req.usuario.id}`,
		);
		sequelize.close();

		res.json(msgError("categoryEliminated"));
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};
