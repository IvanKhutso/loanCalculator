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
    required: true,
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

const Loan = mongoose.model('Loan', loanSchema);

module.exports = { Loan };
