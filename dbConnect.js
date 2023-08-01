import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import password from './password.json' assert { type: 'json' };

dotenv.config()

const uri = `mongodb+srv://derekolsen:${password.password}@cluster0.vs0nwmu.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
client.connect();

const db = client.db('shelly');

export default db;
