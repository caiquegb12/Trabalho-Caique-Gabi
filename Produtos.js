const express = require('express');
const app = express();
const db = require('./db');
const port = 3000;

app.use(express.json());

app.get('/produtos', (req, res) => {
    db.query('select * from produtos', (error, results) => {
        if(error) {
            res.status(500).json('Erro ao Puxar a tabela Produtos')
        }
        res.status(200).json(results)

    })
});

app.post('/produtos', (req, res) => {
    const {nome, modelo, preco, quantidade } = req.body;

    db.query('INSERT INTO produtos (nome, modelo, preco, quantidade) VALUES (?, ?, ?, ?)',[nome, modelo, preco, quantidade], (error, results) => {
            if (error) {
               res.status(500).json(`Houve um erro ao cadastrar o Produto`)
            }
            res.status(201).json('Produtos cadastrado com sucesso');
        }
    );
});

app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM produtos WHERE id = ?', [id], (err, results) => {
        if(err) {
            console.log('Houve um erro ao deletar o produtos');
            res.status(500).json('Houve um erro ao deletar o produtos');
        }
        res.status(200).json('Produtos deletado com sucesso!');
    });
});

app.put('/produtos/:id', (req, res) => {
    const { id } = req.params; 
    const {nome, modelo, preco, quantidade} = req.body;
    db.query('UPDATE produtos SET nome = ?, modelo = ?, preco = ?, quantidade = ? WHERE id = ?', [nome, modelo, preco, quantidade, id], (err, results) => {
        if(err) {
            res.status(500).json('Houve um erro ao atualizar algo da tabela de produtos');
        }
        res.status(200).json('Produtos atualizado com sucesso!');
    });
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});