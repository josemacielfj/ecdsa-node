import { useState } from "react";
import { keccak256 } from 'ethereum-cryptography/keccak';
import { toHex, utf8ToBytes }  from 'ethereum-cryptography/utils';
import * as secp from 'ethereum-cryptography/secp256k1';
import server from "./server";

function Transfer({ privateKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);


  async function transfer(evt) {
    evt.preventDefault();

    try {
      const msgHash=keccak256(utf8ToBytes('transfer funds transaction'));
      const sig = secp.secp256k1.sign(msgHash, privateKey);
      const recovery = sig.r.toString();
      const signature = sig.s.toString();

      const {
        data: { balance },
      } = await server.post(`send`, {
        r: recovery,
        s: signature,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
