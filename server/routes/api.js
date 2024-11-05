import express from 'express';
import multer from 'multer';
import { getResults, submitRevaluation, getRevaluationRequests, updateRevaluationStatus } from '../controllers/resultsController.js';
import { getBatchAnalytics } from '../controllers/analyticsController.js';
import { uploadMarks } from '../controllers/marksController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Results routes
router.get('/results/:semester', getResults);
router.get('/revaluation/requests', getRevaluationRequests);
router.post('/revaluation/requests', submitRevaluation);
router.patch('/revaluation/requests/:id', updateRevaluationStatus);

// Analytics routes
router.get('/analytics/:batch/:department', getBatchAnalytics);

// Marks upload route
router.post('/marks/upload', upload.single('file'), uploadMarks);

export default router; 