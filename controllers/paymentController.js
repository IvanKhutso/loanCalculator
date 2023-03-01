const { Payment } = require('../models/payment');
const { Loan } = require('../models/loan');
const { User } = require('../models/user');

// Create Payment
Payment.createPayment = async (req, res) => {
  try {
    if (!req.body.userId) throw "User Id is required"

    // Find the loan associated with the user
    const loan = await Loan.findOne({ userId: req.body.userId })

    // Calculate the remaining outstanding balance
    const outstanding = loan.loanAmount - req.body.principalPaid

    // Create the payment object
    const body = {...req.body, outStandingBalance: outstanding, accumulatedLoanAmount: loan.totalAmount}
    const newPayment = new Payment(body);

    // Update the user's outstanding amount
    await User.findOneAndUpdate({ _id: req.body.userId }, { outStandingAmount: outstanding })

    // Save the payment object
    await newPayment.save().then((result) => {
      res.status(200).send({ message: `Payment of ${req.body.principalPaid} was successfully paid`, data: result });
    });
  }
  catch (err) {
    console.log(err)
    res.status(500).send({ message: 'Unsuccessful. ' + err });
  }
}

// Find All Payments for a User
Payment.getAll = async (req, res) => {
  try {
    if (!req.body.userId) throw "User Id is required"

    // Find all payments for a user
    const payments = await Payment.find({ userId: req.body.userId });

    // Return the payments
    res.status(200).send({ data: payments });
  }
  catch (err) {
    res.status(500).send({ message: 'An error occurred while retrieving payment. ' + err });
  }
}

module.exports = { Payment };
