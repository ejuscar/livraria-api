import { Router } from "express";
import ClienteController from "../controllers/cliente.controller.js";
import AuthController from "../controllers/auth.controller.js";

const router = Router();

router.post(
	"/",
	AuthController.authorize("admin"),
	ClienteController.insertCliente
);

router.put(
	"/",
	AuthController.authorize("admin", "cliente"),
	ClienteController.updateCliente
);

router.delete(
	"/:id",
	AuthController.authorize("admin"),
	ClienteController.deleteCliente
);

router.get(
	"/",
	AuthController.authorize("admin"),
	ClienteController.getClientes
);

router.get(
	"/:id",
	AuthController.authorize("admin"),
	ClienteController.getCliente
);

export default router;
