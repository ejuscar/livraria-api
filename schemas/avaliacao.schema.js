import { Schema } from "mongoose";

const AvaliacaoSchema = new Schema(
	{
		nome: String,
		nota: Number,
		avaliacao: String,
	},
	{ collection: "livroInfo" }
);

export default AvaliacaoSchema;
