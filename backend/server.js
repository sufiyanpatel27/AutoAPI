// importing necessary packages
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const createNewDirectory = require('./newDirectoryGenerator/DirectoryGenerator')

// defining PORT
const PORT = process.env.PORT || 5000;

// defining express App
const app = express();

createNewDirectory()

// using routes on path "/"
app.use('/', userRoutes);

// starting the App
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})