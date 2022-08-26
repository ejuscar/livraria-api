import request from "supertest";
import app from "../app.js";
import db from "../repositories/db.js";
import VendaRepository from "../repositories/venda.repository.js";

let autorRequest = {
	nome: "Autor Teste",
	email: "autorteste@teste.com",
	telefone: "(16) 99191-9191",
};

let livroRequest = {
	nome: "As cronicas do teste",
	valor: "123",
	estoque: 123,
	autorId: null,
};

let clienteRequest = {
	nome: "Cliente Teste",
	email: "clienteteste@teste.com",
	senha: "senhateste",
	telefone: "(16) 99393-9393",
	endereco: "Rua Teste, 0, Bairro Teste",
};

let vendaRequest = {
	vendaId: null,
	valor: "123",
	data: new Date(),
	clienteId: null,
	livroId: null,
};

const admin = "admin";
const adminPassword = "desafio-igti-nodejs";

const clienteUser = clienteRequest.email;
const clientePassword = clienteRequest.senha;

test("CENARIO 01", async () => {
	let res = await request(app)
		.post("/autor")
		.send(autorRequest)
		.auth(admin, adminPassword);

	expect(res.status).toBe(200);

	autorRequest.autorId = res.body.data.autorId;
	expect(res.body.data).toMatchObject(autorRequest);

	res = await request(app)
		.get(`/autor/${autorRequest.autorId}`)
		.auth(admin, adminPassword);

	expect(res.status).toBe(200);
	expect(res.body.data).toMatchObject(autorRequest);

	livroRequest.autorId = autorRequest.autorId;

	res = await request(app)
		.post("/livro")
		.send(livroRequest)
		.auth(admin, adminPassword);

	expect(res.status).toBe(200);
	livroRequest.livroId = res.body.data.livroId;

	expect(res.body.data).toMatchObject(livroRequest);

	res = await request(app)
		.get(`/livro/${livroRequest.livroId}`)
		.auth(admin, adminPassword);

	expect(res.status).toBe(200);
	expect(res.body.data).toMatchObject(livroRequest);

	res = await request(app)
		.post("/cliente")
		.send(clienteRequest)
		.auth(admin, adminPassword);

	expect(res.status).toBe(200);
	clienteRequest.clienteId = res.body.data.clienteId;

	expect(res.body.data.email).toBe(clienteRequest.email);
	expect(res.body.data.endereco).toBe(clienteRequest.endereco);
	expect(res.body.data.nome).toBe(clienteRequest.nome);
	expect(res.body.data.telefone).toBe(clienteRequest.telefone);

	res = await request(app)
		.get(`/cliente/${clienteRequest.clienteId}`)
		.auth(admin, adminPassword);

	expect(res.status).toBe(200);
	clienteRequest.clienteId = res.body.data.clienteId;

	expect(res.body.data.email).toBe(clienteRequest.email);
	expect(res.body.data.endereco).toBe(clienteRequest.endereco);
	expect(res.body.data.nome).toBe(clienteRequest.nome);
	expect(res.body.data.telefone).toBe(clienteRequest.telefone);
});

test("CENARIO 02", async () => {
	var response = await request(app)
		.get(`/livro/${livroRequest.livroId}`)
		.auth(clienteUser, clientePassword);

	var newLivro = { ...livroRequest, livroInfo: null };

	expect(response.status).toBe(200);
	expect(response.body.data).toMatchObject(newLivro);

	// ================= CRIAR UMA VENDA ===================
	vendaRequest.clienteId = clienteRequest.clienteId;
	vendaRequest.livroId = livroRequest.livroId;
	response = await request(app)
		.post("/venda")
		.send(vendaRequest)
		.auth(clienteUser, clientePassword);

	expect(response.status).toBe(200);
	vendaRequest.vendaId = response.body.data.vendaId;

	expect(response.body.data.vendaId).toBe(vendaRequest.vendaId);
	expect(response.body.data.clienteId).toBe(vendaRequest.clienteId);
	expect(response.body.data.livroId).toBe(vendaRequest.livroId);
	expect(response.body.data.valor).toBe(vendaRequest.valor);
});

afterAll(async () => {
	// DELETE all:
	if (vendaRequest.vendaId)
		await VendaRepository.deleteVenda(vendaRequest.vendaId);

	if (livroRequest.livroId)
		await request(app)
			.delete(`/livro/${livroRequest.livroId}`)
			.auth(admin, adminPassword);

	if (autorRequest.autorId)
		await request(app)
			.delete(`/autor/${autorRequest.autorId}`)
			.auth(admin, adminPassword);

	if (clienteRequest.clienteId)
		await request(app)
			.delete(`/cliente/${clienteRequest.clienteId}`)
			.auth(admin, adminPassword);

	await db.close();
});
