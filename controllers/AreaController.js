const { fnSequelize } = require("../db/config");
const msgError = require("../utils/msgError");

exports.getAreas = async (req, res) => {
	const { id } = req.query;

	try {
		const sequelize = fnSequelize();

		const areas = await sequelize.query(
			`EXEC sp_lst_area ${id === undefined ? "null" : id}`,
		);
		sequelize.close();

		res.json(areas);
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};

exports.createArea = async (req, res) => {
	const { area } = req.body;

	try {
		const sequelize = fnSequelize();

		await sequelize.query(`EXEC sp_area null, '${area}', ${req.usuario.id}, 1`);
		sequelize.close();

		res.json(msgError("areaOk"));
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};

exports.editArea = async (req, res) => {
	const {
		body: { area },
		query: { id },
	} = req;

	try {
		const sequelize = fnSequelize();

		await sequelize.query(
			`EXEC sp_area ${id}, '${area}', ${req.usuario.id}, 1`,
		);
		sequelize.close();

		res.json(msgError("areaUpdated"));
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};

exports.deleteArea = async (req, res) => {
	const {
		query: { id },
	} = req;

	try {
		const sequelize = fnSequelize();

		await sequelize.query(`EXEC sp_area ${id}, '', ${req.usuario.id}, 0`);
		sequelize.close();

		res.json(msgError("areaDeleted"));
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};
