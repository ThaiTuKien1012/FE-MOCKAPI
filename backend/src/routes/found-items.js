const express = require('express');
const foundItemController = require('../controllers/foundItemController');
const { authenticateToken, roleCheck } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/found-items:
 *   post:
 *     summary: Ghi nhận tìm được
 *     tags: [Found Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FoundItem'
 *     responses:
 *       201:
 *         description: Found item recorded successfully
 */
router.post('/', authenticateToken, roleCheck('security'), foundItemController.createFoundItem);

/**
 * @swagger
 * /api/found-items/search:
 *   get:
 *     summary: Tìm kiếm đồ tìm được (Public)
 *     tags: [Found Items]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: campus
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 */
router.get('/search', foundItemController.searchFoundItems);

/**
 * @swagger
 * /api/found-items/{id}:
 *   get:
 *     summary: Xem chi tiết đồ tìm được
 *     tags: [Found Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Found item details
 */
router.get('/:id', authenticateToken, foundItemController.getFoundItem);

/**
 * @swagger
 * /api/found-items:
 *   get:
 *     summary: Danh sách đồ tìm được
 *     tags: [Found Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: campus
 *         schema:
 *           type: string
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
 *         description: List of found items
 */
router.get('/', authenticateToken, roleCheck('security', 'staff'), foundItemController.listFoundItems);

/**
 * @swagger
 * /api/found-items/{id}:
 *   put:
 *     summary: Cập nhật đồ tìm được
 *     tags: [Found Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put('/:id', authenticateToken, roleCheck('security'), foundItemController.updateFoundItem);

/**
 * @swagger
 * /api/found-items/{id}:
 *   delete:
 *     summary: Xóa đồ tìm được
 *     tags: [Found Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete('/:id', authenticateToken, roleCheck('security', 'staff'), foundItemController.deleteFoundItem);

module.exports = router;
