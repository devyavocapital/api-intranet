const { fnSequelize } = require("../db/config");
const msgError = require("../utils/msgError");

// Obtener vacaciones por usuario
exports.getVacations = async (req, res) => {
	const { id } = req.query;

	try {
		const sequelize = fnSequelize();

		const vacations = await sequelize.query(
			`EXEC sp_assign_vacation ${id}, NULL, NULL, 0`,
		);
		sequelize.close();

		res.json(vacations);
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};

exports.assignVacation = async (req, res) => {
	const { id, availableDays, daysOff } = req.body;

	try {
		const sequelize = fnSequelize();

		await sequelize.query(
			`EXEC sp_assign_vacation ${id}, ${availableDays}, ${daysOff}, 1`,
		);
		sequelize.close();

		res.json(msgError("vacationsOk"));
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};

// Actualizar días de vacaciones
exports.updateVacations = async (req, res) => {
	const { id, availableDays, daysOff } = req.body;

	try {
		const sequelize = fnSequelize();

		await sequelize.query(
			`EXEC sp_assign_vacation ${id}, ${availableDays}, ${daysOff}, 2`,
		);
		sequelize.close();

		res.json(msgError("vacationsUpdated"));
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};

// solicitud de vacaciones
exports.requestVacations = async (req, res) => {
	const { id, requestDays, dateTo, dateFrom } = req.body;

	try {
		const sequelize = fnSequelize();

		await sequelize.query(
			`EXEC sp_user_vacation ${id}, ${requestDays}, null, '${dateTo}', '${dateFrom}', null, 0`,
		);
		sequelize.close();

		res.json(msgError("vacationsRequest"));
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};
// EDITAR solicitud de vacaciones
exports.requestVacationsUpdate = async (req, res) => {
	const { idRequest, requestDays, dateTo, dateFrom } = req.body;

	try {
		const sequelize = fnSequelize();

		await sequelize.query(
			//[sp_user_vacation] (@ID_USER int, @REQUEST_DAYS INT, @ID_USER_APPROVE INT, @DATE_TO DATE, @DATE_FROM DATE, @ID_REQUEST int, @EDIT bit)
			`EXEC sp_user_vacation ${req.usuario.id}, ${requestDays}, null, '${dateTo}', '${dateFrom}', ${idRequest}, 1`,
		);
		sequelize.close();

		res.json(msgError("vacationsRequestUpdated"));
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};

// listado de vacaciones por aprobar
exports.toApproveVacations = async (req, res) => {
	const { id } = req.query;

	try {
		const sequelize = fnSequelize();

		const toApprove = await sequelize.query(
			`EXEC sp_user_lst_vacation_toapprove ${id === undefined ? "null" : id}`,
		);
		sequelize.close();

		res.json(toApprove);
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};

// aprobar vacaciones
exports.approveVacations = async (req, res) => {
	const { id, idRequest } = req.body;

	try {
		const sequelize = fnSequelize();

		await sequelize.query(
			`EXEC sp_user_vacation ${id}, null, ${req.usuario.id}, null, null, ${idRequest}, 0`,
		);
		sequelize.close();

		res.json(msgError("vacationsApprove"));
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};

// Obtener vacaciones por listado, por cada usuario - "historico"
exports.getVacationsList = async (req, res) => {
	const { id } = req.query;

	try {
		const sequelize = fnSequelize();

		const vacations = await sequelize.query(`EXEC sp_user_lst_vacation ${id}`);
		sequelize.close();

		res.json(vacations);
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};
