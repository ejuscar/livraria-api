import LivroService from "../services/livro.service.js";

async function insertLivro(req, res, next) {
	try {
		const livro = req.body;

		//prettier-ignore
		if (!livro || !livro.nome || !livro.valor || !livro.estoque || !livro.autorId)
            throw new Error("The fields nome, valor, estoque and autorId are required");

		const livroCreated = await LivroService.insertLivro(livro);

		res.send({
			success: true,
			message: "Book created successfully",
			data: livroCreated,
		});
	} catch (error) {
		next(error);
	}
}

async function updateLivro(req, res, next) {
	try {
		const livro = req.body;

		//prettier-ignore
		if (!livro || !livro.livroId || !livro.valor || !livro.estoque)
            throw new Error("The fields livroId, valor and estoque are required");

		const livroUpdated = await LivroService.updateLivro(livro);

		res.send({
			success: true,
			message: "Book updated successfully",
			data: livroUpdated,
		});
	} catch (error) {
		next(error);
	}
}

async function deleteLivro(req, res, next) {
	try {
		const id = req.params.id;

		if (!id) throw new Error("Id is required");

		await LivroService.deleteLivro(id);

		res.send({
			success: true,
			message: "Book removed successfully",
			data: null,
		});
	} catch (error) {
		next(error);
	}
}

async function getLivro(req, res, next) {
	try {
		const id = req.params.id;

		if (!id) throw new Error("Id is required");

		const livro = await LivroService.getLivro(id);

		res.send({
			success: true,
			message: "Book retrieved successfully",
			data: livro,
		});
	} catch (error) {
		next(error);
	}
}

async function getLivros(req, res, next) {
	try {
		const autorId = req.query.autorId;

		res.send({
			success: true,
			message: "Books retrieved successfully",
			data: await LivroService.getLivros(autorId),
		});
	} catch (error) {
		next(error);
	}
}

async function insertLivroInfo(req, res, next) {
	try {
		const livroInfo = req.body;

		// prettier-ignore
		if(!livroInfo || !livroInfo.livroId || !livroInfo.descricao || !livroInfo.paginas || !livroInfo.editora)
        throw new Error("The fields livroId, descricao, paginas and editora are required");

		await LivroService.insertLivroInfo(livroInfo);

		res.send({
			success: true,
			message: "Book info created successfully",
			data: null,
		});
	} catch (error) {
		next(error);
	}
}

async function updateLivroInfo(req, res, next) {
	try {
		const livroInfo = req.body;

		// prettier-ignore
		if(!livroInfo || !livroInfo.livroId || !livroInfo.descricao || !livroInfo.paginas || !livroInfo.editora)
        throw new Error("The fields livroId, descricao, paginas and editora are required");

		await LivroService.updateLivroInfo(livroInfo);

		res.send({
			success: true,
			message: "Book info updated successfully",
			data: null,
		});
	} catch (error) {
		next(error);
	}
}

async function deleteLivroInfo(req, res, next) {
	try {
		const id = req.params.id;

		if (!id) throw new Error("Id is required");

		await LivroService.deleteLivroInfo(id);

		res.send({
			success: true,
			message: "Book info deleted succesfully",
			data: null,
		});
	} catch (error) {
		next(error);
	}
}

async function insertAvaliacao(req, res, next) {
	try {
		const id = req.params.id;
		const avaliacao = req.body;

		if (!id) throw new Error("Id is required");

		//prettier-ignore
		if (!avaliacao || !avaliacao.nome || !avaliacao.nota || !avaliacao.avaliacao)
            throw new Error("The fields nome, nota and avaliacao are required");

		await LivroService.insertAvaliacao(id, avaliacao);

		res.send({
			success: true,
			message: "Avaliacao created successfully",
			data: null,
		});
	} catch (error) {
		next(error);
	}
}

async function deleteAvaliacao(req, res, next) {
	try {
		const id = req.params.id;
		const index = req.params.index;

		if (!id) throw new Error("Id is required");

		if (!index) throw new Error("Index is required");

		await LivroService.deleteAvaliacao(id, index);

		res.send({
			success: true,
			message: "Avaliacao deleted successfully",
			data: null,
		});
	} catch (error) {
		next(error);
	}
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
