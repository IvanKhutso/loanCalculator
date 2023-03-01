// import express and controllers
const express = require("express");
const { User } = require('../controllers/userController');
const { Loan } = require('../controllers/loanController');
const { Payment } = require('../controllers/paymentController');

const router = express.Router();

// define routes for each endpoint
router.post('/user', User.createUser); // create user

router.post('/loan', Loan.createLoan); // create loan
router.post('/Takeloan', Loan.createLoan); // create loan (alias)
router.get('/loan', Loan.getLoans); // get all loans
router.get('/oneLoan', Loan.getOne); // get one loan

router.post('/payment', Payment.createPayment); // create payment
router.get('/payment', Payment.getAll); // get all payments

module.exports = router; // export router for use in app.js