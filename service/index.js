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
    const user = { username, password: passwordHash, token: uuid.v4() };
    users.push(user);
    return user;
}

async function findUser(field, value) {
    return users.find((u) => u[field] === value);
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
/*
// Endpoints 
app.post('/api/auth/create', async (req, res) => {
    if (await findUser('username', req.body.username)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.username, req.body.password);
        setAuthCookie(res, user.token);
        res.send({ username: user.username });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const user = await findUser('username', req.body.username);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        user.token = uuid.v4();
        setAuthCookie(res, user.token);
        res.send({ username: user.username });
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
});

app.delete('/api/auth/logout', (req, res) => {
    const user = users.find((u) => u.token === req.cookies[authCookieName]);
    if (user) delete user.token;
    res.clearCookie(authCookieName);
    res.status(204).end();
});
*/

//Get wishlist
apiRouter.get('/wishlist', verifyAuth, (req, res) => {
    const token = req.cookies[authCookieName];
    res.send(wishlists[token] || []);
});

//Add to wishlist 
apiRouter.post('/wishlist', verifyAuth, (req, res) => {
    const token = req.cookies[authCookieName];
    wishlists[token] = wishlists[token] || [];
    const product = req.body;

    //Check if product already in wishlist
    if (!wishlists[token].some(item => item.id === product.id)) {
        wishlists[token].push(product); //Add if not duplicate!!!!
    }

    res.send(wishlists[token]);
});

//Remove item from wishlist
apiRouter.delete('/wishlist/:id', verifyAuth, (req, res) => {
    const token = req.cookies[authCookieName];
    const productId = parseInt(req.params.id);
    wishlists[token] = (wishlists[token] || []).filter(item => item.id !== productId);
    res.send(wishlists[token]);
});


app.use((err, req, res, next) => {
    res.status(500).send({ type: err.name, message: err.message });
});
app.listen(port, () => console.log(`Listening on port ${port}`));
