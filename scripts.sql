DROP TABLE IF EXISTS vendas;
DROP TABLE IF EXISTS livros;
DROP TABLE IF EXISTS autores;
DROP TABLE IF EXISTS clientes;

CREATE TABLE clientes (
	cliente_id SERIAL PRIMARY KEY NOT NULL,
	nome VARCHAR NOT NULL,
	email VARCHAR NOT NULL,
	senha VARCHAR NOT NULL,
	telefone VARCHAR NOT NULL,
	endereco VARCHAR NOT NULL
);

CREATE TABLE autores (
	autor_id SERIAL PRIMARY KEY NOT NULL,
	nome VARCHAR NOT NULL,
	email VARCHAR NOT NULL,
	telefone VARCHAR NOT NULL
);

CREATE TABLE livros (
	livro_id SERIAL PRIMARY KEY NOT NULL,
	nome VARCHAR NOT NULL,
	valor NUMERIC NOT NULL,
	estoque INT NOT NULL,
	autor_id INT NOT NULL,
	FOREIGN KEY (autor_id) REFERENCES autores (autor_id)
);

CREATE TABLE vendas (
	venda_id SERIAL PRIMARY KEY NOT NULL,
	valor NUMERIC NOT NULL,
	data DATE NOT NULL,
	cliente_id INT NOT NULL,
	livro_id INT NOT NULL,
	FOREIGN KEY(cliente_id) REFERENCES clientes (cliente_id),
	FOREIGN KEY(livro_id) REFERENCES livros (livro_id)
);