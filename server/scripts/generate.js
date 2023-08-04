const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.secp256k1.utils.randomPrivateKey();

console.log('private key:', toHex(privateKey));

const publicKey = secp.secp256k1.getPublicKey(privateKey);
//console.log(toHex(secp.secp256k1.getPublicKey("4baddfe1fdb2450568e94e133a368cef9d5fedf423c4c61a9d1b996f8380dead")));

console.log('public key:', toHex(publicKey));