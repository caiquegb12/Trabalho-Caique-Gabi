const express = require('express');
const app = express();
const db = require('./db');
const port = 3000;

app.use(express.json());

app.get('/clientes', (req, res) => {
    db.query('select * from clientes', (error, results) => {
        if(error) {
            res.status(500).json('Erro ao Puxar a tabela Clientes')
        }
        res.status(200).json(results)

    })
});

app.post('/clientes', (req, res) => {
    const {nome, email, telefone, cpf } = req.body;

    db.query('INSERT INTO clientes (nome, email, telefone, cpf) VALUES (?, ?, ?, ?)',[nome, email, telefone, cpf], (error, results) => {
            if (error) {
               res.status(500).json(`Houve um erro ao cadastrar o Clientes`)
            }
            res.status(201).json('Clientes cadastrado com sucesso');
        }
    );
});

app.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM clientes WHERE id = ?', [id], (err, results) => {
        if(err) {
            console.log('Houve um erro ao deletar o clientes');
            res.status(500).json('Houve um erro ao deletar o cliente');
        }
        res.status(200).json('Cliente deletado com sucesso!');
    });
});

app.put('/clientes/:id', (req, res) => {
    const { id } = req.params; 
    const {nome, email, telefone, cpf} = req.body;
    db.query('UPDATE clientes SET nome = ?, email = ?, telefone = ?, cpf = ? WHERE id = ?', [nome, email, telefone, cpf, id], (err, results) => {
        if(err) {
            res.status(500).json('Houve um erro ao atualizar algo da tabela de clientes');
        }
        res.status(200).json('Clientes atualizado com sucesso!');
    });
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});