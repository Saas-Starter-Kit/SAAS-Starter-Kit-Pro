import mongoose from 'mongoose';

const mongoURL = process.env.MONGO_URL;

let db = mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

export default db;
