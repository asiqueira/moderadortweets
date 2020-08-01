const sqlite3 = require('sqlite3');

//CONEXÃO COM O BANCO DE DADOS
let db = new sqlite3.Database('./db/moderadortweets.db');
console.log('Conexão com o banco de dados aberta');

//TABELA QUE ARMAZENARÁ OS TWEETS
db.run('DROP TABLE IF EXISTS tweets');
db.run('CREATE TABLE IF NOT EXISTS tweets (id_tweet INTEGER PRIMARY KEY, nm_screen_name TEXT NULL, nm_url_imagem TEXT NULL, tx_mensagem TEXT NULL, nm_status TEXT NULL, nm_postagem TEXT NULL)');
console.log('Tabela de tweets criada.');

//FECHANDO CONEXÃO COM O BANCO DE DADOS
db.close();
console.log('Conexão com o banco de dados fechada.');