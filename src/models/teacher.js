const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Assuming you have a User model
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
}, { timestamps: true });

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    sparse: true // This makes the unique index only consider documents where the field exists
  },
  reviews: [ReviewSchema] // Array of review subdocuments
}, { timestamps: true });

module.exports = mongoose.model('Teacher', TeacherSchema);
