const express = require('express');
const reportController = require('../controllers/reportController');
const { authenticateToken, roleCheck } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/reports/dashboard:
 *   get:
 *     summary: Dashboard tổng hợp
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
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
 *                     totalLost:
 *                       type: number
 *                     totalFound:
 *                       type: number
 *                     totalReturned:
 *                       type: number
 *                     recoveryRate:
 *                       type: string
 */
router.get('/dashboard', authenticateToken, roleCheck('staff', 'admin'), reportController.getDashboard);

/**
 * @swagger
 * /api/reports/lost-by-category:
 *   get:
 *     summary: Báo cáo theo loại
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: campus
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lost items by category
 */
router.get('/lost-by-category', authenticateToken, roleCheck('staff'), reportController.getLostByCategory);

/**
 * @swagger
 * /api/reports/campus-comparison:
 *   get:
 *     summary: So sánh 2 campus
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Campus comparison data
 */
router.get('/campus-comparison', authenticateToken, roleCheck('staff'), reportController.campusComparison);

/**
 * @swagger
 * /api/reports/monthly:
 *   get:
 *     summary: Báo cáo hàng tháng
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: campus
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Monthly report data
 */
router.get('/monthly', authenticateToken, roleCheck('staff', 'admin'), reportController.getMonthlyReport);

/**
 * @swagger
 * /api/reports/weekly:
 *   get:
 *     summary: Báo cáo hàng tuần
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: week
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Weekly report data
 */
router.get('/weekly', authenticateToken, roleCheck('staff'), reportController.getWeeklyReport);

/**
 * @swagger
 * /api/reports/statistics:
 *   get:
 *     summary: Thống kê chi tiết
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Detailed statistics
 */
router.get('/statistics', authenticateToken, roleCheck('staff', 'admin'), reportController.getStatistics);

/**
 * @swagger
 * /api/reports/export:
 *   get:
 *     summary: Xuất PDF/Excel
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: format
 *         required: true
 *         schema:
 *           type: string
 *           enum: [csv, excel]
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Exported file
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *           text/csv:
 *             schema:
 *               type: string
 */
router.get('/export', authenticateToken, roleCheck('staff', 'admin'), reportController.exportReport);

module.exports = router;

