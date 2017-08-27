import mongoose from 'mongoose';

const habitSchema = mongoose.Schema({
  name: String,
  description: String,
  count: Number,
  status: String
});

const Habit = mongoose.model('Habit', habitSchema);