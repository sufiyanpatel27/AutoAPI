const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

const App = express();

App.get('/', (req, res) => {
    res.json("server started")
})

App.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})