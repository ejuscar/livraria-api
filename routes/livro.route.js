import { Router } from "express";
import LivroController from "../controllers/livro.controller.js";

const router = Router();

router.post("/", LivroController.insertLivro);
router.put("/", LivroController.updateLivro);
router.delete("/:id", LivroController.deleteLivro);
router.get("/:id", LivroController.getLivro);
router.get("/", LivroController.getLivros);
router.post("/info", LivroController.insertLivroInfo);
router.put("/info", LivroController.updateLivroInfo);
router.delete("/info/:id", LivroController.deleteLivroInfo);
router.post("/:id/avaliacao", LivroController.insertAvaliacao);
router.delete("/:id/avaliacao/:index", LivroController.deleteAvaliacao);

export default router;
