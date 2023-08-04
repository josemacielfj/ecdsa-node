const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "025cf79ffa8f6c8572a4bce32e023768c635e3ccdea0fd82c4bbe1478d88dcacd3": 100,
  "03104ab89f8082d9e79dca1a0f48675fd8ed9b5f01ad237433f3572e746a78145d": 50,
  "038b982b65aaabf221bcd40bdecbe23c1f6d55b355dbd16b7def743af2a98a7580": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // TODO: get a signature from de client-side application
  //recover the public address from the signature
  
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
