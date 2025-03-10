const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const config = require('./dbConfig.json');

//to MongoDB
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('giftly');
const usersCollection = db.collection('users');
const wishlistCollection = db.collection('wishlists');