import mongoose from 'mongoose';

const habitSchema = mongoose.Schema({
  name: String,
  description: String,
  count: Number,
  status: String
});

export const Habit = mongoose.model('Habit', habitSchema);