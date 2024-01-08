// importing necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const schemaController = require('../controllers/schemaController');
const routerController = require('../controllers/routerController');
const createCode = require('../controllers/submitController')
const createNewDirectory = require('../scripts/DirectoryGenerator')
const directoryDelete = require('../scripts/DirectoryDelete')
require('dotenv').config();

const environment = process.env.environment;
let base_url = ""
if (environment == "prod") {
  base_url = process.env.base_url;
} else if (environment == "dev") {
  base_url = "http://localhost:5000/";
}
const PORT = process.env.PORT;
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

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

  const outputZip = fs.createWriteStream('Code.zip');

  // Create a zip archive
  const archive = archiver('zip', { zlib: { level: 9 } });

  // Pipe the archive to the output stream
  archive.pipe(outputZip);

  // Add all files in the folder to the archive
  archive.directory('Code', false);

  // Finalize the archive
  archive.finalize();

  outputZip.on('close', () => {
    res.json({ zipFileUrl: base_url + "api/download-zip" })
  });
})

router.get('/api/download-zip', (req, res) => {
  const zipFilePath = path.join('Code.zip');
  res.download(zipFilePath);
});

router.get('/start', async(req, res) => {
  await createNewDirectory('./Code');
  res.json("done")
})

// route to read the schemas
router.get('/schemas', async (req, res) => {
  // creating the export diretory
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
