const Project = require('../../models/Project');

module.exports.getAllProjects = async (req, res) => {
	try {
		const getAllProjects = await Project.find();
		res.send(getAllProjects);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
};

module.exports.getProjectById = async (req, res) => {
	try {
		const getProject = await Project.findOne({
			_id: req.params.id
		});
		if (!getProject) {
			return res.status(404).send('Project not found');
		}
		res.status(200).send(getProject);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
};

module.exports.insertNewProject = async (req, res) => {
	try {
		const newProject = new Project({
			title: req.body.title,
			description: req.body.description,
			address: req.body.address,
			city: req.body.city,
			province: req.body.province,
			status: req.body.status
		});
		const insertProject = await newProject.save();
		res.status(200).send(insertProject);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error: Project could not be inserted', err.message);
	}
};

module.exports.updateProject = async (req, res) => {
	try {
		let getProject = await Project.findOne({
			_id: req.body.id
		});
		if (!getProject) {
			return res.status(404).send('Project not found');
		}
		getProject.title = req.body.title;
		getProject.description = req.body.description;
		getProject.address = req.body.address;
		getProject.city = req.body.city;
		getProject.province = req.body.province;
		getProject.status = req.body.status;

		const updateProject = await getProject.save();
		res.status(200).send(updateProject);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
};

module.exports.deleteProject = async (req, res) => {
	try {
		let getProject = await Project.findOne({
			_id: req.body.id
		});
		if (!getProject) {
			return res.status(404).send('Project not found');
		}
		const deleteProject = await getProject.delete();
		res.status(200).send(deleteProject);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
};
