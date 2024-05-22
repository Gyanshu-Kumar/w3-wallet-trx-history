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
  apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjdiYTM3OTQ1LWI3NWItNDQ1Mi05ZGVkLTEyMWIwOWFiODJlOCIsIm9yZ0lkIjoiMzkzMjc4IiwidXNlcklkIjoiNDA0MTA5IiwidHlwZUlkIjoiODMyY2RlOGEtZTIxYS00ZGM0LTg3ZjQtOWY1YWQ4OWQ3YmU2IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTYzNzI4OTYsImV4cCI6NDg3MjEzMjg5Nn0.DO8fCYyRBv5lQmTMlYfuLribIMmECmZWDucazIWYUuk",
}).then(() => {
  console.log(`Moralis started`);
});

module.exports = app;
