const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 5000;

const app = express();

app.use('/', userRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})