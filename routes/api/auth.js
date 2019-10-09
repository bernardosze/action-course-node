const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');

const { testAuth, loginUser } = require('../../controllers/auth');

//@route    GET api/auth
//@desc     Test Route
//@access   PRIVATE
//auth middleware
router.get('/', auth, testAuth);

//@route   POST api/auth
//@desc    Authenticate user and get token
//@access   Public
router.post(
	'/',
	[
		check('email', 'Please include valid email').isEmail(),
		check('password', 'Password is required').exists()
	],
	loginUser
);

module.exports = router;
