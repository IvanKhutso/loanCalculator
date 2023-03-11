const mongoose = require('mongoose');

const { Schema } = mongoose;

const paymentSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  principalPaid: {
    type: Number,
    required: true,
  },
  interestPaid: {
    type: Number,
    default: 0,
  },
  outStandingBalance: {
    type: Number,
    required: true,
  },
  accumulatedLoanAmount: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
});



const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment };
