const {Block} = require('./block');

class BlockChain{

    constructor() {
        this.chain = [Block.genesis()];
    }

    addToBlock({data}) {
        const newBlock = Block.mineBlock({
            prevBlock: this.chain[this.chain.length-1],
            data: data
        });
        this.chain.push(newBlock);
    }
}

const blockchain = new BlockChain();
blockchain.addToBlock({data:"block 1"})
console.log(blockchain);
module.exports = {BlockChain}

