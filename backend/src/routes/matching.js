const express = require('express');
const matchingController = require('../controllers/matchingController');
const { authenticateToken, roleCheck } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/matching/suggestions:
 *   get:
 *     summary: Gợi ý match
 *     tags: [Matching]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of match suggestions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       matchId:
 *                         type: string
 *                       foundItemId:
 *                         type: string
 *                       itemName:
 *                         type: string
 *                       matchConfidence:
 *                         type: number
 *                       matchReason:
 *                         type: string
 */
router.get('/suggestions', authenticateToken, roleCheck('student'), matchingController.getSuggestions);

/**
 * @swagger
 * /api/matching/{matchId}/confirm:
 *   post:
 *     summary: Xác nhận match
 *     tags: [Matching]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               confirmation:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Match confirmed successfully
 */
router.post('/:matchId/confirm', authenticateToken, roleCheck('student'), matchingController.confirmMatch);

/**
 * @swagger
 * /api/matching/{matchId}/reject:
 *   post:
 *     summary: Từ chối match
 *     tags: [Matching]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Match rejected
 */
router.post('/:matchId/reject', authenticateToken, roleCheck('student'), matchingController.rejectMatch);

/**
 * @swagger
 * /api/matching:
 *   get:
 *     summary: Danh sách match
 *     tags: [Matching]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of matches
 */
router.get('/', authenticateToken, roleCheck('staff'), matchingController.listMatches);

/**
 * @swagger
 * /api/matching/{matchId}/resolve:
 *   put:
 *     summary: Giải quyết match
 *     tags: [Matching]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Match resolved
 */
router.put('/:matchId/resolve', authenticateToken, roleCheck('staff'), matchingController.resolveMatch);

module.exports = router;

