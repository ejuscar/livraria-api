import AutorService from "../services/autor.service.js";

async function insertAutor(req, res, next) {
	try {
		const autor = req.body;

		if (!autor || !autor.nome || !autor.email || !autor.telefone)
			throw new Error("The fields nome, email and telefone are required");

		const autorCreated = await AutorService.insertAutor(autor);

		res.send({
			success: true,
			message: "The auhor was created successfully",
			data: autorCreated,
		});
	} catch (error) {
		next(error);
	}
}

async function updateAutor(req, res, next) {
	try {
		const autor = req.body;

		// prettier-ignore
		if (!autor || !autor.autorId || !autor.nome || !autor.email || !autor.telefone)
			throw new Error("The fields autorId, nome, email and telefone are required");

		const autorUpdated = await AutorService.updateAutor(autor);

		res.send({
			success: true,
			message: "The auhor was updated successfully",
			data: autorUpdated,
		});
	} catch (error) {
		next(error);
	}
}

async function deleteAutor(req, res, next) {
	try {
		const id = req.params.id;

		if (!id) throw new Error("Id is required");

		await AutorService.deleteAutor(id);

		res.send({
			success: true,
			message: "The auhor was deleted successfully",
			data: null,
		});
	} catch (error) {
		next(error);
	}
}

async function getAutores(req, res, next) {
	try {
		res.send({
			success: true,
			message: "Authors retrieved successfully",
			data: await AutorService.getAutores(),
		});
	} catch (error) {
		next(error);
	}
}

async function getAutor(req, res, next) {
	try {
		const id = req.params.id;

		if (!id) throw new Error("Id is required");

		res.send({
			success: true,
			message: "Author retrieved successfully",
			data: await AutorService.getAutor(id),
		});
	} catch (error) {
		next(error);
	}
}

export default {
	insertAutor,
	updateAutor,
	deleteAutor,
	getAutores,
	getAutor,
};
