import { Schema } from "mongoose";
import AvaliacaoSchema from "./avaliacao.schema";

const LivroInfo = new Schema(
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
