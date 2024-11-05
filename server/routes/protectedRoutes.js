import express from 'express';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';
import * as resultsController from '../controllers/resultsController.js';
import * as analyticsController from '../controllers/analyticsController.js';
import * as revaluationController from '../controllers/revaluationController.js';

const router = express.Router();

// Student routes
router.get('/results/:semester', 
  authenticateToken, 
  authorizeRole(['student']), 
  resultsController.getStudentResults
);

// Staff routes
router.get('/analytics/:batch/:department', 
  authenticateToken, 
  authorizeRole(['staff']), 
  analyticsController.getBatchAnalytics
);

router.post('/marks/upload',
  authenticateToken,
  authorizeRole(['staff']),
  resultsController.uploadMarks
);

// Parent routes
router.get('/student/:studentId/progress',
  authenticateToken,
  authorizeRole(['parent']),
  resultsController.getStudentProgress
);

export default router; 