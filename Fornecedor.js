const express = require('express');
const app = express();
const db = require('./db');
const port = 3000;

app.use(express.json());

app.get('/fornecedores', (req, res) => {
    db.query('select * from fornecedores', (error, results) => {
        if(error) {
            res.status(500).json('Erro ao Puxar a tabela fornecedores')
        }
        res.status(200).json(results)

    })
});



app.delete('/fornecedores/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM fornecedores WHERE id = ?', [id], (err, results) => {
        if(err) {
            console.log('Houve um erro ao deletar o fornecedor');
            res.status(500).json('Houve um erro ao deletar o cliente');
        }
        res.status(200).json('Fornecedor deletado com sucesso!');
    });
});

app.put('/fornecedores/:id', (req, res) => {
    const { id } = req.params; 
    const {nome, email, telefone, cpf} = req.body;
    db.query('UPDATE fornecedores SET nome = ?, email = ?, telefone = ?, cpf = ? WHERE id = ?', [nome, email, telefone, cpf, id], (err, results) => {
        if(err) {
            res.status(500).json('Houve um erro ao atualizar algo da tabela de fornecedores');
        }
        res.status(200).json('Fornecedor atualizado com sucesso!');
    });
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});