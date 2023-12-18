// routes/userRoutes.js
const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res) => {
  const users = userController.getUsers();
  res.json(users);
});

module.exports = router;
