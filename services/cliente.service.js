import ClienteRepository from "../repositories/cliente.repository.js";
import VendaRepository from "../repositories/venda.repository.js";

async function insertCliente(cliente) {
	return await ClienteRepository.insertCliente(cliente);
}

async function updateCliente(cliente) {
	return await ClienteRepository.updateCliente(cliente);
}

async function deleteCliente(id) {
	const cliente = ClienteRepository.getCliente(id);

	if (cliente) {
		const vendasCliente = await VendaRepository.getVendasByCliente(id);
		if (vendasCliente.length > 0)
			throw new Error(
				"Client can't be removed. There are sales related to him"
			);

		await ClienteRepository.deleteCliente(id);
		return;
	}

	throw new Error("Client not found");
}

async function getClientes() {
	return await ClienteRepository.getClientes();
}

async function getCliente(id) {
	return await ClienteRepository.getCliente(id);
}

export default {
	insertCliente,
	updateCliente,
	deleteCliente,
	getClientes,
	getCliente,
};
