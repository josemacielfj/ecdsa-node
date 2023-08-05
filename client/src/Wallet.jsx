import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1';
import { toHex, utf8ToBytes }  from 'ethereum-cryptography/utils';

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    //const address = toHex(secp.secp256k1.getPublicKey(privateKey)).slice(-10);
    const address = toHex(secp.secp256k1.getPublicKey(BigInt(`0x${privateKey}`)));
    setAddress(address);
    
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }
  function reduceStrSize(str, size=2) {
    const halfsize=Math.round(size/2);
    if (str.length<=size) return str;
    else return str.slice(0,halfsize)+"..."+str.slice(-halfsize);
  }
  
  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        PrivateKey
        <input placeholder="Type a private key" value={privateKey} onChange={onChange}></input>
      </label>

      <div>
        <label> Address: {reduceStrSize(address, 16)}</label>
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
