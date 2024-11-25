const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const companyRoutes=require("./routes/companyRoutes")
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true, // Allows cookies to be sent
}));

app.use(cookieParser());


app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/SKILLSYNC', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
// Middleware
  // Parses incoming JSON requests

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/companies', companyRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to MongoDB

