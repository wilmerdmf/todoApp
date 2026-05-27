const Project = require("../models/Project");
const Card = require("../models/Card");
const { validateProjectName, validateObjectId } = require("../utils/validators");
const { NotFoundError, ConflictError } = require("../utils/errors");
const asyncHandler = require("../utils/asyncHandler");

const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ userId: req.user._id }).sort({ createdAt: 1 });

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

const createProject = asyncHandler(async (req, res) => {
  const { projectName } = req.body;

  const { trimmedName } = validateProjectName(projectName);

  const existingProject = await Project.findOne({
    userId: req.user._id,
    projectName: { $regex: new RegExp(`^${trimmedName}$`, "i") },
  });

  if (existingProject) {
    throw new ConflictError("A project with this name already exists");
  }

  const newProject = await Project.create({
    projectName: trimmedName,
    userId: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: newProject,
  });
});

const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateObjectId(id, "Project ID");

  const project = await Project.findOne({ _id: id, userId: req.user._id });
  if (!project) {
    throw new NotFoundError("Project", id);
  }

  await Project.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
    data: { id },
  });
});

const deleteProjectWithCards = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateObjectId(id, "Project ID");

  const project = await Project.findOne({ _id: id, userId: req.user._id });
  if (!project) {
    throw new NotFoundError("Project", id);
  }

  const cardsDeleted = await Card.deleteMany({ projectId: id, userId: req.user._id });
  await Project.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Project and associated cards deleted successfully",
    data: {
      id,
      cardsDeleted: cardsDeleted.deletedCount,
    },
  });
});

const deleteProjectAndUnassignCards = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateObjectId(id, "Project ID");

  const project = await Project.findOne({ _id: id, userId: req.user._id });
  if (!project) {
    throw new NotFoundError("Project", id);
  }

  const cardsUnassigned = await Card.updateMany({ projectId: id, userId: req.user._id }, { projectId: null });
  await Project.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Project deleted and cards unassigned successfully",
    data: {
      id,
      cardsUnassigned: cardsUnassigned.modifiedCount,
    },
  });
});

const getProjectCardsCount = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateObjectId(id, "Project ID");

  const count = await Card.countDocuments({ projectId: id, userId: req.user._id });

  res.status(200).json({
    success: true,
    data: {
      projectId: id,
      count,
    },
  });
});

module.exports = {
  getAllProjects,
  createProject,
  deleteProject,
  deleteProjectWithCards,
  deleteProjectAndUnassignCards,
  getProjectCardsCount,
};
