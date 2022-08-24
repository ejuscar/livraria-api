import winston from "winston";
import app from "./app.js";

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
	level: "silly",
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: "livraria-api.log" }),
	],
	format: combine(label({ label: "livraria-api" }), timestamp(), myFormat),
});

var listener = app.listen(3000, () => {
	console.log(`API Started. Listening on port: ${listener.address().port}`);
});
