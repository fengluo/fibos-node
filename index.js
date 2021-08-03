const fibos = require('fibos');
const fs = require("fs");
console.notice("start FIBOS producer node");
const p2paddress = process.env.P2P_PEER_ADDRESS.split(',');

let producername = process.env.PRODUCER_ACCOUNT;
let public_key = process.env.PRODUCER_PUBLIC_KEY;
let private_key = process.env.PRODUCER_PRIVATE_KEY;

fibos.config_dir = '/blockData/data';
fibos.data_dir = '/blockData/data';

let chain_config = {
	"contracts-console": true,
	'chain-state-db-size-mb': 8 * 1024,
	// "delete-all-blocks": true
};

if (!fs.exists(fibos.data_dir) && !fs.exists(fibos.config_dir)) {
	chain_config['genesis-json'] = "genesis.json";
}


console.notice("config_dir:", fibos.config_dir);
console.notice("data_dir:", fibos.data_dir);

fibos.load("http", {
	"http-server-address": "0.0.0.0:8870",
	"access-control-allow-origin": "*",
	"http-validate-host": false,
	"verbose-http-errors": true
});

fibos.load("net", {
	"max-clients": 100,
	"p2p-peer-address": p2paddress,
	"p2p-listen-endpoint": "0.0.0.0:9870",
	"agent-name": "FIBOS Bp"
});

if(producername && public_key && private_key){
    fibos.load("producer", {
        'producer-name': producername,
        'signature-provider': `${public_key}=KEY:${private_key}`
    });
}

fibos.load("chain", chain_config);
fibos.load("chain_api");

fibos.start();