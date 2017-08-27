import mongoose from 'mongoose';

export const MongooseConnection = () => {
  mongoose.connect('mongodb://127.0.0.1/habitsTracker', {
    useMongoClient: true,
  });
  const db = mongoose.connection;
  db.on("error", () => { console.log("---FAILED to connect to mongoose"); });
  db.once("open", () => {
    console.log("+++Connected to mongoose");
  });
};