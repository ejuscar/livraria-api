import { Router } from "express";
import VendaController from "../controllers/venda.controller.js";
import AuthController from "../controllers/auth.controller.js";

const router = Router();

router.post(
	"/",
	AuthController.authorize("admin", "cliente"),
	VendaController.insertVenda
);

router.get("/:id", AuthController.authorize("admin"), VendaController.getVenda);

router.get(
	"/",
	AuthController.authorize("admin", "cliente"),
	VendaController.getVendas
);

export default router;
