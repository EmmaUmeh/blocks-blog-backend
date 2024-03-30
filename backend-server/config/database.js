const mongoose = require('mongoose');

require('dotenv').config();

const Mongourl = process.env.MONGO_URL;

const connectToDatabase = () => {
  mongoose.connect(Mongourl, {
    useNewUrlParser: true,
  });

  const db = mongoose.connection;
  

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
};

module.exports = { connectToDatabase };