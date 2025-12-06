const express = require('express');
const router = express.Router();
const securityController = require('../controllers/securityController');
const { authenticateToken, roleCheck } = require('../middleware/auth');

/**
 * @swagger
 * /api/security/dashboard/stats:
 *   get:
 *     summary: Thống kê dashboard cho Security
 *     tags: [Security]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Security dashboard statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       description: Tổng số đồ tìm thấy
 *                     unclaimed:
 *                       type: number
 *                       description: Số đồ chưa match
 *                     pending:
 *                       type: number
 *                       description: Số match đang chờ confirm
 *                     confirmed:
 *                       type: number
 *                       description: Số match đã confirm (sẵn sàng trả)
 *                     completed:
 *                       type: number
 *                       description: Số match đã hoàn thành (đã trả)
 *                     today:
 *                       type: object
 *                       properties:
 *                         found:
 *                           type: number
 *                         confirmed:
 *                           type: number
 *                         completed:
 *                           type: number
 *                     campus:
 *                       type: string
 */
router.get('/dashboard/stats', 
  authenticateToken, 
  roleCheck('security'), 
  securityController.getDashboardStats
);

module.exports = router;

