// importing necessary packages
const fs = require('fs');
const path = require('path');
const util = require('util');

const controllerController = require('./controllerController')

// code for new Schema creation
const createRouter = async (body) => {

  await controllerController.createRouter(body)

  let combinedContent = ""
  const content1 = "const express = require('express'); \nconst bodyParser = require('body-parser'); \n"
  combinedContent += content1;

  controllers = body.models;
  
  const content2 = "const " + body.route.split('/')[1] + "Controller = require('../controllers/" + body.route.split('/')[1] + "Controller'); \n\n"
  combinedContent += content2
  const content1_2 = "const router = express.Router(); \nrouter.use(bodyParser.json());\n\n"
  combinedContent += content1_2

  methods = body.methods;
  for (let i = 0; i <= methods.length - 1; i++) {
    if (methods[i] == "get") {
      const content2 = "router." + methods[i] + "(" + "'" + body.route + "'" + ", async (req, res) => { \ntry { \nconst allUsers = await " + body.route.split('/')[1] +"Controller.getUsers(); \nres.json(allUsers); \n} catch (error) { \nres.status(500).json({ error: 'Internal Server Error' }); \n}}); \n\n"
      combinedContent += content2;
    } else if (methods[i] == "post") {
      const content2 = "router." + methods[i] + "(" + "'" + body.route + "'" + ", async (req, res) => { \nconst newData = req.body; \ntry { \nconst newUser = await " + body.route.split('/')[1] +"Controller.createUser(newData); \nres.status(201).json(newUser); \n} catch (error) { \nres.status(500).json({ error: 'Internal Server Error' }); \n}}); \n\n"
      combinedContent += content2;
    } else if (methods[i] == "put") {
      const content2 = "router." + methods[i] + "(" + "'" + body.route + "/:id'" + ", async (req, res) => { \nconst newData = req.body; \ntry { \nconst newUser = await " + body.route.split('/')[1] +"Controller.updateUser(req.params.id, newData); \nres.status(201).json(newUser); \n} catch (error) { \nres.status(500).json({ error: 'Internal Server Error' }); \n}}); \n\n"
      combinedContent += content2;
    } else if (methods[i] == "delete") {
      const content2 = "router." + methods[i] + "(" + "'" + body.route + "/:id'" + ", async (req, res) => { \nconst newData = req.body; \ntry { \nconst newUser = await " + body.route.split('/')[1] +"Controller.deleteUser(req.params.id, newData); \nres.status(201).json(newUser); \n} catch (error) { \nres.status(500).json({ error: 'Internal Server Error' }); \n}}); \n\n"
      combinedContent += content2;
    }
  }
  const content4 = "module.exports = router;"
  combinedContent += content4

  const txtFilePath = path.join("./Code/routes", body.route + 'Router.js');

  fs.writeFileSync(txtFilePath, combinedContent, 'utf-8');

  return body;
}

module.exports = {
  createRouter
};
