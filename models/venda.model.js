import { DataTypes } from "sequelize/types";
import db from "../repositories/db.js";

const Venda = db.define(
	"vendas",
	{
		vendaId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		valor: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
		data: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{ underscored: true }
);

Venda.belongsTo(Cliente, { foreignKey: "clienteId" });
Venda.belongsTo(Livro, { foreignKey: "livroId" });

export default Venda;
