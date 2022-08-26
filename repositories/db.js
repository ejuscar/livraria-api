import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
	dialect: "postgres",
	host: "localhost",
	port: 49533,
	database: "livraria",
	username: "postgres",
	password: "mysecretpassword",
	logging: false,
	define: {
		timestamps: false,
	},
});

export default sequelize;
