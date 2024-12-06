const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const companyRoutes=require("./routes/companyRoutes")
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true, // Allow cookies and authorization headers
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

app.use(cookieParser());


app.use(bodyParser.json());
const dbUrl = 'mongodb://localhost:27017/SKILLSYNC';
console.log(process.env.DB_URL);

mongoose.connect(dbUrl, {
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

