import { DataTypes } from "sequelize/types";
import db from "../repositories/db.js";

const Cliente = db.define(
	"clientes",
	{
		clienteId: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		nome: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		senha: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		telefone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		endereco: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ underscored: true }
);

export default Cliente;
