import VendaRepository from "../repositories/venda.repository.js";
import LivroRepository from "../repositories/livro.repository.js";

async function insertVenda(venda) {
	const livro = await LivroRepository.getLivro(venda.livroId);

	if (livro) {
		if (livro.estoque > 0) {
			venda.valor = livro.valor;
			venda.data = new Date();
			livro.estoque--;
			await LivroRepository.updateLivro(livro);
			return await VendaRepository(venda);
		}

		throw new Error("There is no book in the inventory");
	}

	throw new Error("Book not found");
}

async function getVenda(id) {
	return await VendaRepository.getVenda(id);
}

async function getVendas(clienteId, livroId, autorId) {
	if (clienteId) return await VendaRepository.getVendasByCliente(clienteId);
	if (livroId) return await VendaRepository.getVendasByLivro(livroId);
	if (autorId) return await VendaRepository.getVendasByAutor(autorId);
	return await VendaRepository.getVendas();
}

export default {
	insertVenda,
	getVenda,
	getVendas,
};
