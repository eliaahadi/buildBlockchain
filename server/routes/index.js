const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const Blockchain = require('./util/blockchain/blockchain');
const P2pServer = require('./util/mine/p2p-server');
const Wallet = require('./util/wallet/wallet');
const TransactionPool = require('./util/wallet/transaction-pool');
const Miner = require('./util/mine/miner');


// const app = express();
const bc = new Blockchain();
const wallet = new Wallet();
const tp = new TransactionPool();
const p2pServer = new P2pServer(bc, tp);
const miner = new Miner(bc, tp, wallet, p2pServer);

// this endpoint checks the blocks chain
router.get('/blocks', (req, res) => {
	res.json(bc.chain);
});

// this endpoint posts new block and syncs to peer to peer server
router.post('/mine', (req, res) => {
	const block = bc.addBlock(req.body.data);
	console.log(`New block added: ${block.toString()}`);

	p2pServer.syncChains();

	res.redirect('/api/blocks');
});


// this endpoint gets the transactions
router.get('/transactions', (req, res) => {
	res.json(tp.transactions);
});

// this endpoint posts and broadcasts transaction
router.post('/transact', (req, res) => {
	const { recipient, amount } = req.body;
	const transaction = wallet.createTransaction(recipient, amount, bc, tp);
	p2pServer.broadcastTransaction(transaction);
	console.log("transaction data shows: ", transaction);
	console.log("p2p data shows: ", p2pServer, p2pServer.broadcastTransaction(transaction));
	res.redirect('/api/transactions');
});

// this endpoint gets new block mined
router.get('/mine-transactions', (req, res) => {
	const block = miner.mine();
	console.log(`New block added: ${block.toString()}`);
	res.redirect('/api/blocks');
});

// this endpoint gets public key from wallet
router.get('/public-key', (req, res) => {
	res.json({ publicKey: wallet.publicKey });
});

// this endpoint allows the user to calculate their balance based on the blockchain, and view it at any time.
router.get('/balance', (req, res) => {
	res.json({ wallet: wallet.calculateBalance(bc) });
});

p2pServer.listen();

module.exports = router;
