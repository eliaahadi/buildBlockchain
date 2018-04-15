'use strict';
import React, { Component } from 'react';
import {Grid, Row, Button, Nav, NavItem, Navbar, Badge} from 'react-bootstrap';
import axios from 'axios';
import '../styles/index.css';
import Navbarheader from './Navbar';
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
		this.state = {
			blocks: []
		};
	}

	// connect to backend and render page initially on localhost:4001
	// async componentDidMount() {
	componentDidMount() {
		// //GET IMAGES FROM API
		// axios.get('/api/images')
		// 	.then(function(response){
		// 		this.setState({images:response.data});
		// 	}.bind(this))
		// 	.catch(function(err){
		// 		this.setState({images:'error loading image files from the server', img:''});
		// 	}.bind(this));
    

		const blocksResponse = function(dispatch){
			axios.get('/api/blocks')
				.then((response)=>{
					this.setState(()=>{
						return {
							blocks: response.data
						};
					});
				})
				.catch(function(err){
					dispatch({type:'GET_BLOCKS_REJECTED',
						msg:'error when getting the blocks'});
				});
		};
		console.log('blocks data ', this.state.blocks);
		//return blocksResponse;
	}
	/*
    const blocksResponse = await fetch(
      `api/blocks`,
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

  async getTransactions() {
    const transResponse = await fetch(
      `api/transactions`,
      {
        method: 'GET',
        headers: new Headers({
          'content-type': 'application/json',
        }),
      },
    );
    const trans = await transResponse.json();
    console.log("transactions data ", transactions);

  }

  async getPublicKey() {
    const publicKeyResponse = await fetch(
      `api/public-key`,
      {
        method: 'GET',
        headers: new Headers({
          'content-type': 'application/json',
        }),
      },
    );
    const publicKey = await publicKeyResponse.json();
    console.log("public key  ", publicKey);

    // router.get('/transactions', (req, res) => {
    //   res.json(tp.transactions);
    // });
  }
  */

	render() {
		return (
	

        
        
			<div className="App">
				<Navbarheader />
				<img width={900} height={300} alt="900x300" src="/images/blockchain.png"/>
				<br />
        Blockchain App!
				<br />
				<br />
				<button onClick={() => console.log('button test')}>
        Get PublicKey
				</button>
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