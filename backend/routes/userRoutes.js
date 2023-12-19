// importing necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');

// defining router
const router = express.Router();
router.use(bodyParser.json());

// route on path "/"
router.post('/', async(req, res) => {
  const data = await userController.createData(req.body);
  res.json(data);
})

module.exports = router;
