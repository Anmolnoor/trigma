const User = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const registerUser = await User.findOne({ email });
		if (!registerUser) {
			return res.status(400).json({
				status: "Fail",
				message: "User Don't exist!!!"
			});
		} else if (password !== registerUser?.password) {
			console.log("faild");
			return res.status(400).json({
				status: "Fail",
				message: "wrong password"
			});
		} else {
			const token = jwt.sign({ email, ID: registerUser._id }, "secretkey_here", { expiresIn: "1h" });
			res.json({
				status: "SuccessFull",
				User: registerUser,
				token
			});
		}
	} catch (error) {
		res.status(400).json({
			status: "Fail",
			message: error.message
		});
	}
};
exports.register = async (req, res) => {
	try {
		const data = req.body;
		if (data.password === data.passwordConfirm) {
			const registerUser = await User.create(data);
			res.json({
				status: "SuccessFull",
				User: registerUser
			});
		} else {
			throw new Error("password does not match with the confirm password");
		}
	} catch (error) {
		res.status(400).json({
			status: "Fail",
			message: error.message
		});
	}
};
exports.updatePassword = async (req, res) => {
	try {
		const { email, password, newPassword, newPasswordConfirm } = req.body;

		const registerUser = await User.findOne({ email });

		if (!registerUser) {
			return res.status(400).json({
				status: "Fail",
				message: "User Don't exist!!!"
			});
		} else if (password === registerUser?.password) {
			if (newPassword === newPasswordConfirm) {
				console.log("faild");
				const update = await User.findOneAndUpdate({ email }, { password: newPassword }, { new: true });

				res.json({
					status: "SuccessFull",
					User: update,
					newPassword
				});
			} else {
				return res.status(400).json({
					status: "Fail",
					message: "password does not match"
				});
			}
		} else {
			return res.status(400).json({
				status: "Fail",
				message: "wrong password"
			});
		}
	} catch (error) {
		res.status(400).json({
			status: "Fail",
			message: error.message
		});
	}
};
exports.forgetPassword = async (req, res) => {
	try {
		const { email, mobile, newPassword, newPasswordConfirm } = req.body;

		const registerUser = await User.findOne({ email });

		if (!registerUser) {
			return res.status(400).json({
				status: "Fail",
				message: "User Don't exist!!!"
			});
		} else if (mobile === registerUser?.mobile) {
			const randomPassword = crypto.randomBytes(10).toString("hex");
			const update = await User.findOneAndUpdate({ email }, { password: randomPassword }, { new: true });

			res.json({
				status: "SuccessFull",
				User: update,
				randomPassword
			});
		} else {
			return res.status(400).json({
				status: "Fail",
				message: "wrong password"
			});
		}
	} catch (error) {
		res.status(400).json({
			status: "Fail",
			message: error.message
		});
	}
};
