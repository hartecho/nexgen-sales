import mongoose from 'mongoose';
import Training from '~/server/models/Training.js';

const openEndedQuestionSchema = new mongoose.Schema({
  question: { 
    type: String, 
    required: true 
  },
});

const courseSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: String,
  image: String,
  trainings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Training', // Referencing the Training model
  }],
  test: [openEndedQuestionSchema] // Replacing the quiz with open-ended questions
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
