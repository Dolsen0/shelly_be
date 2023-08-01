import axios from "axios";
import express from "express";
import cors from "cors";
import { client } from "./dbConnect.js";
import dotenv from "dotenv";

const app = express();
const port = 3000;

dotenv.config();

app.use(cors());

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
      "http://192.168.15.196/rpc/Shelly.GetStatus"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching status" });
  }
});

app.get("/home/restart", async (req, res) => {
  try {
    const response = await axios.get(
      "http://192.168.33.1/rpc/Switch.Toggle?id=0"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching status" });
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
