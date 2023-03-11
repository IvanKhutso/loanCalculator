// Import the Loan and User models from the respective files
const { Loan } = require('../models/loan');
const { User } = require('../models/user');

// Calculate loan details
Loan.calculateLoanDetails = async (req, res) => {
  try {
    // Check if the loan ID is present in the request body
    if (!req.body.loanId) throw "Loan ID is required"

    // Find the loan with the given loan ID
    const loan = await Loan.findOne({ _id: req.body.loanId })

    // If the loan is found, calculate the loan details
    if (loan) {
      const loanAmount = loan.loanAmount;
      const interestRate = loan.interestRate;
      const duration = loan.duration;
      
      const r = (interestRate / 12) / 100; // Monthly interest rate
      const n = duration * 12; // Number of payments

      // Calculate Equated Monthly Instalment (EMI)
      const EMI = loanAmount * r * ((1 + r) ** n) / (((1 + r) ** n) - 1);

      // Send a response with the loan details
      res.status(200).json({ loanAmount: loanAmount, interestRate: interestRate, duration: duration, EMI: EMI });
    }
  }
  // Catch any errors and send an error response
  catch (err) {
    console.log(err)
    return res.status(500).send({ message: "Error: " + err });
  }
}

// Create a new loan for a user
Loan.createLoan = async (req, res) => {
  try {
    // Check if the user ID is present in the request body
    if (!req.body.userId) throw "User Id is required"

    // Find the user with the given user ID
    const user = await User.findOne({ _id: req.body.userId })

    // If the user is found, calculate the interest amount and create a new loan
    if (user) {
      const interest = req.body.loanAmount * (req.body.interestRate) / 100

      // Check if the user has an outstanding balance, if yes, then throw an error
      if (user.outStandingAmount > 0) throw "Outstanding balance"

      // Create a new object with loan details and add it to the request body
      const body = { ...req.body, outStandingAmount: req.body.loanAmount, interestAmount: interest, totalAmount: req.body.loanAmount + interest }

      const newLoan = new Loan(body)

      // Update the outstanding amount of the user
      await User.findOneAndUpdate({ _id: req.body.userId }, { outStandingAmount: req.body.loanAmount })

      // Save the new loan and send a response with a success message and loan data
      await newLoan.save().then((result) => {
        res.status(200).send({ message: `Loan of ${req.body.loanAmount} taken successfully`, data: result });
      });
    }
  }
  // Catch any errors and send an error response
  catch (err) {
    console.log(err)
    return res.status(500).send({ message: "Error: " + err });
  }
}

// Get all loans
Loan.getLoans = async (req, res) => {
  try {
    // Find all loans
    const loans = await Loan.find({});

    // Send a response with the loan data
    res.status(200).json({ data: loans });
  }
  // Catch any errors and send an error response
  catch (err) {
    res.status(500).send({ message: 'An error occurred while retrieving loans. ' + err });
  }
}

// Get a single loan with the given loan ID
Loan.getOne = async (req, res) => {
  try {
    const loans = await Loan.findOne({ _id: req.body.loanId });

    // Send a response with the loan data
    res.status(200).json({ data: loans });
  }
  // Catch any errors and send an error response
  catch (err) {
    res.status(500).send({ message: 'An error occurred while retrieving loans. ' + err });
  }
}

// Export the Loan object for use in other files
module.exports = { Loan };
