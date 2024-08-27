const {Block} = require('./block');
const { cryptoHash } = require('./crypto-hash');

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

    static isValidChain(chain) {
        if(JSON.stringify(chain[0])!=JSON.stringify(Block.genesis())) {
        return false;
        }
        for(let i = 1;i<chain.length;i++) {
            const {timeStamp,prevHash,hash,data} = chain[i];
            const lastHash = chain[i-1].hash;
            if(prevHash!=lastHash) {
                return false;
            }
            const validatedHash = cryptoHash(timeStamp,prevHash,data);
            if(hash!=validatedHash) {
                return false;
            }
        }
        return true;
    }

    replaceChain(chain) {
        if(chain.length<=this.chain.length) {
            console.error("The incoming chain is not longer than the existing chain.");
            return;
        }
        if(!BlockChain.isValidChain(chain)) {
            console.error("The incoming chain is not a valid chain.");
            return;
        }
        this.chain = chain;

    }


}

const blockchain = new BlockChain();
blockchain.addToBlock({data:"block 1"})
console.log(blockchain);
module.exports = {BlockChain}

