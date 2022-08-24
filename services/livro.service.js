import LivroRepository from "../repositories/livro.repository.js";
import VendaRepository from "../repositories/venda.repository.js";

async function insertLivro(livro) {
	return await LivroRepository.insertLivro(livro);
}

async function updateLivro(livro) {
	return await LivroRepository.updateLivro(livro);
}

async function deleteLivro(id) {
	const livro = await LivroRepository.getLivro(id);

	if (livro) {
		const vendasLivro = await VendaRepository.getVendasByLivro(id);
		if (vendasLivro.length > 0)
			throw new Error(
				"Book can't be removed. There are sales related to it"
			);

		await LivroRepository.deleteLivro(id);
		return;
	}

	throw new Error("Book not found");
}

async function getLivro(id) {
	const livro = await LivroRepository.getLivro(id);
	const livroInfo = await LivroRepository.getLivroInfo(id);

	return {
		livro,
		livroInfo: livroInfo,
	};
}

async function getLivros(autorId) {
	if (autorId) return await LivroRepository.getLivrosByAutor(autorId);
	return await LivroRepository.getLivros();
}

async function insertLivroInfo(livroInfo) {
	await LivroRepository.insertLivroInfo(livroInfo);
}

async function updateLivroInfo(livroInfo) {
	await LivroRepository.updateLivroInfo(livroInfo);
}

async function deleteLivroInfo(id) {
	const livroInfo = await LivroRepository.getLivroInfo(id);

	if (livroInfo) {
		await LivroRepository.deleteLivroInfo(id);
		return;
	}

	throw new Error("Book not found");
}

async function insertAvaliacao(livroId, avaliacao) {
	const livroInfo = await LivroRepository.getLivroInfo(livroId);

	if (livroInfo) {
		await LivroRepository.insertAvaliacao(livroId, avaliacao);
		return;
	}

	throw new Error("Book Info not found");
}

async function deleteAvaliacao(livroId, index) {
	const livroInfo = await LivroRepository.getLivroInfo(livroId);

	if (livroInfo) {
		await LivroRepository.deleteAvaliacao(livroId, index);
		return;
	}

	throw new Error("Book Info not found");
}

export default {
	insertLivro,
	updateLivro,
	deleteLivro,
	getLivro,
	getLivros,
	insertLivroInfo,
	updateLivroInfo,
	deleteLivroInfo,
	insertAvaliacao,
	deleteAvaliacao,
};
