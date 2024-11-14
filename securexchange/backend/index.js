const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const axios = require('axios');
const stripe = require('stripe')('your_stripe_secret_key');

const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Database Connection
const pool = new Pool({
  user: 'your_db_user',
  host: 'db',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

// Passport Local Strategy for Authentication
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      const user = result.rows[0];
      if (!user) return done(null, false, { message: 'Incorrect username.' });

      const match = await bcrypt.compare(password, user.password);
      return match ? done(null, user) : done(null, false, { message: 'Incorrect password.' });
    } catch (err) {
      return done(err);
    }
  }
));

// Passport Serialization
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, result.rows[0]);
  } catch (err) {
    done(err);
  }
});

// Authentication Routes
app.post('/login', passport.authenticate('local'), (req, res) => res.json(req.user));

// Registration Route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// File Upload and Download Setup
const upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('file'), async (req, res) => {
  const { originalname, filename } = req.file;
  try {
    await pool.query('INSERT INTO files (name, path) VALUES ($1, $2)', [originalname, filename]);
    res.status(201).json({ message: 'File uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/download/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM files WHERE id = $1', [id]);
    const file = result.rows[0];
    if (!file) return res.status(404).json({ error: 'File not found' });
    res.download(`uploads/${file.path}`, file.name);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Data Retrieval Route
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Summarization Route Using axios for OpenAI API
app.post('/summarize', async (req, res) => {
  const { text } = req.body;
  try {
    const response = await axios.post('https://api.deepseek.com/v1/completions', {
      model: "deepseek-chat",
      prompt: `Summarize the following text: ${text}`,
      max_tokens: 100,
    }, {
      headers: { 'Authorization': `Bearer sk-7fd014d945684bf5b00c27c092d8866c` }
    });
    res.json({ summary: response.data.choices[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Stripe Payment Intent Route
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Server Start
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
