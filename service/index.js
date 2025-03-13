const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;
const authCookieName = 'token';

// In-memory storage
let users = [];

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

// API Router
const apiRouter = express.Router();
app.use('/api', apiRouter);

//Authentication

// Register User
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'User already exists' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// Login User
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

// Logout User
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) delete user.token;
  res.clearCookie(authCookieName);
  res.status(204).end();
});

//Wishlist Endpoints;Stored in User Object

// Middleware to verify auth
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    req.user = user; 
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// Get wishlist
apiRouter.get('/wishlist', verifyAuth, (req, res) => {
  res.send(req.user.wishlist || []);
});

// Add to wishlist
apiRouter.post('/wishlist', verifyAuth, (req, res) => {
  if (!req.user.wishlist) req.user.wishlist = [];
  req.user.wishlist.push(req.body); // Add item
  res.send({ msg: 'Item added to wishlist', wishlist: req.user.wishlist });
});

// Remove from wishlist
apiRouter.delete('/wishlist/:id', verifyAuth, (req, res) => {
  if (!req.user.wishlist) req.user.wishlist = [];
  req.user.wishlist = req.user.wishlist.filter(item => item.id !== req.params.id);
  res.send(req.user.wishlist);
});

//Helper Function

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { email, password: passwordHash, token: uuid.v4(), wishlist: [] }; // Add empty wishlist to user
  users.push(user);
  return user;
}

async function findUser(field, value) {
  return users.find(u => u[field] === value);
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

//Start Server
app.listen(port, () => {
  console.log(`✅ Giftly backend running on port ${port}`);
});
