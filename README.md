# Trabalho-Caique-Gabi

Trabalho em grupo: APIs REST em Node.js (Express) com MySQL para gestão de uma loja. Cada arquivo é uma API com CRUD (GET, POST, PUT, DELETE):

- `Clientes.js`: clientes
- `Fornecedor.js`: fornecedores
- `Produtos.js`: produtos
- `Pedidos.js`: pedidos
- `itens_pedidos.js`: itens dos pedidos
- `db.js`: conexão com o banco de dados

## Como rodar

```
npm install
node Clientes.js
```

Troque `Clientes.js` pelo arquivo da API desejada. Cada uma sobe em http://localhost:3000, então rode uma por vez. É necessário um MySQL com as tabelas correspondentes e a conexão configurada em `db.js`.

## Tecnologias

Node.js, Express, MySQL (mysql2), bcrypt.
