const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const dbName = 'justgiftly';
let db = null;

async function connect() {
  await client.connect();
  db = client.db(dbName);
  console.log(`Connected to database: ${dbName}`);
}

function usersCollection() {
  return db.collection('users');
}

function wishlistsCollection() {
  return db.collection('wishlists');
}

module.exports = { connect, usersCollection, wishlistsCollection };
