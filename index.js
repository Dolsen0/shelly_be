import axios from "axios";
import express from "express";
import cors from "cors";
import { client } from "./dbConnect.js";
import dotenv from "dotenv";
import cron from "node-cron";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const app = express();
const port = 3000;

dotenv.config();
app.use(cors());

const fixedId = new ObjectId("60e2b171044f1a2768a740b0");

async function updateDeviceState() {
  const response = await axios.get("http://192.168.0.2/rpc/Shelly.GetStatus");
  await client.connect();
  const db = client.db("shelly");
  const collection = db.collection("device");
  await collection.updateOne(
    { _id: fixedId },
    { $set: response.data },
    { upsert: true }
  );
  const updatedDoc = await collection.findOne({ _id: fixedId });
  await client.close();
  return updatedDoc;
}

cron.schedule("*/10 * * * *", async () => {
  console.log("Updating device state...");
  try {
    await updateDeviceState();
  } catch (error) {
    console.error("Error in cron job: ", error);
  }
});

app.get("/", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("shelly");
    const collection = db.collection("device");
    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    console.error("Error while fetching data from MongoDB: ", error);
    res.status(500).json({ error: "Error fetching data from MongoDB" });
  } finally {
    await client.close();
  }
});

app.get("/home", async (req, res) => {
  try {
    const response = await axios.get(
      "http://192.168.0.2/rpc/Shelly.GetStatus"
      // 192.168.0.2
      // 192.168.15.196
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching status" });
  }
});

app.post("/home/restart", async (req, res) => {
  try {
    const response = await axios.get(
      "http://192.168.0.2/rpc/Switch.Toggle?id=0"
    );
    await client.connect();
    const db = client.db("shelly");
    const collection = db.collection("device");

    const fixedId = new ObjectId("60e2b171044f1a2768a740b0");

    await collection.updateOne(
      { _id: fixedId },
      { $set: response.data },
      { upsert: true }
    );
    const updatedDoc = await collection.findOne({ _id: fixedId });
    res.json(updatedDoc);
  } catch (error) {
    console.error("Error: ", error);
    res
      .status(500)
      .json({ error: "Error fetching status and updating MongoDB" });
  } finally {
    await client.close();
  }
});

app.get("/home/light", async (req, res) => {
  try {
    const response = await axios.get(
      "http://192.168.15.100/light/0?brightness=50"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
