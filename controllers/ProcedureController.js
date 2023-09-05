const { fnSequelize } = require("../db/config");
const msgError = require("../utils/msgError");

exports.getProcedure = async (req, res) => {
	const { id, idParent } = req.query;

	try {
		const sequelize = fnSequelize();

		const procedures = await sequelize.query(
			`EXEC sp_lst_procedures ${id === undefined ? "null" : id}, ${
				idParent === undefined ? "null" : idParent
			}`,
		);
		sequelize.close();

		res.json(procedures);
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};

exports.createProcedure = async (req, res) => {
	const { controlName, idParent, document } = req.body;

	try {
		const sequelize = fnSequelize();

		await sequelize.query(
			// [dbo].[sp_procedures] (@ID int, @CONTROL_NAME VARCHAR(MAX), @ID_PARENT INT, @DOCUMENT VARCHAR(MAX), @USER int)
			`EXEC sp_procedures null, '${controlName}', ${
				idParent === "" ? 0 : idParent
			}, '${document === undefined ? "" : document}', ${req.usuario.id}`,
		);
		sequelize.close();

		res.json(msgError("procedureOk"));
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};

exports.editProcedure = async (req, res) => {
	const { controlName, idParent, document } = req.body;
	const { id } = req.query;
	console.log(req.query);

	try {
		const sequelize = fnSequelize();

		await sequelize.query(
			`EXEC sp_procedures ${id}, '${controlName}', ${
				idParent === "" ? 0 : idParent
			}, '${document}', ${req.usuario.id}`,
		);
		sequelize.close();

		res.json(msgError("procedureUpdate"));
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};
