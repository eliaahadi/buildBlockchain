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
	async componentWillMount() {
    	/* 
	componentDidMount() {
		//GET IMAGES FROM API
		axios.get('/api/images')
			.then(function(response){
				this.setState({images:response.data});
			}.bind(this))
			.catch(function(err){
				this.setState({images:'error loading image files from the server', img:''});
			}.bind(this));
    

		const blocksResponse = function(dispatch){
			axios.get('/api/blocks')
				.then((response)=>{
          console.log("response data", response.data);
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
		return blocksResponse;
	}
   */
    const blocksResponse = await fetch(`api/blocks`,
      {
        method: 'GET',
        headers: new Headers({
          'content-type': 'application/json',
        }),
      },
    ).then(response => response.json())
    .then(data => this.setState({ blocks: data }))
    .catch(err => console.error('Error ', err.toString()));

    // const blocksR = await blocksResponse.json();
    // this.setState({
    //   blocks: blocksR
    // });
    // console.log("blocks data ", blocksR);
    console.log("blocks state ", this.state.blocks, "blocks object ", this.state.blocks[0], this.state.blocks[0].hash);
    /* blocks object
    {timestamp: "Genesis time", lastHash: "-----", hash: "f1r57-h45h", data: Array(0), nonce: 0, …}
    */
  //  const blockMap = this.state.blocks[0].map((object) => {
  //   // Only do this if items have no stable IDs
  //   console.log("block map", object);
  //   });

  // let blockObject = this.state.blocks[0];
  // const blockMap = Object.keys(blockObject).map((obj, i) => {
  //     console.log(blockObject[obj]);
  // });
     



  }

  // componentWillUnmount() {
  //   clearInterval(this.state.blocks);
  // }

  async mappedBlockData() {
   setTimeout(() => {
  //     let blockObject = this.state.blocks[0];
  //     console.log("block obj function ", blockObject);
  //   //  alert(JSON.stringify(blockObject));
  //     let mappedBlockData = Object.keys(blockObject).map((obj, i) => {  
  //       console.log("mapped blockObject ", blockObject);
  //       <li>{blockObject}</li>
  //     });  
  console.log("blockentries ");
   }, 3000);
   

  //  const j = Object.values(this.state.blocks[0]);
  //  var blockEntries = [];

  //    for (var i = 0; i < j.length; i++){
  //     blockEntries.push(
          
  //        <div>
  //        <h3>{j[i]}</h3>
       
  //        </div>);

  //    }
   
  }

  /* sample post transaction 
  {
	"recipient": "foo-4dr3ss",
	"amount": 50
  }
  */
  async postTransactions() {
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

  async postmine() {
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



	render() {
		return (
			<div className="App">
				<Navbarheader />
				<img width={900} height={300} alt="900x300" src="/images/blockchain.png"/>
        <br />
        <h2>
        Blockchain App!
        </h2>
        <h3>Block data</h3>
        <button onClick={() => alert(JSON.stringify(this.state.blocks[0]))}>
          Block data
        </button>
        <button onClick={() => this.mappedBlockData}>
          Text
        </button>
       
        <br />
        <br />
				<button onClick={() => this.getPublicKey()}>
          Get PublicKey
        </button>
        
        <br />
        <br />
				<button onClick={() => this.getTransactions()}>
          Get Transactions
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