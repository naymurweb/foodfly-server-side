const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const reviewCollection = client.db("reviews").collection("data");

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

    // find for id one product
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await productCollection.findOne(query);
      res.send(product);
      console.log(product);
    });

    //new product add

    app.post("/products", async (req, res) => {
      const item = await productCollection.insertOne(req.body);
      res.send(item);
      console.log(item);
    });

    // review get data
    app.get("/reviews", async (req, res) => {
      const query = {};
      const cursor = reviewCollection.find(query);
      const items = await cursor.toArray();
      res.send(items);
      console.log(items);
    });

    // review data add
    app.post("/reviews", async (req, res) => {
      console.log(req.body);
      const item = await reviewCollection.insertOne(req.body);
      res.send(item);
      console.log(item);
    });

    // app.get("/reviews/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const product = await reviewCollection.findOne(query);
    //   res.send(product);
    //   console.log(product);
    // });

    app.put("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          massage: req.body.mass,
        },
      };
      const result = await reviewCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
      console.log(req.body);
    });

    app.delete("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
      console.log(result);
    });
  } finally {
  }
};
run().catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`foodfly server port:${port}`);
});
