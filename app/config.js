import mongoose from 'mongoose';
const dbUri = require('./credentials').dbUri;

export const MongooseConnection = () => {
  console.log(dbUri);
  mongoose.connect(dbUri , {
    useMongoClient: true,
  });
  const db = mongoose.connection;
  db.on("error", (error) => { console.log("---FAILED to connect to mongoose", error); });
  db.once("open", () => {
    console.log("+++Connected to mongoose");
  });
};