// importing necessary packages
const fs = require('fs');
const path = require('path');
const util = require('util');

const controllerController = require('./controllerController')

// code for new Router creation
const createRouter = async (body) => {
  console.log(body)

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
      const content2 = "router." + methods[i] + "(" + "'" + body.route + "'" + ", async (req, res) => { \ntry { \nconst allUsers = await " + body.route.split('/')[1] + "Controller.getUsers(); \nres.json(allUsers); \n} catch (error) { \nres.status(500).json({ error: 'Internal Server Error' }); \n}}); \n\n"
      combinedContent += content2;
    } else if (methods[i] == "post") {
      const content2 = "router." + methods[i] + "(" + "'" + body.route + "'" + ", async (req, res) => { \nconst newData = req.body; \ntry { \nconst newUser = await " + body.route.split('/')[1] + "Controller.createUser(newData); \nres.status(201).json(newUser); \n} catch (error) { \nres.status(500).json({ error: 'Internal Server Error' }); \n}}); \n\n"
      combinedContent += content2;
    } else if (methods[i] == "put") {
      const content2 = "router." + methods[i] + "(" + "'" + body.route + "/:id'" + ", async (req, res) => { \nconst newData = req.body; \ntry { \nconst newUser = await " + body.route.split('/')[1] + "Controller.updateUser(req.params.id, newData); \nres.status(201).json(newUser); \n} catch (error) { \nres.status(500).json({ error: 'Internal Server Error' }); \n}}); \n\n"
      combinedContent += content2;
    } else if (methods[i] == "delete") {
      const content2 = "router." + methods[i] + "(" + "'" + body.route + "/:id'" + ", async (req, res) => { \nconst newData = req.body; \ntry { \nconst newUser = await " + body.route.split('/')[1] + "Controller.deleteUser(req.params.id, newData); \nres.status(201).json(newUser); \n} catch (error) { \nres.status(500).json({ error: 'Internal Server Error' }); \n}}); \n\n"
      combinedContent += content2;
    }
  }
  const content4 = "module.exports = router;"
  // merging all the contents
  combinedContent += content4

  // creating a javascript file
  const txtFilePath = path.join("./Code/routes", body.route + 'Router.js');

  // writing into the js file
  fs.writeFileSync(txtFilePath, combinedContent, 'utf-8');

  return body;
}

const readRouter = (callback) => {
  fs.readdir('./Code/routes/', (err, files) => {
    if (typeof callback === 'function') {
      if (err) {
        console.error('Error reading directory:', err);
        return callback(err);
      }
      let info = [];

      for (let i = 0; i <= files.length - 1; i++) {
        let routes = [];
        let method = [];
        let models = [];

        const data = fs.readFileSync('./Code/routes/' + files[i], 'utf8');
        const Controllerdata = fs.readFileSync('./Code/controllers/' + files[i].split(".")[0].split("Router")[0] + "Controller.js", 'utf8');


        if (data.match("router.get")) {
          const searchTerm = 'users';
          const regex = new RegExp(`\\b${searchTerm}\\s*=\\s*([^;]*)`);
          const match = Controllerdata.match(regex);
          const variableValue = match[1].trim();
          models.push(variableValue.split("await ")[1].split(".find()")[0]);
          method.push('get')
        } if (data.match("router.post")) {
          const searchTerm = 'newUser';
          const regex = new RegExp(`\\b${searchTerm}\\s*=\\s*([^;]*)`);
          const match = Controllerdata.match(regex);
          const variableValue = match[1].trim();
          models.push(variableValue.split("new ")[1].split("(body")[0]);
          method.push('post')
        } if (data.match("router.put")) {
          const searchTerm = 'user';
          const regex = new RegExp(`\\b${searchTerm}\\s*=\\s*([^;]*)`);
          const match = Controllerdata.match(regex);
          const variableValue = match[1].trim();
          models.push(variableValue.split("await ")[1].split(".findByIdAndUpdate")[0]);
          method.push('put')
        }
        if (data.match("router.delete")) {
          const searchTerm = 'result';
          const regex = new RegExp(`\\b${searchTerm}\\s*=\\s*([^;]*)`);
          const match = Controllerdata.match(regex);
          const variableValue = match[1].trim();
          models.push(variableValue.split("await ")[1].split(".findByIdAndDelete")[0]);
          method.push('delete')
        }

        files[i] = "/" + files[i].split(".")[0].split("Router")[0];
        routes.push(files[i]);
        routes.push(method)
        routes.push(models)
        info.push(routes)
      }
      //console.log(info)

      callback(null, info);
    } else {
      console.error('Callback is not a function');
    }
  });
}

module.exports = {
  createRouter,
  readRouter
};
