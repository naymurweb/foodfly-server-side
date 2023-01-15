const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 7000;
const cors = require("cors");
require("dotenv").config();

// MedalWare
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("foodFly server is open");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uzlqh4i.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const productCollection = client.db("products").collection("items");

    // find all product
    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
      console.log(products);
    });

    // find limit 3 products
    app.get("/product", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query).limit(3);
      const products = await cursor.toArray();
      res.send(products);
      console.log(products);
    });
  } finally {
  }
};
run().catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`foodfly server port:${port}`);
});

// uY17cusuPGyMXv7K   naymur
