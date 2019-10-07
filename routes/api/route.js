// IMPORTS
const express = require('express');
const router = express.Router();

const routeStart = [{ id: 1, msg: 'Route Started' }];

router.get('/', (req, res) => {
	try {
		res.json(routeStart);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server ERROR');
	}
});
