const mongoose = require('mongoose');
const Visitor = require('./models/Visitor');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/visitor-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');

  // Create new visitor
  const newVisitor = new Visitor({
    name: 'John Doe',
    mobile: '9876543210',
    email: 'john@gmail.com',
    visitorCount: '3',
    purpose: 'Meeting with HR',
    meetingPerson: 'Omkar Jadhav',
    meetingPersonDesignation: 'Team Lead',
    department: 'IT',
    status: 'pending',
  });

  // Save to DB
  return newVisitor.save();
})
.then(() => {
  console.log('✅ Visitor added successfully!');
  mongoose.disconnect(); // Close DB connection
})
.catch((err) => {
  console.error('❌ Error:', err);
  mongoose.disconnect();
});
