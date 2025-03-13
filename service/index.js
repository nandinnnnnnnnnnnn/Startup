import express from 'express';
import cors from 'cors';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import fs from 'fs';

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(cors({
    origin: 'http://localhost:5173', // Vite frontend
    credentials: true
}));
app.use(express.json());
app.use(express.static('public')); // Serve frontend from /public

app.use(session({
    secret: 'my-secret', 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Secure false for local dev
}));

// Load users and wishlists (mocked from JSON or array for now)
const USERS_FILE = './data/users.json';
const WISHLIST_FILE = './data/wishlists.json';

// Helper functions
const readData = (file) => JSON.parse(fs.existsSync(file) ? fs.readFileSync(file) : '[]');
const writeData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

/* ===== AUTH APIs ===== */

// Signup
app.post('/api/auth/signup', async (req, res) => {
    const { username, password } = req.body;
    let users = readData(USERS_FILE);
    if (users.find(u => u.username === username)) return res.status(400).json({ msg: 'User exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    writeData(USERS_FILE, users);

    req.session.user = { username }; //Set session
    res.json({ username });
});

// Login
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const users = readData(USERS_FILE);
    const user = users.find(u => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ msg: 'Invalid credentials' });

    req.session.user = { username };
    res.json({ username });
});

// Logout
app.post('/api/auth/logout', (req, res) => {
    req.session.destroy(() => res.json({ msg: 'Logged out' }));
});

//WISHLIST APIs

// Fetch wishlist
app.get('/api/wishlist', (req, res) => {
    if (!req.session.user) return res.status(401).json({ msg: 'Unauthorized' });
    const allWishlists = readData(WISHLIST_FILE);
    const userWishlist = allWishlists.find(w => w.username === req.session.user.username) || { username: req.session.user.username, items: [] };
    res.json(userWishlist.items);
});

// Add to wishlist
app.post('/api/wishlist', (req, res) => {
    if (!req.session.user) return res.status(401).json({ msg: 'Unauthorized' });

    const allWishlists = readData(WISHLIST_FILE);
    let userWishlist = allWishlists.find(w => w.username === req.session.user.username);
    if (!userWishlist) {
        userWishlist = { username: req.session.user.username, items: [] };
        allWishlists.push(userWishlist);
    }

    const product = req.body;
    if (!userWishlist.items.find(item => item.id === product.id)) userWishlist.items.push(product); // Avoid duplicates

    writeData(WISHLIST_FILE, allWishlists);
    res.json(userWishlist.items);
});

// Remove from wishlist
app.delete('/api/wishlist/:id', (req, res) => {
    if (!req.session.user) return res.status(401).json({ msg: 'Unauthorized' });

    const allWishlists = readData(WISHLIST_FILE);
    const userWishlist = allWishlists.find(w => w.username === req.session.user.username);
    if (userWishlist) {
        userWishlist.items = userWishlist.items.filter(item => item.id !== parseInt(req.params.id));
        writeData(WISHLIST_FILE, allWishlists);
    }
    res.json(userWishlist ? userWishlist.items : []);
});

// Start server
app.listen(port, () => console.log(`Service running on port ${port}`));
