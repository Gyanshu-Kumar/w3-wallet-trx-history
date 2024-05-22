const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/api/txs", async (req, res) => {
  try {
    const { query } = req;
    const balance = await Moralis.EvmApi.transaction.getWalletTransactions({
      address: query.address,
      chain: query.chain,
    });
    const result = balance.raw;
    return res.status(200).json({ result });
  } catch (e) {
    console.log(e);
    console.log("something went wrong");
    return res.status(400).json();
  }
});

Moralis.start({
  apiKey: "YOUR_API_KEY_HERE",
}).then(() => {
  console.log(`Moralis started`);
});

module.exports = app;
