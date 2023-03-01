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

// paymentSchema.statics.getOutstandingBalance = async function () {
//   const payments = await this.find();
//   let principalPaid = 0;
//   for (const payment of payments) {
//     principalPaid += payment.principal;
//   }
//   return this.totalLoanAmount() - principalPaid;
// };

// paymentSchema.statics.totalLoanAmount = async function () {
//   const loans = await Loan.find();
//   let total = 0;
//   for (const loan of loans) {
//     total += loan.amount;
//   }
//   return total;
// };

// module.exports = mongoose.model('Payment', paymentSchema);


module.exports = { Payment };
