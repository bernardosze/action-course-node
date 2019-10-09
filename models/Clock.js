const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClockSchema = new mongoose.Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'users'
		},
		project: {
			type: String,
			required: true
		},
		type: {
			type: String,
			enum: ['IN', 'OUT'],
			required: true
		},
		clock: {
			type: Date,
			default: Date.now
		},
		clockLat: {
			type: String
		},
		clockLng: {
			type: String
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

module.exports = Clock = mongoose.model('clock', ClockSchema);
