const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const User = require('../../models/User');

module.exports.getAllUsers = async (req, res) => {
	try {
		const allUsers = await User.find();
		res.json(allUsers);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
};

module.exports.getMyUser = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
};

module.exports.insertNewUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { name, email, password } = req.body;

	try {
		let user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
		}

		user = new User({
			name,
			email,
			password
		});

		const salt = await bcrypt.genSalt(10);

		user.password = await bcrypt.hash(password, salt);

		await user.save();

		const payload = {
			user: {
				id: user.id,
				name: user.name
			}
		};

		jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
			if (err) throw err;
			res.json({ token });
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

module.exports.updateUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { name, email, role, password } = req.body;

	try {
		let getUser = await User.findOne({ email });
		if (!getUser) {
			return res.status(404).send('User not found');
		}
		getUser.name = name;
		getUser.email = email;
		getUser.role = role;
		getUser.password = password;

		const salt = await bcrypt.genSalt(10);

		getUser.password = await bcrypt.hash(password, salt);

		const updateUser = await getUser.save();
		res.status(200).send(updateUser);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};
