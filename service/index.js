const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;
const authCookieName = 'token';

// In-memory storage for now
let users = [];
let wishlists = [];

app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

// API router
const apiRouter = express.Router();
app.use(`/api`, apiRouter);
