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
// Test the connection when this file is run directly
if (require.main === module) {
  (async () => {
    try {
      await connect();
      await db.command({ ping: 1 });
      console.log(' MongoDB successful!');
    } catch (err) {
      console.error('MongoDB failed:', err.message);
    } finally {
      await client.close();
    }
  })();
}

module.exports = { connect, usersCollection, wishlistsCollection };
