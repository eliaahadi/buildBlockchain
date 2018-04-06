import React, { Component } from 'react';

import '../styles/index.css';



/* 
Develop a frontend, where a user can see every fellow user’s public addresses, 
  and send currency to the individual. 
This frontend could show the current difficulty of the system. 
It could have buttons for mining the transactions, 
  or viewing the blockchain data. Use your imagination.
*/

class App extends Component {

  constructor(props) {
    super(props);
  }

 
   async componentDidMount() {

    const blocksResponse = await fetch(
      `/blocks`,
      {
        method: 'GET',
        headers: new Headers({
          'content-type': 'application/json',
        }),
      },
    );
    const blocks = await blocksResponse.json();
    console.log("blocks data ", blocks);
  }

  render() {
    return (
      <div className="App">
        Hello Elia
      </div>
    );
  }
}

export default App;

/*

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

*/