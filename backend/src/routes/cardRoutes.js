const express = require("express");
const router = express.Router();
const {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
  reorderCards,
  unassignCardsFromProject,
} = require("../controllers/cardController");
const { protect } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Cards
 *   description: Card management endpoints
 */

router.use(protect);

/**
 * @swagger
 * /api/cards:
 *   get:
 *     summary: Get all cards for the authenticated user
 *     tags: [Cards]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of cards
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Card'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", getAllCards);

/**
 * @swagger
 * /api/cards/{id}:
 *   get:
 *     summary: Get a single card by ID
 *     tags: [Cards]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Card ID
 *         example: 64a1f2c3b4d5e6f7a8b9c0d1
 *     responses:
 *       200:
 *         description: Card data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Card'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Card not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", getCardById);

/**
 * @swagger
 * /api/cards:
 *   post:
 *     summary: Create a new card
 *     tags: [Cards]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Fix login bug
 *               description:
 *                 type: string
 *                 example: The login form is not validating email correctly
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: high
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-12-31T00:00:00.000Z
 *               project:
 *                 type: string
 *                 example: 64a1f2c3b4d5e6f7a8b9c0d1
 *     responses:
 *       201:
 *         description: Card created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Card'
 *       400:
 *         description: Missing or invalid fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", createCard);

/**
 * @swagger
 * /api/cards/{id}:
 *   put:
 *     summary: Update a card by ID
 *     tags: [Cards]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Card ID
 *         example: 64a1f2c3b4d5e6f7a8b9c0d1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Fix login bug (updated)
 *               description:
 *                 type: string
 *                 example: Updated description
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: medium
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-12-31T00:00:00.000Z
 *               project:
 *                 type: string
 *                 example: 64a1f2c3b4d5e6f7a8b9c0d1
 *     responses:
 *       200:
 *         description: Card updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Card'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Card not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/:id", updateCard);

/**
 * @swagger
 * /api/cards/{id}:
 *   delete:
 *     summary: Delete a card by ID
 *     tags: [Cards]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Card ID
 *         example: 64a1f2c3b4d5e6f7a8b9c0d1
 *     responses:
 *       200:
 *         description: Card deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Card not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/:id", deleteCard);

/**
 * @swagger
 * /api/cards/reorder:
 *   patch:
 *     summary: Reorder cards
 *     tags: [Cards]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cards
 *             properties:
 *               cards:
 *                 type: array
 *                 description: Array of card IDs in the new order
 *                 items:
 *                   type: string
 *                 example: ["64a1f2c3b4d5e6f7a8b9c0d1", "64a1f2c3b4d5e6f7a8b9c0d2"]
 *     responses:
 *       200:
 *         description: Cards reordered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch("/reorder", reorderCards);

/**
 * @swagger
 * /api/cards/project/{projectId}/unassign:
 *   patch:
 *     summary: Unassign all cards from a project (cards are kept without a project)
 *     tags: [Cards]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *         example: 64a1f2c3b4d5e6f7a8b9c0d1
 *     responses:
 *       200:
 *         description: Cards unassigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch("/project/:projectId/unassign", unassignCardsFromProject);

module.exports = router;
