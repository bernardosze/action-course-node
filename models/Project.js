const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		address: {
			type: String,
			required: true
		},
		city: {
			type: String,
			required: true
		},
		province: {
			type: String,
			required: true
		},
		status: {
			type: String,
			enum: ['Planning', 'Progress', 'Done'],
			required: true
		},
		updated: {
			type: Date,
			default: Date.now
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

module.exports = Project = mongoose.model('project', ProjectSchema);
