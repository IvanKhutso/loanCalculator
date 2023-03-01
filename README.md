# Loan Management System

This is a simple loan management system built with Node.js, Express.js, and MongoDB.

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies using the `npm install` command.
3. Set up environment variables by creating a `.env` file in the root of the project directory and adding the following variables:

    ```
    MONGODB_URI= 'mongodb+srv://ivankhutso:Ivan95Keys@cluster0.cvbjhuh.mongodb.net/LoanCalculatorDb?retryWrites=true&w=majority'
    ```

4. Start the server using the `npm start` command.
5. Navigate to `http://localhost:3000` in your web browser.

## Endpoints

The following endpoints are available in this API:

### Users

* `POST /user` - Create a new user.

### Loans

* `POST /loan` - Create a new loan.
* `POST /Takeloan` - Alias for `POST /loan`.
* `GET /loan` - Get all loans.
* `GET /oneLoan` - Get a single loan.

### Payments

* `POST /payment` - Make a payment.
* `GET /payment` - Get all payments.

## Dependencies

This project relies on the following dependencies:

* express
* mongoose
* dotenv
* nodemon (devDependency)

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
