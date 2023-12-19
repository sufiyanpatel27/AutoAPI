// importing necessary packages
const fs = require('fs');
const path = require('path');
const util = require('util');
const doubleQuoteRemover = require('./doubleQuoteRemover')

// code for new Schema creation
const createRouter = (body) => {
  methods = body.methods;
  let combinedContent = ""
  const content1 = "const express = require('express'); \nconst bodyParser = require('body-parser'); \nconst userController = require('../controllers/userController'); \n"
  const content1_2 = "const router = express.Router(); \nrouter.use(bodyParser.json());"
  combinedContent += content1;
  combinedContent += content1_2
  for (let i = 0; i <= methods.length - 1; i++) {
    if (methods[i] == "get") {
      const content2 = "router." + methods[i] + "(" + "'" + body.route + "'" + ", async (req, res) => { \ntry { \nconst allUsers = await userController.getUsers(); \nres.json(allUsers); \n} catch (error) { \nres.status(500).json({ error: 'Internal Server Error' }); \n}}); \n"
      combinedContent += content2;
    } else if (methods[i] == "post") {
      const content2 = "router." + methods[i] + "(" + "'" + body.route + "'" + ", async (req, res) => { \nconst newData = req.body; \ntry { \nconst newUser = await userController.createUser(newData); \nres.status(201).json(newUser); \n} catch (error) { \nres.status(500).json({ error: 'Internal Server Error' }); \n}}); \n"
      combinedContent += content2;
    } else if (methods[i] == "put") {
      const content2 = "router." + methods[i] + "(" + "'" + body.route + "'" + ", async (req, res) => { \nconst newData = req.body; \ntry { \nconst newUser = await userController.updateUser(req.params.id, newData); \nres.status(201).json(newUser); \n} catch (error) { \nres.status(500).json({ error: 'Internal Server Error' }); \n}}); \n"
      combinedContent += content2;
    } else if (methods[i] == "delete") {
      const content2 = "router." + methods[i] + "(" + "'" + body.route + "'" + ", async (req, res) => { \nconst newData = req.body; \ntry { \nconst newUser = await userController.deleteUser(req.params.id, newData); \nres.status(201).json(newUser); \n} catch (error) { \nres.status(500).json({ error: 'Internal Server Error' }); \n}}); \n"
      combinedContent += content2;
    }
  }
  const content4 = "module.exports = router;"
  combinedContent += content4
  
  const txtFilePath = path.join("./Code/controllers", body.route + '.js');

  fs.writeFileSync(txtFilePath, combinedContent, 'utf-8');


  return body;
}

module.exports = {
  createRouter
};
