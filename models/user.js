const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
	firstName: String,
	lastName: String,
	outStandingAmount: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model('User', userSchema);
module.exports = { User }
