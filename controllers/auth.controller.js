import basicAuth from "express-basic-auth";
import ClienteService from "../services/cliente.service.js";

const ADMIN_USER_NAME = "admin";
const ADMIN_PASSWORD = "desafio-igti-nodejs";

async function authenticate(username, password, cb) {
	const userMatches = basicAuth.safeCompare(username, ADMIN_USER_NAME);
	const passwordMatches = basicAuth.safeCompare(password, ADMIN_PASSWORD);
	global.UserAuthenticated = {
		userId: null,
		isAdmin: false,
		isCliente: false,
	};

	if (userMatches && passwordMatches) {
		global.UserAuthenticated.isAdmin = true;
		return cb(null, true);
	}

	const user = await ClienteService.getClienteByAuth(username, password);

	if (user) {
		global.UserAuthenticated.isCliente = true;
		global.UserAuthenticated.userId = user.clienteId;
		return cb(null, true);
	}

	return cb(null, false);
}

function getRole(username) {
	return basicAuth.safeCompare(username, ADMIN_USER_NAME)
		? "admin"
		: "cliente";
}

function authorize(...rolesAllowed) {
	const isAllowed = (role) => rolesAllowed.indexOf(role) > -1;

	return (req, res, next) => {
		if (req.auth.user) {
			const role = getRole(req.auth.user);

			if (isAllowed(role)) {
				next();
			} else {
				res.status(401).send("Role not allowed");
			}
		} else {
			res.status(403).send("User not found");
		}
	};
}

export default {
	authenticate,
	authorize,
};
