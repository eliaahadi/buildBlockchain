const ChainUtil = require('../chain-util');
const { DIFFICULTY, MINE_RATE } = require('../config');

// Create the block class with a file called block.js. 
// Each black has a `lastHash`, `hash`, `data, `nonce`, `diffculty` and `timestamp` attribute.
class Block {
  constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty || DIFFICULTY;
  }

  // convert attributes to strings
  toString() {
    return `Block -
      Timestamp : ${this.timestamp}
      Last Hash : ${this.lastHash.substring(0, 10)}
      Hash      : ${this.hash.substring(0, 10)}
      Nonce     : ${this.nonce}
      Difficulty: ${this.difficulty}
      Data      : ${this.data}`;
  }

  // Every blockchain starts with the "genesis block" - a default dummy block to originate the chain. 
  static genesis() {
    return new this('Genesis time', '-----', 'f1r57-h45h', [], 0, DIFFICULTY);
  }

  // Add a function to add a generate a block based off of some provided `data` to store, and a given `lastBlock.` 	
  // Call the function `mineBlock`. 
  // Generating a block is equated to an act of mining since it takes computational power to “mine” the block. 
  static mineBlock(lastBlock, data) {
    let hash, timestamp;
    const lastHash = lastBlock.hash;
    let { difficulty } = lastBlock;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty(lastBlock, timestamp);
      hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this(timestamp, lastHash, hash, data, nonce, difficulty);
  }

  // convert hash to string
  static hash(timestamp, lastHash, data, nonce, difficulty) {
    return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
  }

  // return the blockHash
  static blockHash(block) {
    const { timestamp, lastHash, data, nonce, difficulty } = block;
    return Block.hash(timestamp, lastHash, data, nonce, difficulty);
  }

  // adjust difficutly of last block
  static adjustDifficulty(lastBlock, currentTime) {
    let { difficulty } = lastBlock;
    difficulty = lastBlock.timestamp + MINE_RATE > currentTime ?
      difficulty + 1 : difficulty - 1;
    return difficulty;
  }
}

module.exports = Block;