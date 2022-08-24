import { DataTypes } from "sequelize/types";
import db from "../repositories/db.js";
import Autor from "./autor.model.js";

const Livro = db.define(
	"livros",
	{
		livroId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		nome: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		valor: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
		estoque: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{ underscored: true }
);

Livro.belongsTo(Autor, { foreingKey: "autorId" });

export default Livro;
