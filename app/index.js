const express = require('express');
const Blockchain = require('../blockchain/blockchain');
const HTTP_PORT = process.env.HTTP_PORT || 3001;
const SHA256 = require('crypto-js/sha256');

const app = express();
const bc = new Blockchain();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const P2pServer = require('./p2p-server');
const p2pServer = new P2pServer(bc);

// view responses on localhost:3001/blocks

// GET request blocks endpoint JSON response localhost:3001/blocks
app.get('/blocks', (req, res) => {
  res.json(bc.chain);
});

app.listen(HTTP_PORT, () => console.log(`Listening on port: ${HTTP_PORT}`));

// POST request mine endpoint JSON response localhost:3001/mine
app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`);
  res.redirect('/blocks');
  p2pServer.syncChains();
});

p2pServer.listen();


/* post this data in postman localhost:3001/mine
{
"data": "foo"
}
*/
