const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const config = require('./dbConfig.json');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

//to MongoDB
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('giftly');
const usersCollection = db.collection('users');
const wishlistCollection = db.collection('wishlists');

// MongoDB connection
(async function testConnection() {
    try {
      await db.command({ ping: 1 });
      console.log(`Connected to MongoDB at ${config.hostname}`);
    } catch (ex) {
      console.error(`Failed to connect to MongoDB: ${ex.message}`);
      process.exit(1);
    }
  })();
