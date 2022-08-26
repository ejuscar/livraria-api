import { Router } from "express";
import LivroController from "../controllers/livro.controller.js";
import AuthController from "../controllers/auth.controller.js";

const router = Router();

router.post(
	"/",
	AuthController.authorize("admin"),
	LivroController.insertLivro
);

router.put("/", AuthController.authorize("admin"), LivroController.updateLivro);

router.delete(
	"/:id",
	AuthController.authorize("admin"),
	LivroController.deleteLivro
);

router.get(
	"/:id",
	AuthController.authorize("admin", "cliente"),
	LivroController.getLivro
);

router.get(
	"/",
	AuthController.authorize("admin", "cliente"),
	LivroController.getLivros
);

router.post(
	"/info",
	AuthController.authorize("admin"),
	LivroController.insertLivroInfo
);

router.put(
	"/info",
	AuthController.authorize("admin"),
	LivroController.updateLivroInfo
);

router.delete(
	"/info/:id",
	AuthController.authorize("admin"),
	LivroController.deleteLivroInfo
);

router.post(
	"/:id/avaliacao",
	AuthController.authorize("admin", "cliente"),
	LivroController.insertAvaliacao
);

router.delete(
	"/:id/avaliacao/:index",
	AuthController.authorize("admin"),
	LivroController.deleteAvaliacao
);

export default router;
