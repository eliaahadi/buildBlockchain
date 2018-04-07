const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../server/blockchain/blockchain');
const P2pServer = require('./p2p-server');
const Wallet = require('../server/wallet/wallet');
const TransactionPool = require('../server/wallet/transaction-pool');
const Miner = require('./miner');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();
const wallet = new Wallet();
const tp = new TransactionPool();
const p2pServer = new P2pServer(bc, tp);
const miner = new Miner(bc, tp, wallet, p2pServer);

app.use(bodyParser.json());

// this endpoint checks the blocks chain
app.get('/blocks', (req, res) => {
  res.json(bc.chain);
});

// this endpoint posts new block and syncs to peer to peer server
app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`);

  p2pServer.syncChains();

  res.redirect('/blocks');
});

/* post on localhost:3001 
{
"data": "foo"
}
*/ 

// this endpoint gets the transactions
app.get('/transactions', (req, res) => {
  res.json(tp.transactions);
});

// this endpoint posts and broadcasts transaction
app.post('/transact', (req, res) => {
  const { recipient, amount } = req.body;
  const transaction = wallet.createTransaction(recipient, amount, bc, tp);
  p2pServer.broadcastTransaction(transaction);
  res.redirect('/transactions');
});

// this endpoint gets new block mined
app.get('/mine-transactions', (req, res) => {
  const block = miner.mine();
  console.log(`New block added: ${block.toString()}`);
  res.redirect('/blocks');
});

// this endpoint gets public key from wallet
app.get('/public-key', (req, res) => {
  res.json({ publicKey: wallet.publicKey });
});

// this endpoint allows the user to calculate their balance based on the blockchain, and view it at any time.
app.get('/balance', (req, res) => {
  res.json({ wallet: wallet.calculateBalance(bc) });
});

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();