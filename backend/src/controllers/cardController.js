const Card = require("../models/Card");
const { validateCard, validateObjectId } = require("../utils/validators");
const { NotFoundError, DatabaseError } = require("../utils/errors");
const asyncHandler = require("../utils/asyncHandler");

const CARDS_LIMIT = 500;

const getAllCards = asyncHandler(async (req, res) => {
  const cards = await Card.find({ userId: req.user._id })
    .populate("projectId", "projectName")
    .sort({ order: 1, createdAt: -1 })
    .limit(CARDS_LIMIT);

  res.status(200).json({
    success: true,
    count: cards.length,
    limit: CARDS_LIMIT,
    data: cards,
  });
});

const getCardById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateObjectId(id, "Card ID");

  const card = await Card.findOne({ _id: id, userId: req.user._id }).populate("projectId", "projectName");

  if (!card) {
    throw new NotFoundError("Card", id);
  }

  res.status(200).json({
    success: true,
    data: card,
  });
});

const createCard = asyncHandler(async (req, res) => {
  const { title, description, priority, date, projectId } = req.body;

  validateCard({ title, description, priority, date });

  if (projectId) {
    validateObjectId(projectId, "Project ID");
  }

  const lastCard = await Card.findOne({ userId: req.user._id }).sort({ order: -1 });
  const nextOrder = lastCard ? lastCard.order + 1 : 0;

  const newCard = await Card.create({
    title: title.trim(),
    description: description?.trim() || "",
    priority: priority || "Chill",
    date: date || "",
    projectId: projectId || null,
    userId: req.user._id,
    order: nextOrder,
  });

  if (!newCard) {
    throw new DatabaseError("Failed to create card");
  }

  const populatedCard = await Card.findById(newCard._id).populate("projectId", "projectName");

  res.status(201).json({
    success: true,
    message: "Card created successfully",
    data: populatedCard,
  });
});

const updateCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, date, projectId } = req.body;

  validateObjectId(id, "Card ID");
  validateCard({ title, description, priority, date });

  if (projectId) {
    validateObjectId(projectId, "Project ID");
  }

  const updatedCard = await Card.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    {
      title: title.trim(),
      description: description?.trim() || "",
      priority: priority || "Chill",
      date: date || "",
      projectId: projectId || null,
    },
    { new: true, runValidators: true },
  ).populate("projectId", "projectName");

  if (!updatedCard) {
    throw new NotFoundError("Card", id);
  }

  res.status(200).json({
    success: true,
    message: "Card updated successfully",
    data: updatedCard,
  });
});

const deleteCard = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateObjectId(id, "Card ID");

  const deletedCard = await Card.findOneAndDelete({ _id: id, userId: req.user._id });

  if (!deletedCard) {
    throw new NotFoundError("Card", id);
  }

  res.status(200).json({
    success: true,
    message: "Card deleted successfully",
    data: { id },
  });
});

const reorderCards = asyncHandler(async (req, res) => {
  const { orderedIds } = req.body;

  if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
    return res.status(400).json({
      success: false,
      message: "orderedIds must be a non-empty array",
    });
  }

  const bulkOps = orderedIds.map((id, index) => ({
    updateOne: {
      filter: { _id: id, userId: req.user._id },
      update: { order: index },
    },
  }));

  await Card.bulkWrite(bulkOps);

  res.status(200).json({
    success: true,
    message: "Cards reordered successfully",
  });
});

const unassignCardsFromProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  validateObjectId(projectId, "Project ID");

  const result = await Card.updateMany({ projectId, userId: req.user._id }, { projectId: null });

  res.status(200).json({
    success: true,
    message: "Cards unassigned successfully",
    data: {
      modifiedCount: result.modifiedCount,
    },
  });
});

module.exports = {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
  reorderCards,
  unassignCardsFromProject,
};
