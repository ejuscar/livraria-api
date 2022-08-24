import { DataTypes } from "sequelize/types";
import db from "../repositories/db.js";

const Autor = db.define(
	"autores",
	{
		autorId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		nome: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		telefone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ underscored: true }
);

export default Autor;
