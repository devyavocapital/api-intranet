const { fnSequelize } = require("../db/config");
const bcrypt = require("bcrypt");
const msgError = require("../utils/msgError");

exports.createUser = async (req, res) => {
	const {
		name,
		lastname,
		motherLastname,
		category,
		area,
		position,
		entryDate,
		email,
		password,
		birthday,
	} = req.body;

	if (category === 0 || area === 0) {
		return res.json(msgError());
	}

	if (
		[
			name.trim(),
			lastname.trim(),
			position.trim(),
			entryDate.trim(),
			email.trim(),
			password.trim(),
		].includes("")
	) {
		return res.json(msgError());
	}

	if (password.length < 6 && password.length > 18)
		return res.json(msgError("passwordLength"));

	try {
		const sequelize = fnSequelize();
		// hashear password
		const salt = await bcrypt.genSalt(10);
		const newPass = await bcrypt.hash(password, salt);

		await sequelize.query(
			`EXEC sp_user_info null, '${email}', '${newPass}', ${name}, ${lastname}, ${motherLastname}, ${category}, ${area}, '${position}', 1, '${entryDate}', ${req.usuario.id}, '${birthday}'`,
		);
		sequelize.close();

		res.json(msgError("userOk"));
	} catch (error) {
		console.log("error sql:", error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};

exports.editUser = async (req, res) => {
	const {
		id,
		name,
		lastname,
		motherLastname,
		category,
		area,
		position,
		entryDate,
		birthday,
	} = req.body;

	if (
		[name.trim(), lastname.trim(), position.trim(), entryDate.trim()].includes(
			"",
		)
	) {
		return res.json(msgError());
	}

	try {
		const sequelize = fnSequelize();

		await sequelize.query(
			`EXEC sp_user_info ${id}, null, null, '${name}', '${lastname}', '${motherLastname}', ${category}, ${area}, '${position}', 1, '${entryDate}', ${req.usuario.id}, '${birthday}'`,
		);
		sequelize.close();

		res.json(msgError("userUpdated"));
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};

exports.deleteUser = async (req, res) => {
	const { id } = req.query;

	try {
		const sequelize = fnSequelize();

		await sequelize.query(`EXEC sp_delete_user ${id}, ${req.usuario.id}`);
		sequelize.close();

		res.json(msgError("userEliminated"));
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};

exports.getUser = async (req, res) => {
	const { id } = req.query;

	try {
		const sequelize = fnSequelize();

		const users = await sequelize.query(
			`EXEC sp_lst_users ${id === undefined ? "null" : id}`,
		);
		sequelize.close();

		res.json(users);
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};

exports.getBirthdays = async (req, res) => {
	try {
		const sequelize = fnSequelize();

		const users = await sequelize.query("EXEC sp_lst_birthdays");
		sequelize.close();

		res.json(users);
	} catch (error) {
		console.log(error);
		const errorLog = `${error.original}`;
		res.json({ error: errorLog });
	}
};
