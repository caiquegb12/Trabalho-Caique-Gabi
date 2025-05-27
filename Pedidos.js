const express = require('express');
const app = express();
const db = require('./db');
const port = 3000;

app.use(express.json());

app.get('/pedidos', (req, res) => {
    db.query('select * from pedidos', (error, results) => {
        if(error) {
            res.status(500).json('Erro ao Puxar a tabela Pedidos')
        }
        res.status(200).json(results)

    })
});

app.post('/pedidos', (req, res) => {
    const {cliente_id, nome, NumeroDoPedido, data_pedido} = req.body;

    db.query('INSERT INTO pedidos (cliente_id, nome, NumeroDoPedido, data_pedido) VALUES (?, ?, ?, ?)',[cliente_id, nome, NumeroDoPedido, data_pedido], (error, results) => {
            if (error) {
               res.status(500).json(`Houve um erro ao cadastrar o Pedidos`)
            }
            res.status(201).json('Pedidos cadastrado com sucesso');
        }
    );
});

app.delete('/pedidos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM pedidos WHERE id = ?', [id], (err, results) => {
        if(err) {
            console.log('Houve um erro ao deletar o pedidos');
            res.status(500).json('Houve um erro ao deletar o pedidos');
        }
        res.status(200).json('Pedidos deletado com sucesso!');
    });
});

app.put('/pedidos/:id', (req, res) => {
    const { id } = req.params; 
    const {cliente_id, nome, NumeroDoPedido, data_pedido} = req.body;
    db.query('UPDATE pedidos SET cliente_id = ?, nome = ?, NumeroDoPedido = ?, data_pedido = ? WHERE id = ?', [cliente_id, nome, NumeroDoPedido, data_pedido, id], (err, results) => {
        if(err) {
            res.status(500).json('Houve um erro ao atualizar algo da tabela de pedidos');
        }
        res.status(200).json('Pedidos atualizado com sucesso!');
    });
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});