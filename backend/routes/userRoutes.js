// importing necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const schemaController = require('../controllers/schemaController');
const routerController = require('../controllers/routerController');
const createCode = require('../controllers/submitController')

// defining router
const router = express.Router();
router.use(bodyParser.json());

// route to create new schemas
router.post('/create_schema', async(req, res) => {
  const data = await schemaController.createSchema(req.body);
  res.json(data);
})

// route to create new routes
router.post('/create_router', async(req, res) => {
  const data = await routerController.createRouter(req.body);
  res.json(data);
})

// route to create server
router.post('/create_code', async(req, res) => {
  const data = await createCode.createCode();
  res.json(data)
})

module.exports = router;
