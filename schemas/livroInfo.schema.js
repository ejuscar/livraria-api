import mongoose from "mongoose";
import AvaliacaoSchema from "./avaliacao.schema.js";

const LivroInfo = new mongoose.Schema(
	{
		livroId: Number,
		descricao: String,
		paginas: Number,
		editora: String,
		avaliacoes: [AvaliacaoSchema],
	},
	{ collection: "livroInfo" }
);

export default LivroInfo;
