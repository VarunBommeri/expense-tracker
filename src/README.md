# Personal Expense Tracker API

## Introduction
The Personal Expense Tracker API allows users to manage their personal financial records. Users can record income and expenses, retrieve past transactions, and get summaries by category or time period.

## Setup and Installation

### Prerequisites
- **Node.js** (v14 or later)
- **SQLite** (or MongoDB if preferred)
- **Postman** (for testing)

### Steps to Install
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   cd expense-tracker


2) Install dependencies:
npm install


3) Create the SQLite database:
node src/db.js


4) Start the server:
node src/index.js


5) Open Postman to test the API endpoints.




# API Documentation
Base URL
The base URL for the API is http://localhost:3000/api.

Endpoints
1. Create Transaction (POST)
URL: /transactions
Method: POST
Request Body (JSON):
{
  "type": "income", // or "expense"
  "category": "Salary", // category name
  "amount": 5000, // amount of transaction
  "date": "2024-10-22", // transaction date (YYYY-MM-DD)
  "description": "Monthly salary" // description of the transaction
}
Response:
201 Created: Returns the created transaction with ID.
500 Internal Server Error: If there's an error.


2. Get All Transactions (GET)
URL: /transactions
Method: GET
Response:
200 OK: Returns an array of all transactions.
500 Internal Server Error: If there's an error.



3. Get Transaction by ID (GET)
URL: /transactions/:id
Method: GET
URL Parameters:
id: ID of the transaction to retrieve.
Response:
200 OK: Returns the transaction object.
404 Not Found: If the transaction does not exist.
500 Internal Server Error: If there's an error.


4. Update Transaction by ID (PUT)
URL: /transactions/:id
Method: PUT
URL Parameters:
id: ID of the transaction to update.
Request Body (JSON):
{
  "type": "expense", // or "income"
  "category": "Food",
  "amount": 200,
  "date": "2024-10-22",
  "description": "Groceries"
}
Response:
200 OK: Returns a success message.
404 Not Found: If the transaction does not exist.
500 Internal Server Error: If there's an error.


5) Delete Transaction by ID (DELETE)
URL: /transactions/:id
Method: DELETE
URL Parameters:
id: ID of the transaction to delete.
Response:
200 OK: Returns a success message.
404 Not Found: If the transaction does not exist.
500 Internal Server Error: If there's an error.


6. Get Summary (GET)
URL: /summary
Method: GET
Response:
200 OK: Returns an object with total income, total expenses, and balance.
{
  "total_income": 5000,
  "total_expenses": 200,
  "balance": 4800
}
