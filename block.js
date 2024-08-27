const { genesis_data, mine_rate } = require('./config');
const {cryptoHash} = require('./crypto-hash');
const hexToBinary = require('hex-to-binary');

class Block {
    constructor({ timeStamp, data, prevHash, hash, nonce, difficulty }) {
        this.timeStamp = timeStamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = hash;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis() {
        return new this(genesis_data);
    }

    static mineBlock({ prevBlock, data }) {
        let hash,timeStamp;
        const prevHash = prevBlock.hash;
        let difficulty = prevBlock.difficulty;
        let nonce = 0;
        do{
            nonce++;
            timeStamp = Date.now();
            difficulty = Block.adjustDifficulty({originalBlock:prevBlock,timeStamp});
            hash = cryptoHash(timeStamp,prevHash,data,nonce,difficulty);
        } while(hexToBinary(hash).substring(0,difficulty)!="0".repeat(difficulty));

        return new this({timeStamp, prevHash, data,difficulty,nonce,hash});
    }

    static adjustDifficulty({originalBlock,timeStamp}) {
        const difficulty = originalBlock.difficulty;
        if(difficulty<1) {
            return 1;
        }
        const difference = timeStamp-originalBlock.timeStamp;
        if(difference>mine_rate) {
            return difficulty-1;
        }
        else{
            return difficulty+1;
        }

    }


}

module.exports = { Block };
