const express = require('express');
const app = express();
const db = require('./db');
const port = 3000;

app.use(express.json());

app.get('/itens_pedidos', (req, res) => {
    db.query('select * from itens_pedidos', (error, results) => {
        if(error) {
            res.status(500).json('Erro ao Puxar a tabela itens_pedidos')
        }
        res.status(200).json(results)

    })
});

app.post('/itens_pedidos', (req, res) => {
    const {nome_produto, produto_id, pedido_id, NumeroDoPedido} = req.body;

    db.query('INSERT INTO itens_pedidos (nome_produto, produto_id, pedido_id, NumeroDoPedido) VALUES (?, ?, ?, ?)',[nome_produto,  produto_id, pedido_id, NumeroDoPedido], (error, results) => {
            if(error) {
               return res.status(500).json(`Houve um erro ao cadastrar o itens_pedido: ${error}`)
            }
            res.status(201).json('Itens_pedidos cadastrado com sucesso');
        }
    );
});

app.delete('/itens_pedidos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM itens_pedidos WHERE id = ?', [id], (err, results) => {
        if(err) {
            console.log('Houve um erro ao deletar o pedidos');
            res.status(500).json('Houve um erro ao deletar o pedidos');
        }
        res.status(200).json('Pedidos deletado com sucesso!');
    });
});

app.put('/itens_pedidos/:id', (req, res) => {
    const { id } = req.params; 
    const {nome, produto_id, pedido_id, NumeroDoPedido} = req.body;
    db.query('UPDATE itens_pedidos SET nome_produto = ?, produto_id = ?, pedido_id = ?, NumeroDoPedido = ? WHERE id = ?', [nome, produto_id, pedido_id, NumeroDoPedido, id], (err, results) => {
        if(err) {
            res.status(500).json('Houve um erro ao atualizar algo da tabela de pedidos');
        }
        res.status(200).json('Pedidos atualizado com sucesso!');
    });
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});