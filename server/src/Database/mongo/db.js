import mongoose from 'mongoose';

let db = mongoose.connect('mongodb://127.0.0.1:27017/task-manager', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

export default db;
