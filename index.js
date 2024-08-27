const express = require('express');
const BlockChain = require('./blockChain');
const bodyParser = require('body-parser');

const app = express();
const blockChain = new BlockChain();

app.use(bodyParser.json());

app.get('/api/blocks',(req,res) => {
    res.json(blockChain.chain);
})

app.post('/api/mine',(req,res) => {
    const {data} = req.body;
    blockChain.addToBlock({data});
    res.redirect('/api/blocks');
})

const PORT = 3000;

app.listen(PORT,()=> {
    console.log(`listening to Port ${PORT}`);
})



