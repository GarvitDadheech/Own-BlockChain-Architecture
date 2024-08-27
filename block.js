const { genesis_data } = require('./config');
const {cryptoHash} = require('./crypto-hash');

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
        const difficulty = prevBlock.difficulty;

        let nonce = 0;
        do{
            nonce++;
            timeStamp = Date.now();
            hash = cryptoHash(timeStamp,prevHash,data,nonce,difficulty);
        } while(hash.substring(0,difficulty)!='0'.repeat(difficulty));

        return new this({timeStamp, prevHash, data,difficulty,nonce,hash});
    }
}

module.exports = { Block };
