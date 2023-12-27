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
router.post('/create_schema', async (req, res) => {
  const data = await schemaController.createSchema(req.body);
  res.json(data);
})

// route to delete the schema
router.post('/delete_schema', async (req, res) => {
  const data = await schemaController.deleteSchema(req.body);
  res.json(data);
})

// route to create new routes
router.post('/create_router', async (req, res) => {
  const data = await routerController.createRouter(req.body);
  res.json(data);
})

router.post('/delete_router', async (req, res) => {
  const data = await routerController.deleteRouter(req.body);
  res.json(data);
})

// route to create server
router.post('/create_code', async (req, res) => {
  const data = await createCode.createCode();
  res.json(data)
})

// route to read the schemas
router.get('/schemas', async (req, res) => {
  await schemaController.readSchema((error, files) => {
    if (error) {
      // Handle errors
      console.error('Error:', error);
    } else {
      // Do something with the files
      res.json(files)
    }
  })
})

// route to read the routers
router.get('/routers', async (req, res) => {
  await routerController.readRouter((error, files) => {
    if (error) {
      // Handle errors
      console.error('Error:', error);
    } else {
      // Do something with the files
      res.json(files)
    }
  })
})


module.exports = router;
