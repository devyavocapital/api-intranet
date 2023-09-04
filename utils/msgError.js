const msgError = (type) => {
	let msg;
	switch (type) {
		case "passwordLength":
			msg = { msg: "El contraseña debe de tener de 6 a 18 carácteres." };
			return msg;
		case "userOk":
			msg = { msg: "Usuario creado correctamente." };
			return msg;
		case "userUpdated":
			msg = { msg: "Usuario actualizado correctamente." };
			return msg;
		case "userEliminated":
			msg = { msg: "Usuario eliminado correctamente." };
			return msg;
		case "vacationsOk":
			msg = { msg: "Vacaciones asignadas correctamente." };
			return msg;
		case "vacationsUpdated":
			msg = { msg: "Vacaciones actualizadas correctamente." };
			return msg;
		case "vacationsRequestUpdated":
			msg = { msg: "Vacaciones solicitadas actualizadas correctamente." };
			return msg;
		case "categoryOk":
			msg = { msg: "Categoria creada correctamente." };
			return msg;
		case "categoryUpdated":
			msg = { msg: "Categoria actualizada correctamente." };
			return msg;
		case "categoryEliminated":
			msg = { msg: "Categoria eliminada correctamente." };
			return msg;
		case "areaOk":
			msg = { msg: "Área creada correctamente." };
			return msg;
		case "areaUpdated":
			msg = { msg: "Área actualizada correctamente." };
			return msg;
		case "areaDeleted":
			msg = { msg: "Área eliminada correctamente." };
			return msg;
		case "vacationsRequest":
			msg = { msg: "Vacaciones solicitadas." };
			return msg;
		case "vacationsApprove":
			msg = { msg: "Vacaciones aprovadas." };
			return msg;
		case "releaseOk":
			msg = { msg: "Comunicado creado correctamente." };
			return msg;
		case "releaseUpdate":
			msg = { msg: "Comunicado actualizado correctamente." };
			return msg;

		default:
			msg = { msg: "Existen campos vacíos y son obligatorios." };
			return msg;
	}
};

module.exports = msgError;
