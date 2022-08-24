import { Router } from "express";
import VendaController from "../controllers/venda.controller.js";

const router = Router();

router.post("/", VendaController.insertVenda);
router.get("/:id", VendaController.getVenda);
router.get("/", VendaController.getVendas);

export default router;
