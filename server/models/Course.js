import mongoose from 'mongoose';
import Training from '~/server/models/Graphics/Training.js';

const quizSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correctAnswer: Number,
  });

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    image: String,
    trainings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Training', // Referencing the TrainingModule schema
      }],
    test: [quizSchema]
  });

const Course = mongoose.model('Course', courseSchema);

export default Course;