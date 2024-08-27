const mine_rate = 1000;
const initial_difficulty = 2;
const genesis_data = {
    timeStamp: 1,
    prevHash: '0x000',
    hash: '0x001',
    data: [],
    difficulty: initial_difficulty,
    nonce:0
}
module.exports = {genesis_data,mine_rate};