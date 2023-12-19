// importing necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const schemaController = require('../controllers/schemaController');
const routerController = require('../controllers/routerController');

// defining router
const router = express.Router();
router.use(bodyParser.json());

// route on path "/"
router.post('/create_schema', async(req, res) => {
  const data = await schemaController.createSchema(req.body);
  res.json(data);
})

// route on path "/"
router.post('/create_router', async(req, res) => {
  const data = await routerController.createRouter(req.body);
  res.json(data);
})

module.exports = router;
