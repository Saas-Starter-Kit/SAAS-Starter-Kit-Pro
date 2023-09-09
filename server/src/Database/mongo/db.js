import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI;

// let db;

// Used for testing db connection. cd server and run npm start for checking.
let db = mongoose.connect(mongoURI, {
 useNewUrlParser: true,
 useCreateIndex: true,
 useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
 console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (error) => {
 console.log(error);
});

export default db;
