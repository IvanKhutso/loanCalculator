const mongoose = require('mongoose');

const { Schema } = mongoose;

const loanSchema = new Schema({
  loanAmount: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  interestAmount: {
    type: Number,
    default: 0,
  },
  outStandingAmount: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


loanSchema.methods.updatePayments = function(paymentAmount) {
  this.payments.push({ amount: paymentAmount, date: new Date() });
  this.totalAmount -= paymentAmount;
  if (this.totalAmount < 0) {
    this.outStandingAmount = Math.abs(this.totalAmount);
    this.totalAmount = 0;
  }
}


const Loan = mongoose.model('Loan', loanSchema);

module.exports = { Loan };




