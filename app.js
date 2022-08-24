import express from "express";
import cors from "cors";
import helmet from "helmet";

import autorRouter from "./routes/autor.route.js";
import clienteRouter from "./routes/cliente.route.js";
import livroRouter from "./routes/livro.route.js";
import vendaRouter from "./routes/venda.route.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/cliente", clienteRouter);
app.use("/autor", autorRouter);
app.use("/livro", livroRouter);
app.use("/venda", vendaRouter);

app.use((error, req, res, next) => {
	logger.error(`${req.method} ${req.baseUrl} - ${error}`);
	res.status(400).send({
		success: false,
		message: "An internal error occurred while processing de request",
		data: null,
	});
});

export default app;
