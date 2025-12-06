const express = require('express');
const router = express.Router();
const matchingController = require('../controllers/matchingController');
const { authenticateToken, roleCheck } = require('../middleware/auth');

// Staff: Tạo match thủ công
router.post('/', 
  authenticateToken, 
  roleCheck('staff'), 
  matchingController.createMatch
);

// Staff/Security: Xem danh sách matches (Security có thể xem completed matches)
router.get('/', 
  authenticateToken, 
  roleCheck('staff', 'security'), 
  matchingController.listMatches
);

// Student: Xem danh sách pending matches
router.get('/pending', 
  authenticateToken, 
  roleCheck('student'), 
  matchingController.getPendingMatches
);

// Student: Confirm match
router.post('/:matchId/confirm', 
  authenticateToken, 
  roleCheck('student'), 
  matchingController.confirmMatch
);

// Student: Reject match
router.post('/:matchId/reject', 
  authenticateToken, 
  roleCheck('student'), 
  matchingController.rejectMatch
);

// Security: Xem danh sách confirmed matches
router.get('/confirmed', 
  authenticateToken, 
  roleCheck('security'), 
  matchingController.getConfirmedMatches
);

// Staff/Security: Resolve match
router.put('/:matchId/resolve', 
  authenticateToken, 
  roleCheck('staff', 'security'), 
  matchingController.resolveMatch
);

module.exports = router;

