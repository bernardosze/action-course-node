const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
	//GET token from the HEADER
	const token = req.header('x-auth-token');

	//check IF NOT token
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	//VERIFY token
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.user = decoded.user;
		next();
	} catch (err) {
		console.log(err);
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
