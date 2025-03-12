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

//register
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'User already exists' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// Login
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    user.token = uuid.v4();
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Logout
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) delete user.token;
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// to verify user
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) next();
  else res.status(401).send({ msg: 'Unauthorized' });
};

// Get user's wishlist
apiRouter.get('/wishlist', verifyAuth, (req, res) => {
  const userWishlist = wishlists.filter(w => w.email === req.cookies[authCookieName]);
  res.send(userWishlist);
});

// add item to wishlist
apiRouter.post('/wishlist', verifyAuth, (req, res) => {
  const item = req.body;
  item.email = req.cookies[authCookieName];
  wishlists.push(item);
  res.send({ msg: 'Added to wishlist', wishlist: item });
});