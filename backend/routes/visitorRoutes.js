const express = require('express');
const {
  createVisitor,
  getAllVisitors,
  updateVisitorStatus,
  deleteVisitor // N
} = require('../controllers/visitorController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', createVisitor);
router.get('/', authMiddleware, getAllVisitors);
router.put('/:id/status', authMiddleware, updateVisitorStatus);
router.delete('/:id', authMiddleware, deleteVisitor); // N

module.exports = router;