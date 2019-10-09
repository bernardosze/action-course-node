const express = require('express');
const auth = require('../../middleware/auth');

const {
	getAllProjects,
	getProjectById,
	insertNewProject,
	updateProject,
	deleteProject
} = require('../../controllers/project');

const router = express.Router();

// READ ALL
// @route   GET api/project
// @desc    GET all projects
// @access  PRIVATE
router.get('/', auth, getAllProjects);

// READ ONE
// @route   GET api/project/:id
// @desc    GET one project
// @access  PRIVATE
router.get('/:id', auth, getProjectById);

// INSERT
// @route   POST api/project
// @desc    POST one project
// @access  PRIVATE
router.post('/', auth, insertNewProject);

// UPDATE
// @route   GET api/project/
// @desc    GET update one project
// @access  PRIVATE
router.put('/', auth, updateProject);

// DELETE
// @route   DELETE api/project/
// @desc    DELTE one project
// @access  PRIVATE
router.delete('/', auth, deleteProject);

module.exports = router;
