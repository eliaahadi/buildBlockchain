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
      blocks: [],
      value: '',
      transactions: {
        recipient: '',
        amount: ''
      }
		};
	}

	// connect to backend and render page initially on localhost:4001
	// async componentWillMount() {
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
  async getBlocks() {
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
	"recipient":  ,
	"amount": 50
  }
  */
  async postTransactions() {
    const transResponse = await fetch(
      `api/transactions`,
      {
        method: 'POST',
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
        method: 'POST',
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
    console.log("transactions data ", trans);
 
  }

  async getMinedTransactions() {
    const minedTransResponse = await fetch(
      `api/mine-transactions`,
      {
        method: 'GET',
        headers: new Headers({
          'content-type': 'application/json',
        }),
      },
    );
    const minedTrans = await minedTransResponse.json();
    console.log("mined transactions ", minedTrans);
 
  }

  async getBalance() {
    const balanceResponse = await fetch(
      `api/balance`,
      {
        method: 'GET',
        headers: new Headers({
          'content-type': 'application/json',
        }),
      },
    );
    const bal = await balanceResponse.json();
    console.log("wallet balance ", bal);
 
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

  }

  handleChange = (event) => {
    this.setState({value:  event.target.value});
  }

  handleChangeRecepient = (event) => {
    this.setState({ 
      transactions: {
        recipient: event.target.recipient,
        }
    });
  }

  handleChangeAmount = (event) => {
    this.setState({
      transactions: {
        amount: event.target.amount}
    });
  }

  handleSubmit = (event) => {
    console.log('A value was submitted: ', this.state.value);
    event.preventDefault();
  }

  handleSubmitRecepient = (event) => {
    console.log('A transaction recepient was submitted: ', this.state.transactions);
    event.preventDefault();
  }

  handleSubmitAmount = (event) => {
    console.log('A transaction amount was submitted: ', this.state.transactions);
    event.preventDefault();
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

        <button onClick={() => this.getBlocks()}>
        Get Blocks
        </button>

        <form onSubmit={this.handleSubmit}>
        <label>
          Value:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        </form>

        <form onSubmit={this.handleSubmitRecepient}>
        <label>
          recipient:
          <input type="text" value={this.state.transactions.recipient} onChange={this.handleChangeRecepient} />
        </label>
        <input type="submit" value="Submit" />
        </form>

        <br />

        <form onSubmit={this.handleChangeAmount}>
        <label>
          amount:
          <textarea value={this.state.transactions.amount} onChange={this.handleChangeAmount} />
        </label>
        <input type="submit" value="Submit" />
        </form>

        <br />
        <br />
				<button onClick={() => this.getTransactions()}>
          Get Transactions
        </button>  
        <br />
        <br />
				<button onClick={() => this.getMinedTransactions()}>
          Get Mined Transactions
        </button>
        <br />
        <br />
				<button onClick={() => this.getBalance()}>
          Get Balance
        </button>
        <br />
        <br />
				<button onClick={() => this.getPublicKey()}>
          Get PublicKey
        </button>
        
  
			</div>






		);
	}
}

export default App;
