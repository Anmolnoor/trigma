const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "Please provide us your first name"],
		minlength: [3, "First name must have more then 3 characters"],
		maxlength: [40, "First name must have less then 40 characters"]
	},
	lastName: {
		type: String,
		required: [true, "Please provide us your last name"],
		minlength: [3, "Last name must have more then 3 characters"],
		maxlength: [40, "Last name must have less then 40 characters"]
	},
	email: {
		type: String,
		required: [true, "Please provide us your Email-ID"],
		lowercase: true,
		unique: true,
		validate: [validator.isEmail, "Please provide us a Valid email"]
	},
	password: {
		type: String,
		required: [true, "Please provide us your password"],
		minlength: 8
	},
	dob: {
		type: Date,
		required: [true, "Please provide us your Date of Birth"]
	},
	gender: {
		type: String,
		required: [true, "Please provide us your gender"]
	},

	mobile: {
		type: Number,
		required: [true, "Please provide us gender"],
		maxlength: [10, "Mobile Number must be of 10 digits"],
		maxlength: [10, "Mobile Number must be of 10 digits"]
	},
	status: {
		type: String,
		required: [true, "Please provide us your Status"]
	}
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
