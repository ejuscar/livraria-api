import ClienteService from "../services/cliente.service.js";

async function insertCliente(req, res, next) {
	try {
		const cliente = req.body;

		//prettier-ignore
		if (!cliente || !cliente.nome || !cliente.email || !cliente.senha || !cliente.telefone || !cliente.endereco)
            throw new Error("The fields nome, email, senha, telefone and endereco are required");

		const clienteCreated = await ClienteService.insertCliente(cliente);

		res.send({
			success: true,
			message: "Cliente created successfully",
			data: clienteCreated,
		});
	} catch (error) {
		next(error);
	}
}

async function updateCliente(req, res, next) {
	try {
		const cliente = req.body;

		//prettier-ignore
		if (!cliente || !cliente.clienteId|| !cliente.nome || !cliente.email 
            || !cliente.senha || !cliente.telefone || !cliente.endereco)
            throw new Error("The fields clienteId, nome, email, senha, telefone and endereco are required");

		const clienteUpdated = await ClienteService.updateCliente(cliente);

		res.send({
			success: true,
			message: "Cliente updated successfully",
			data: clienteUpdated,
		});
	} catch (error) {
		next(error);
	}
}

async function deleteCliente(req, res, next) {
	try {
		const id = req.params.id;

		if (!id) throw new Error("Id is required");

		await ClienteService.deleteCliente(id);

		res.send({
			success: true,
			message: "The client was deleted successfully",
			data: null,
		});
	} catch (error) {
		next(error);
	}
}

async function getClientes(req, res, next) {
	try {
		const clientes = (await ClienteService.getClientes()).map((cliente) => {
			cliente.clienteId,
				cliente.nome,
				cliente.email,
				cliente.telefone,
				cliente.endereco;
		});

		res.send({
			success: true,
			message: "Clients retrieved successfully",
			data: clientes,
		});
	} catch (error) {
		next(error);
	}
}

async function getCliente(req, res, next) {
	try {
		const id = req.params.id;

		if (!id) throw new Error("Id is required");

		const cliente = await ClienteService.getCliente(id);

		res.send({
			success: true,
			message: "Client retrieved successfully",
			data: {
				clienteId: cliente.clienteId,
				nome: cliente.nome,
				email: cliente.email,
				telefone: cliente.telefone,
				endereco: cliente.endereco,
			},
		});
	} catch (error) {
		next(error);
	}
}

export default {
	insertCliente,
	updateCliente,
	deleteCliente,
	getClientes,
	getCliente,
};
