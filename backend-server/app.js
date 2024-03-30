const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors =  require("cors");
const Authroutes = require("./routes/auth.routes.js")
const BlogPostroutes = require("./routes/blogpost.routes.js")

const { connectToDatabase } = require("./config/database.js")

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());


app.use('/auth', Authroutes)
app.use('/blog', BlogPostroutes)

connectToDatabase();

// Add a route to check the database connection
app.get('/', (req, res) => {

  const db = require('mongoose').connection;
  if (db.readyState === 1) {
    res.send('Database is connected');
  } else {
    res.send('Database connection is not established');
  }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});