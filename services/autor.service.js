import AutorRepository from "../repositories/autor.repository.js";
import LivroRepository from "../repositories/livro.repository.js";

async function insertAutor(autor) {
	return await AutorRepository.insertAutor(autor);
}

async function updateAutor(autor) {
	return await AutorRepository.updateAutor(autor);
}

async function deleteAutor(id) {
	const autor = await AutorRepository.getAutor(id);
	if (autor) {
		const livrosAutor = await LivroRepository.getLivrosByAutor(id);
		if (livrosAutor.length > 0)
			throw new Error(
				"Author can't be removed, there are books associated to him"
			);

		await AutorRepository.deleteAutor(id);
		return;
	}

	throw new Error("Author not found");
}

async function getAutores() {
	return await AutorRepository.getAutores();
}

async function getAutor(id) {
	return await AutorRepository.getAutor(id);
}

export default {
	insertAutor,
	updateAutor,
	deleteAutor,
	getAutores,
	getAutor,
};
