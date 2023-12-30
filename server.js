// importing necessary packages
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors')
require('dotenv').config();



// defining PORT
const PORT = process.env.PORT || 5000;

// defining express App
const app = express();

app.use(cors())

// using routes on path "/"
app.use('/', userRoutes);

// starting the App
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})