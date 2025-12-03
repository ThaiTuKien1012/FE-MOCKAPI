const express = require('express');
const uploadController = require('../controllers/uploadController');
const { authenticateToken, roleCheck } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/upload/images:
 *   post:
 *     summary: Upload ảnh
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Tối đa 5 ảnh, mỗi ảnh tối đa 5MB
 *     responses:
 *       201:
 *         description: Images uploaded successfully
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
 *                     urls:
 *                       type: array
 *                       items:
 *                         type: string
 *                     fileIds:
 *                       type: array
 *                       items:
 *                         type: string
 *       400:
 *         description: No files uploaded
 */
router.post('/images', 
  authenticateToken, 
  roleCheck('student', 'security'),
  uploadController.uploadImages
);

/**
 * @swagger
 * /api/upload/images/{fileId}:
 *   delete:
 *     summary: Xóa ảnh
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Image deleted successfully
 */
router.delete('/images/:fileId',
  authenticateToken,
  uploadController.deleteImage
);

module.exports = router;

