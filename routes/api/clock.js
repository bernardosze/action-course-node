const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { clockIn, ClockOut, getAllClocks, getAllClocksByUser } = require('../../controllers/clock');

//@route    GET api/clockin
//@desc     Test Route
//@access   PRIVATE
router.get('/', auth, getAllClocks);

//@route    GET api/clockin
//@desc     Test Route
//@access   PRIVATE
router.get('/me', auth, getAllClocksByUser);

//@route    POST api/clockin
//@desc     Clock-in user
//@access   PRIVATE
router.post('/clockin', auth, clockIn);

//@route    POST api/clockin
//@desc     Clock-Out user
//@access   PRIVATE
router.post('/clockout', auth, ClockOut);

module.exports = router;
