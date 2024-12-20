const fibos = require('chain');
console.notice("start FIBOS node");
let p2paddress = process.env.P2P_PEER_ADDRESS ? process.env.P2P_PEER_ADDRESS.split(',') : [];
if(p2paddress.length <= 0){
	p2paddress = require('./p2p.json');
}

const httpPort = process.env.HTTP_PORT || 8870;
const p2pPort = process.env.P2P_PORT || 9870;
let producername = process.env.PRODUCER_ACCOUNT;
let public_key = process.env.PRODUCER_PUBLIC_KEY;
let private_key = process.env.PRODUCER_PRIVATE_KEY;

fibos.pubkey_prefix = "FO";
fibos.config_dir = './data';
fibos.data_dir = './data';

let chain_config = {
	"contracts-console": true,
	'chain-state-db-size-mb': 8 * 1024
	// "delete-all-blocks": true
};

const snapshotPath = process.env.SNAPSHOT_PATH;
if(snapshotPath){
	chain_config['snapshot'] = snapshotPath;
} else {
	chain_config['genesis-json'] = './genesis.json';
}

console.notice("config_dir:", fibos.config_dir);
console.notice("data_dir:", fibos.data_dir);

fibos.load("http", {
	"http-server-address": `0.0.0.0:${httpPort}`,
	"access-control-allow-origin": "*",
	"http-validate-host": false,
	"verbose-http-errors": true
});

fibos.load("net", {
	"max-clients": 100,
	"p2p-peer-address": p2paddress,
	"p2p-listen-endpoint": `0.0.0.0:${p2pPort}`,
	"agent-name": "FIBOS Bp"
});

let producer_config = {
	'max-transaction-time': 3000,
	'snapshots-dir': 'snapshots'
}

if(producername && public_key && private_key){
	producer_config['producer-name'] = producername;
	producer_config['signature-provider'] = `${public_key}=KEY:${private_key}`;
}

fibos.load("producer", producer_config);
// fibos.load("producer_api");

// if(producername && private_key){
// 	fibos.load("bp_signature", {
// 		"signature-producer": producername,
// 		"signature-private-key": private_key
// 	});
// }

fibos.load("chain", chain_config);
fibos.load("chain_api");

//for eth cross
fibos.load("cross");

fibos.start();