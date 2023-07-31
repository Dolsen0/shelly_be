const { MongoClient, ServerApiVersion } = require('mongodb');
const password = require('./password.json');
const uri = `mongodb+srv://derekolsen:${password.password}@cluster0.vs0nwmu.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("shelly").command({ ping: 1 });
    return client.db("shelly");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

module.exports = client;
