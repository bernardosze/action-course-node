const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const User = require('../../models/User');

module.exports.testAuth = async (req, res) => {
	try {
		//use the user model to get user info except password
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
};

module.exports.loginUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email, password } = req.body;
	try {
		//see if user exists
		let user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] });
		}
		//get user info for payload from mongo
		const payload = {
			user: {
				id: user.id,
				name: user.name,
				role: user.role
			}
		};

		jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
			if (err) throw err;
			res.json({ token });
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};
