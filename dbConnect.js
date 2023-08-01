import dotenv from "dotenv";
dotenv.config();
import { MongoClient, ServerApiVersion } from "mongodb";

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${user}:${password}@cluster0.vs0nwmu.mongodb.net/?retryWrites=true&w=majority`;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    await client.close();
  }
};

run().catch(console.dir);
