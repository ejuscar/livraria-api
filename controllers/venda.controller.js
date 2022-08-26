import VendaService from "../services/venda.service.js";

async function insertVenda(req, res, next) {
	try {
		const venda = req.body;

		//prettier-ignore
		if (UserAuthenticated.isAdmin ||
			(UserAuthenticated.isCliente && parseInt(venda.clienteId) === parseInt(UserAuthenticated.userId))) {

			if (!venda || !venda.clienteId || !venda.livroId)
				throw new Error(
					"The fields clienteId and livroId are required"
				);

			const vendaCreated = await VendaService.insertVenda(venda);

			res.send({
				success: true,
				message: "Sale created successfully",
				data: vendaCreated,
			});
		} 
		
		else {
			res.status(401).send("Role not allowed");
		}
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

		const isAllowed =
			UserAuthenticated.isCliente &&
			clienteId &&
			parseInt(clienteId) === parseInt(UserAuthenticated.userId);

		if (UserAuthenticated.isAdmin || isAllowed) {
			res.send({
				success: true,
				message: "Sales returned succesfully",
				data: await VendaService.getVendas(clienteId, livroId, autorId),
			});
		} else {
			res.status(401).send("Role not allowed");
		}
	} catch (error) {
		next(error);
	}
}

export default {
	insertVenda,
	getVenda,
	getVendas,
};
