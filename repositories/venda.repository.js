import Cliente from "../models/cliente.model.js";
import Livro from "../models/livro.model.js";
import Venda from "../models/venda.model.js";

async function insertVenda(venda) {
	try {
		return await Venda.create(venda);
	} catch (error) {
		throw error;
	}
}

async function getVenda(id) {
	try {
		return await Venda.findByPk(id, {
			include: [{ model: Cliente }, { model: Livro }],
		});
	} catch (error) {
		throw error;
	}
}

async function getVendas() {
	try {
		return await Venda.findAll();
	} catch (error) {
		throw error;
	}
}

async function getVendasByCliente(clienteId) {
	try {
		return await Venda.findAll({
			where: {
				clienteId: clienteId,
			},
			include: [{ model: Cliente }],
		});
	} catch (error) {
		throw error;
	}
}

async function getVendasByLivro(livroId) {
	try {
		return await Venda.findAll({
			where: {
				livroId: livroId,
			},
			include: [{ model: Livro }],
		});
	} catch (error) {
		throw error;
	}
}

async function getVendasByAutor(autorId) {
	try {
		return await Venda.findAll({
			include: [
				{
					model: Livro,
					where: {
						autorId: autorId,
					},
				},
			],
		});
	} catch (error) {
		throw error;
	}
}

export default {
	insertVenda,
	getVenda,
	getVendas,
	getVendasByCliente,
	getVendasByLivro,
	getVendasByAutor,
};
