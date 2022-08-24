import VendaService from "../services/venda.service.js";

async function insertVenda(req, res, next) {
	try {
		const venda = req.body;

		if (!venda || !venda.clienteId || !venda.livroId)
			throw new Error("The fields clienteId and livroId are required");

		const vendaCreated = await VendaService.insertVenda(venda);

		res.send({
			success: true,
			message: "Sale created successfully",
			data: vendaCreated,
		});
	} catch (error) {
		next(error);
	}
}

async function getVenda(req, res, next) {
	try {
		const id = req.params.id;

		if (!id) throw new Error("Id is required");

		res.send({
			success: true,
			message: "Venda retrieved succesfully",
			data: await VendaService.getVenda(id),
		});
	} catch (error) {
		next(error);
	}
}

async function getVendas(req, res, next) {
	try {
		const clienteId = req.query.clienteId;
		const livroId = req.query.livroId;
		const autorId = req.query.autorId;

		res.send({
			success: true,
			message: "Sales returned succesfully",
			data: await VendaService.getVendas(clienteId, livroId, autorId),
		});
	} catch (error) {
		next(error);
	}
}

export default {
	insertVenda,
	getVenda,
	getVendas,
};
