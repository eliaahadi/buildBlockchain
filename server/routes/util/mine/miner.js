const Wallet = require('../wallet/wallet');
const Transaction = require('../wallet/transaction');

// this class adds block, checks if chain is valid, and replaces chain
class Miner {
	constructor(blockchain, transactionPool, wallet, p2pServer) {
		this.blockchain = blockchain;
		this.transactionPool = transactionPool;
		this.wallet = wallet;
		this.p2pServer = p2pServer;
	}

	// this method check if it's a valid transaction, if so mine it and push to wallet, add to blockchain, sync chains
	mine() {
		const validTransactions = this.transactionPool.validTransactions();
		validTransactions.push(
			Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet())
		);
		const block = this.blockchain.addBlock(validTransactions);
		this.p2pServer.syncChains();
		this.transactionPool.clear();
		this.p2pServer.broadcastClearTransactions();

		return block;
	}
}

module.exports = Miner;