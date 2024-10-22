const db = require('../db'); // Import the database connection

// Create a new transaction
exports.createTransaction = (req, res) => {
  const { type, category, amount, date, description } = req.body;

  const query = `INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [type, category, amount, date, description], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, type, category, amount, date, description });
  });
};

// Get all transactions
exports.getAllTransactions = (req, res) => {
  const query = `SELECT * FROM transactions`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Get a transaction by ID
exports.getTransactionById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM transactions WHERE id = ?`;
  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(row);
  });
};

// Update a transaction by ID
exports.updateTransactionById = (req, res) => {
  const id = req.params.id;
  const { type, category, amount, date, description } = req.body;

  const query = `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`;
  db.run(query, [type, category, amount, date, description, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction updated successfully' });
  });
};

// Delete a transaction by ID
exports.deleteTransactionById = (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM transactions WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  });
};

// Get summary of transactions
exports.getSummary = (req, res) => {
  const query = `
    SELECT 
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expenses
    FROM transactions
  `;
  db.get(query, [], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      total_income: row.total_income || 0,
      total_expenses: row.total_expenses || 0,
      balance: (row.total_income || 0) - (row.total_expenses || 0)
    });
  });
};
