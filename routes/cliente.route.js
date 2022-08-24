import { Router } from "express";
import ClienteController from "../controllers/cliente.controller.js";

const router = Router();

router.post("/", ClienteController.insertCliente);
router.put("/", ClienteController.updateCliente);
router.delete("/:id", ClienteController.deleteCliente);
router.get("/", ClienteController.getClientes);
router.get("/:id", ClienteController.getCliente);

export default router;
