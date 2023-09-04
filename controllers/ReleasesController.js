const { fnSequelize } = require("../db/config");
const msgError = require("../utils/msgError");

exports.getRelease = async (req, res) => {
	const { id } = req.query;

	try {
		const sequelize = fnSequelize();

		const releases = await sequelize.query(
			`EXEC sp_lst_communication ${id === undefined ? "null" : id}`,
		);
		sequelize.close();

		res.json(releases);
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};

exports.createRelease = async (req, res) => {
	const { internalName, img } = req.body;

	try {
		const sequelize = fnSequelize();

		await sequelize.query(
			`EXEC sp_communication null, '${internalName}', '${img}', ${req.usuario.id}`,
		);
		sequelize.close();

		res.json(msgError("releaseOk"));
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};

exports.editRelease = async (req, res) => {
	const { id, internalName, img } = req.body;

	try {
		const sequelize = fnSequelize();

		await sequelize.query(
			`EXEC sp_communication ${id}, '${internalName}', '${img}', ${req.usuario.id}`,
		);
		sequelize.close();

		res.json(msgError("releaseUpdate"));
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};
