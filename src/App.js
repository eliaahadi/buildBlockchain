'use strict';
import React, { Component } from 'react';
import {Grid, Row, Button, Nav, NavItem, Navbar, Badge} from 'react-bootstrap';
import axios from 'axios';
import '../styles/index.css';
import Navbarheader from './Navbar';

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
  }


  async mappedBlockData() {
   setTimeout(() => {
    console.log("blockentries ");
   }, 3000);
  }

  async postTransactions() {
    const transResponse = await fetch(
      `api/transactions`,
      {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json',
        }),
        body: JSON.stringify({ transactions: this.state.transactions }),
      },
    );
    const trans = await transResponse.json();
    console.log("transactions data ", transactions);
  }

  async postMine() {
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
        recipient: event.target.value,
      }
    });
  }

  handleChangeAmount = (event) => {
    this.setState({
      transactions: {
        amount: event.target.value}
    });
  }

  handleSubmit = (event) => {
    console.log('A value was submitted: ', this.state.value);
    event.preventDefault();
  }

  handleSubmitRecepient = (event) => {
    console.log('A transaction recepient was submitted: ', this.state.transactions.recipient);
    event.preventDefault();
  }

  handleSubmitAmount = (event) => {
    console.log('A transaction amount was submitted: ', this.state.transactions.amount);
    event.preventDefault();
  }
  
	render() {
		return (
			<div className="App">
				<Navbarheader />
				<img width={900} height={300} alt="900x300" src="/images/blockchain.png"/>
        <br />
        <h2>
        Blockchain App
        </h2>

        <button onClick={() => this.getBlocks()}>
        Get Blocks
        </button>
        ETO NE
        {this.state.blocks[0]}
        <br />
        <br />
        <text>
        Type in a transaction
        </text>

        <form onSubmit={this.handleSubmitRecepient}>
        <label>
          recipient:
          <input type="text" value={this.state.transactions.recipient} onChange={this.handleChangeRecepient} placeholder="r3c1p13nt" />
        </label>
        
        <input type="submit" value="Submit" />
        </form>

       <form onSubmit={this.handleSubmitAmount}>
        <label>
          amount:
          <input type="text" value={this.state.transactions.amount} onChange={this.handleChangeAmount} placeholder="50" />
        </label>
        
        <input type="submit" value="Submit" />
        </form>

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
