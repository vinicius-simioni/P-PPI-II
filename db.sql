CREATE TABLE IF NOT EXISTS autores (
  id INT NOT NULL,
  nome VARCHAR(255) NULL,
  PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS editora (
  id INT NOT NULL,
  nome VARCHAR(255) NULL,
  PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS livros (
  id INT NOT NULL,
  titulo VARCHAR(255) NULL,
  id_autor INT NULL,
  id_editora INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_autor) REFERENCES autores (id)
  FOREIGN KEY (id_editora) REFERENCES editora (id));


CREATE TABLE IF NOT EXISTS usuarios (
  id INT NOT NULL,
  nome VARCHAR(255) NULL,
  email VARCHAR(255) NULL,
  senha VARCHAR(255) NULL,
  PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS usuarios_livros (
  id INT NOT NULL,
  id_usuarios INT NULL,
  id_livros INT NULL,
  status CHAR(1) NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_usuarios) REFERENCES usuarios (id),
  FOREIGN KEY (id_livros) REFERENCES livros (id))

CREATE TABLE IF NOT EXISTS avaliacoes (
  id INT NOT NULL,
  id_usuarios INT NULL,
  pontualidade INT NULL,
  conservacao_livro INT NULL,
  livro_disponivel TINYINT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_usuarios) REFERENCES usuarios (id));

