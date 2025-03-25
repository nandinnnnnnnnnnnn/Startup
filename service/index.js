const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;
const authCookieName = 'token';


app.use(express.json());
app.use(cookieParser());
app.use(express.static('public')); 

let users = [];
let wishlists = {}; // { token: [wishlistItems] }

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

//Database.js
const { connect, usersCollection, wishlistsCollection } = require('./database');

(async () => {
  await connect();
})();


// Default API route to server is working
apiRouter.get('/', (req, res) => {
    res.json({ message: "API is working"});
});

// Create Signup
apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('username', req.body.username)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await createUser(req.body.username, req.body.password);
      setAuthCookie(res, user.token);
      res.send({ username: user.username });
    }
  });

  // Login
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('username', req.body.username);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ username: user.username });
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  });
  
  // Logout
  apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
  });
  

// Heper functions
async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const token = uuid.v4();
    const user = { username, password: passwordHash, token };
    await usersCollection().insertOne(user);
    return user;
  }
  
  async function findUser(field, value) {
    const query = {};
    query[field] = value;
    return await usersCollection().findOne(query);
  }
  

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: false, 
        httpOnly: true,
        sameSite: 'strict',
    });
}

// Middleware
const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        req.user = user;
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

//Get wishlist
apiRouter.get('/wishlist', verifyAuth, (req, res) => {
    const token = req.cookies[authCookieName];
    res.send(items.map(i => i.product));
  });

//Add to wishlist 
apiRouter.post('/wishlist', verifyAuth, async (req, res) => {
    const token = req.cookies[authCookieName];
    //wishlists[token] = wishlists[token] || [];
    const product = req.body;

    //Check if product already in wishlist
    const exists = await wishlistsCollection().findOne({ token, 'product.id': product.id });
    if (!exists) {
      await wishlistsCollection().insertOne({ token, product });
    }
  
    const items = await wishlistsCollection().find({ token }).toArray();
    res.send(items.map(i => i.product));
});

//Remove item from wishlist
apiRouter.delete('/wishlist/:id', verifyAuth, async (req, res) => {
    const token = req.cookies[authCookieName];
    const productId = parseInt(req.params.id);
    await wishlistsCollection().deleteOne({ token, 'product.id': productId });
    const items = await wishlistsCollection().find({ token }).toArray();
    res.send(items.map(i => i.product));

  });
 //Reset password 
 apiRouter.post('/auth/reset-password', async (req, res) => {
    const { username, newPassword } = req.body;
    const user = await findUser('username', username);
  
    if (!user) {
      return res.status(404).send({ msg: 'User not found' });
    }
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await usersCollection().updateOne(
      { username: username },
      { $set: { password: hashedPassword } }
    );
  
    res.send({ msg: 'Password reset successful' });
  });
  


app.use((err, req, res, next) => {
    res.status(500).send({ type: err.name, message: err.message });
});
app.listen(port, () => console.log(`Listening on port ${port}`));
