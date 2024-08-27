const { genesis_data } = require('./config');
const {cryptoHash} = require('./crypto-hash');

class Block {
    constructor({ timeStamp, data, prevHash, hash }) {
        this.timeStamp = timeStamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = hash;
    }

    static genesis() {
        return new this(genesis_data);
    }

    static mineBlock({ prevBlock, data }) {
        const timeStamp = Date.now();
        const prevHash = prevBlock.hash;
        return new this({
            timeStamp,
            data,
            prevHash,
            hash: cryptoHash(timeStamp, prevHash, data)
        });
    }
}

module.exports = { Block };
