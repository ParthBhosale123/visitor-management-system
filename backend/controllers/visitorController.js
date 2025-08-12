const Visitor = require('../models/Visitor');

const createVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.create(req.body);
    
    // Emit real-time notification to HR
    req.io.emit('newVisitor', visitor);
    
    res.status(201).json({
      message: 'Visitor request submitted successfully',
      visitor
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find()
      .populate('reviewedBy', 'username')
      .sort({ createdAt: -1 });
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVisitorStatus = async (req, res) => {
  try {
    const { status, hrNotes } = req.body;
    const visitor = await Visitor.findById(req.params.id);
    
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }

    visitor.status = status;
    visitor.reviewedBy = req.user._id;
    visitor.reviewedAt = new Date();
    
    if (hrNotes) visitor.hrNotes = hrNotes;
    if (status === 'in') visitor.entryTime = new Date();
    if (status === 'out') visitor.exitTime = new Date();
    
    await visitor.save();
    
    // Emit real-time update
    req.io.emit('visitorStatusUpdate', visitor);
    
    res.json(visitor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVisitor = async (req, res) => {  // N
  try {
    const visitorId = req.params.id;
    await Visitor.findByIdAndDelete(visitorId);
    res.status(200).json({ message: 'Visitor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting visitor' });
  }
};


module.exports = {
  createVisitor,
  getAllVisitors,
  updateVisitorStatus,
  deleteVisitor // N
};