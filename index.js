const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);

//!mongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gavhqqs.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

//!function
async function run() {
  try {
    const nameCollection = client.db("task").collection("name");
    const numberCollection = client.db("task").collection("number");

    //!Get
    app.get("/name", async (req, res) => {
      const query = {};
      const cursor = nameCollection.find(query);
      const number = await cursor.toArray();
      res.send(number);
    });

    //!post
    app.post("/name", async (req, res) => {
      const name = req.body;
      const result = await nameCollection.insertOne(name);
      res.send(result);
    });

    //!post
    app.post("/number", async (req, res) => {
      const name = req.body;
      const result = await numberCollection.insertOne(name);
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("welcome to task server");
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
