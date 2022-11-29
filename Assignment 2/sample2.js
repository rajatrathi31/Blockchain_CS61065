var Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider("https://goerli.infura.io/v3/61253e256b8e4bf69df3568e597aede1");
const web3 = new Web3(provider);

const account1 = '0x47955cB3A79e5163f7DCCe50f8502dc339b5663b'; // Your account address 1
web3.eth.defaultAccount = account1;

const privateKey1 = Buffer.from('1c33a9d0a622423276d2174f6323693e5fb3b4cb284a72aa1d2ab8f9cf24c094', 'hex');

const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "get",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getmine",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "roll",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newRoll",
				"type": "string"
			}
		],
		"name": "update",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const contract_Address = "0x709830edf8feF92B0d879dE9ee9BdB2400BB5662";

const myContract = new web3.eth.Contract(abi, contract_Address);

const myData = myContract.methods.update('19IE10041').encodeABI();

web3.eth.getTransactionCount(account1, (err, txCount) => {
// Build the transaction
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       contract_Address,
    value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
    gasLimit: web3.utils.toHex(2100000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
    data: myData  
  }
    // Sign the transaction
    const tx = new Tx(txObject);
    tx.sign(privateKey1);

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    // Broadcast the transaction
    const transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
        console.log(tx)
    });
});