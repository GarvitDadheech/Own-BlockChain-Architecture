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
            const {timeStamp,prevHash,hash,nonce,difficulty,data} = chain[i];
            const lastHash = chain[i-1].hash;
            const lastDifficulty = chain[i-1].difficulty;
            if(prevHash!=lastHash) {
                return false;
            }
            const validatedHash = cryptoHash(timeStamp,prevHash,nonce,difficulty,data);
            if(hash!=validatedHash) {
                return false;
            }
            if(Math.abs(lastDifficulty-difficulty)>1) {
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

module.exports = BlockChain

