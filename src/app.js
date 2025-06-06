const express = require("express");
// const produtos = require('../produtos');
const produtos = require('../models/produtos');
// const clientes = require('../clientes');
const clientes = require('../models/clientes');

const app = express();

// analisar o payload JSON recebido e disponibilizar esses dados no  req.body  
app.use(express.json());

// Rota "/" Raiz.. Mensagem de teste de funcionamento - Excluir no futuro
// caso não seja necessário
app.get('/', (req, res) => {
    res.status(200).send("Mensagem teste - API UP!")
});

//rota "/produto" processa requisições para a rota
app.get('/produtos', async (req, res, next) => {
    try {
        res.status(200).send(await produtos.findAll());
    } catch (error) {
        throw error;
    }
});

app.post('/produtos', async (req, res, next) => {
    try{
        const produto = req.body;
        const produto_data = {
            "descricao": produto.descricao, 
            "preco": produto.preco,
        }
        res.status(200).send(await produtos.create(produto_data));
    } catch (error) {
        throw error;
    }
});

app.get('/clientes', (req, res, next) => {
    try{
        res.status(200).send(clientes)
    } catch (error) {
        throw error;
    }
});

app.post('/clientes', async (req, res, next) => {
    try{
        const cliente = req.body;
        const cliente_data = {
            "nome": cliente.nome, 
            "cpf": cliente.cpf,
            "email": cliente.email,
        }
        res.status(200).send(await clientes.create(cliente_data));
    }
    catch (error) {
        throw error;
    }
});

// realiza tratamento de erro quando rota não encontrada - erro 404 page not fount!
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    console.log(err.status);
    next(err);
});


// caso tenha erro, envia o erro e mensagem 
app.use((err, req, res, next) => {
    res.status(err.status).send({ error: err.message })
})

module.exports = app;