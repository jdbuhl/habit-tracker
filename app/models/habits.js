import mongoose from 'mongoose';

const habitSchema = mongoose.Schema({
  name: String,
  description: String,
  count: Number,
  status: String,
  createdAt: Date,
  lastCompletedOn: Date,
  goal: Number,
});

export const Habit = mongoose.model('Habit', habitSchema);