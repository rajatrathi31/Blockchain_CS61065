//Import web3
var Web3 = require('web3');

var Contract = require('web3-eth-contract');

//set provider
Contract.setProvider(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/61253e256b8e4bf69df3568e597aede1'));

var myContract = new Contract([
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
], "0x709830edf8feF92B0d879dE9ee9BdB2400BB5662",//address of the contract
{
    from: '0x47955cB3A79e5163f7DCCe50f8502dc339b5663b', //address from which you want to transact
    gasPrice: '0' //default gas price in wei, 20 gwei in this case
});
 
myContract.methods.get('0x47955cB3A79e5163f7DCCe50f8502dc339b5663b').call().then(function(output){console.log(output)});