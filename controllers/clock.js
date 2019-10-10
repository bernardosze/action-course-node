const Clock = require('../../models/Clock');

module.exports.getAllClocks = async (req, res) => {
	try {
		const allClocks = await Clock.find();
		res.json(allClocks);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
};

module.exports.getAllClocksByUser = async (req, res) => {
	try {
		const allClocks = await Clock.find({ user: req.user.id });
		res.json(allClocks);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
};

module.exports.clockIn = async (req, res) => {
	const { type } = req.body;
	try {
		let clock = await Clock.findOne()
			.sort({ field: 'asc', _id: -1 })
			.limit(1);
		if (clock) {
			if (clock.type === 'IN') {
				return res.status(400).json({
					errors: [{ msg: 'User already clocked-in. Must clock-out before clocking-in.' }]
				});
			}
		}

		const clockin = new Clock({
			user: req.user.id,
			project: req.body.project,
			type: req.body.type,
			clockLat: req.body.clockLat,
			clockLng: req.body.clockLng
		});
		const clockingIn = await clockin.save();
		res.send(clockingIn);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

module.exports.ClockOut = async (req, res) => {
	const { type } = req.body;
	try {
		let clock = await Clock.findOne()
			.sort({ field: 'asc', _id: -1 })
			.limit(1);
		if (clock) {
			if (clock.type === 'OUT') {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User did not clock-in. Cannot clock-out.' }] });
			}
		}

		const clockin = new Clock({
			user: req.user.id,
			project: req.body.project,
			type: req.body.type,
			clockLat: req.body.clockLat,
			clockLng: req.body.clockLng
		});
		const clockingIn = await clockin.save();
		res.send(clockingIn);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};
