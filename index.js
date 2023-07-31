const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

app.use(cors());

app.get('/home', async (req, res) => {
  try {
    // const response = await axios.get('http://192.168.33.1/rpc/Shelly.GetStatus');
    const response = await axios.get('http://192.168.15.196/rpc/Shelly.GetStatus');
    res.json(response.data);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching status' });
  }
});

app.get('/home/restart', async(req, res) => {
  try{
    const response = await axios.get('http://192.168.33.1/rpc/Switch.Toggle?id=0');
    res.json(response.data);
  } catch(error) {
    res.status(500).send({error: 'Error fetching status'});
  }
})

app.get('/home/light', async(req, res) => {
  try{
    const response = await axios.get('http://192.168.15.100/light/0?brightness=50')
    res.json(response.data);
  } catch(error) {
    res.status(500).send({error: 'Error'})
}
})

app.get('/devices', async (req, res) => {
  try{
    await client.connect();
    const db = client.db('sales');
    const devices = await db.collection('device').find({}).toArray();
    res.json(devices);
  } catch(error) {
    res.status(500).send({ error: 'Error fetching devices from the database' });
  } finally {
    await client.close();
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// http://192.168.15.100/light/0?brightness=80
