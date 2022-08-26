import express from "express";
import cors from "cors";
import helmet from "helmet";
import basicAuth from "express-basic-auth";

import autorRouter from "./routes/autor.route.js";
import clienteRouter from "./routes/cliente.route.js";
import livroRouter from "./routes/livro.route.js";
import vendaRouter from "./routes/venda.route.js";

import AuthController from "./controllers/auth.controller.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
	basicAuth({
		authorizer: AuthController.authenticate,
		authorizeAsync: true,
	})
);

app.use("/cliente", clienteRouter);
app.use("/autor", AuthController.authorize("admin"), autorRouter);
app.use("/livro", livroRouter);
app.use("/venda", vendaRouter);

app.use((error, req, res, next) => {
	logger.error(`${req.method} ${req.baseUrl} - ${error}`);
	res.status(400).send({
		success: false,
		message: `${error.message}`,
		data: null,
	});
});

export default app;
