import mongoose from 'mongoose';
const mongoURL = 'mongodb+srv://guri:guri123456789@cluster0.ff1uz.mongodb.net/task-manager?retryWrites=true&w=majority'; //'mongodb://127.0.0.1:27017/task-manager?retryWrites=true&w=majority';
let db = mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

export default db;
