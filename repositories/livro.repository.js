import mongoose from "mongoose";
import Livro from "../models/livro.model.js";
import LivroInfoSchema from "../schemas/livroInfo.schema.js";
import { connect } from "./mongo.db.js";

async function insertLivro(livro) {
	try {
		return await Livro.create(livro);
	} catch (error) {
		throw error;
	}
}

async function updateLivro(livro) {
	try {
		await Livro.update(livro, {
			where: {
				livroId: livro.livroId,
			},
		});

		return await getLivro(livro.livroId);
	} catch (error) {
		throw error;
	}
}

async function deleteLivro(id) {
	try {
		await Livro.destroy({
			where: {
				livroId: id,
			},
		});
	} catch (error) {
		throw error;
	}
}

async function getLivro(id) {
	try {
		return await Livro.findByPk(id);
	} catch (error) {
		throw error;
	}
}

async function getLivros() {
	try {
		return await Livro.findAll();
	} catch (error) {
		throw error;
	}
}

async function getLivrosByAutor(autorId) {
	try {
		return await Livro.findAll({
			where: {
				autorId: autorId,
			},
		});
	} catch (error) {
		throw error;
	}
}

//---------------------- LIVRO INFO ----------------------//

async function insertLivroInfo(livroInfo) {
	try {
		const mongoose = await connect();
		const LivroInfo = mongoose.model("LivroInfo", LivroInfoSchema);
		livroInfo = new LivroInfo(livroInfo);
		await livroInfo.save();
	} catch (error) {
		throw error;
	}
}

async function updateLivroInfo(livroInfo) {
	try {
		const mongoose = await connect();
		const LivroInfo = mongoose.model("LivroInfo", LivroInfoSchema);
		await LivroInfo.findOneAndUpdate(
			{ livroId: livroInfo.livroId },
			livroInfo
		);
	} catch (error) {
		throw error;
	}
}

async function deleteLivroInfo(livroId) {
	try {
		const mongoose = await connect();
		const LivroInfo = mongoose.model("LivroInfo", LivroInfoSchema);
		await LivroInfo.deleteOne({ livroId: livroId });
	} catch (error) {
		throw error;
	}
}

async function insertAvaliacao(livroId, avaliacao) {
	try {
		const mongoose = await connect();
		const LivroInfo = mongoose.model("LivroInfo", LivroInfoSchema);
		let livroInfo = await LivroInfo.findOne({
			livroId: livroId,
		}).exec();

		livroInfo.avaliacoes.push(avaliacao);

		await LivroInfo.findOneAndUpdate({ livroId: livroId }, livroInfo);
	} catch (error) {
		throw error;
	}
}

async function deleteAvaliacao(livroId, index) {
	try {
		const mongoose = await connect();
		const LivroInfo = mongoose.model("LivroInfo", LivroInfoSchema);
		let livroInfo = await LivroInfo.findOne({
			livroId: livroId,
		}).exec();

		livroInfo.avaliacoes.splice(index, 1);

		await LivroInfo.findOneAndUpdate({ livroId: livroId }, livroInfo);
	} catch (error) {
		throw error;
	}
}

export default {
	insertLivro,
	updateLivro,
	deleteLivro,
	getLivro,
	getLivros,
	getLivrosByAutor,
	insertLivroInfo,
	updateLivroInfo,
	deleteLivroInfo,
	insertAvaliacao,
	deleteAvaliacao,
};
