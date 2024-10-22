const express = require('express');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactionRoutes'); // Import routes

const app = express();
const PORT = 3000;

// Middleware to parse incoming requests
app.use(bodyParser.json());
app.use(express.json());

// Use the transaction routes
app.use('/api', transactionRoutes); // Prefix the routes with /api

app.get('/', (req, res) => {
  res.send('Welcome to Personal Expense Tracker API');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

