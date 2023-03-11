const { Payment } = require('../models/payment');
const { Loan } = require('../models/loan');
const { User } = require('../models/user');

// Create Payment
Payment.createPayment = async (req, res) => {
  try {
    if (!req.body.userId) throw "User Id is required"

    const { userId, principalPaid } = req.body;

    // Find the loan associated with the user
    const loan = await Loan.findOne({ userId })

    // Calculate the remaining outstanding balance
    const outStandingBalance = loan.loanAmount - principalPaid;

    // Calculate the interest paid
    const interestPaid = calculateInterest(loan, req.body, new Date());
    
    // Update the loan's total amount and user's outstanding amount
    const accumulatedLoanAmount = loan.totalAmount + interestPaid;
    const outStandingAmount = outStandingBalance + interestPaid;

    if (!isNaN(accumulatedLoanAmount)) {
      await Loan.updateOne({ userId }, { totalAmount: accumulatedLoanAmount });
    } 

    if (!isNaN(outStandingAmount)) {
      await User.updateOne({ _id: userId }, { outStandingAmount });
    } console.error(loan)
    
    

//  await Loan.updateOne({ userId }, { totalAmount: accumulatedLoanAmount });
//  await User.updateOne({ _id: userId }, { outStandingAmount: (outStandingAmount) } );
    
   

    const payment = new Payment({
      userId: req.body.userId,
      principalPaid: req.body.principalPaid,
      interestPaid: req.body.interestPaid,
      outStandingBalance: req.body.outStandingBalance,
      accumulatedLoanAmount: req.body.accumulatedLoanAmount,
      totalAmount: isNaN(req.body.totalAmount) ? 0 :req.body.totalAmount,
    }
    );

    // Save the payment object
    await payment.save();

    res.status(200).send({ message: `Payment of ${principalPaid} was successfully paid`, data: payment });
  } catch (err) {
    console.log(err);
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

// Repay Loan
Payment.repayLoan = async (req, res) => {
  try {
    if (!req.body.userId) throw "User Id is required"

    // Find the loan associated with the user
    const loan = await Loan.findOne({ userId: req.body.userId })

    // Calculate the remaining outstanding balance
    const outstanding = loan.totalAmount - req.body.amount

    // Create the payment object
    const body = { userId: req.body.userId, principalPaid: req.body.amount, outStandingBalance: outstanding, accumulatedLoanAmount: loan.totalAmount }
    const newPayment = new Payment(body);

    // Update the user's outstanding amount and loan's total amount
    await User.findOneAndUpdate({ _id: req.body.userId }, { outStandingAmount: outstanding })
    await Loan.findOneAndUpdate({ userId: req.body.userId }, { totalAmount: outstanding })

    // Save the payment object
    await newPayment.save().then((result) => {
      res.status(200).send({ message: `Payment of ${req.body.amount} was successfully made towards loan repayment`, data: result });
    });
  }
  catch (err) {
    console.log(err)
    res.status(500).send({ message: 'Unsuccessful. ' + err });
  }
}


// Calculate Interest
function calculateInterest(loan, payment, date) {
  const interestRate = loan.interestRate / 100;
  const totalDays = Math.ceil((date - payment.date) / (1000 * 60 * 60 * 24));
  const dailyInterest = (loan.totalAmount * interestRate) / 365;
  const interest = dailyInterest * totalDays;
  return interest;
}

module.exports = { Payment };
