import { Router } from "express";
import AutorController from "../controllers/autor.controller.js";

const router = Router();

router.post("/", AutorController.insertAutor);
router.put("/", AutorController.updateAutor);
router.delete("/:id", AutorController.deleteAutor);
router.get("/", AutorController.getAutores);
router.get("/:id", AutorController.getAutor);

export default router;
