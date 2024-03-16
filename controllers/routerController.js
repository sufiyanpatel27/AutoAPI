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

  requests = body.requests;
  methods = body.methods;
  queryparams = body.quryparams;

  for (let i = 0; i <= requests.length - 1; i++) {
    let content2 = "";
    switch (requests[i]) {
      case "get":
        if (methods[i] == "findById()") {
          content2 = "router." + requests[i] + "(" + "'" + body.route + "/:id'" + ", async (req, res) => { \ntry { \nconst Users = await " + body.route.split('/')[1] + "Controller.getUsers(req.params.id); \nres.json(Users); \n} catch (error) { \nres.status(500).json({ error: 'Internal Server Error' }); \n}}); \n\n"
        } else if (methods[i] === "findOne()") {
          content2 = "router." + requests[i] + "(" + "'" + body.route + "'" + ", async (req, res) => { \ntry { \nconst Users = await " + body.route.split('/')[1] + "Controller.getUsers(req.query." + queryparams[i] + "); \nres.json(Users); \n} catch (error) { \nres.status(500).json({ error: 'Internal Server Error' }); \n}}); \n\n"
        }
        else {
          content2 = "router." + requests[i] + "(" + "'" + body.route + "'" + ", async (req, res) => { \ntry { \nconst Users = await " + body.route.split('/')[1] + "Controller.getUsers(); \nres.json(Users); \n} catch (error) { \nres.status(500).json({ error: 'Internal Server Error' }); \n}}); \n\n"
        }
        combinedContent += content2;
        break
      case "post":
        content2 = "router." + requests[i] + "(" + "'" + body.route + "'" + ", async (req, res) => { \nconst newData = req.body; \ntry { \nconst newUser = await " + body.route.split('/')[1] + "Controller.createUser(newData); \nres.status(201).json(newUser); \n} catch (error) { \nres.status(500).json({ error: 'Internal Server Error' }); \n}}); \n\n"
        combinedContent += content2;
        break
      case "put":
        content2 = "router." + requests[i] + "(" + "'" + body.route + "/:id'" + ", async (req, res) => { \nconst newData = req.body; \ntry { \nconst newUser = await " + body.route.split('/')[1] + "Controller.updateUser(req.params.id, newData); \nres.status(201).json(newUser); \n} catch (error) { \nres.status(500).json({ error: 'Internal Server Error' }); \n}}); \n\n"
        combinedContent += content2;
        break
      case "delete":
        if (methods[i] == "findOneAndDelete()") {
          content2 = "router." + requests[i] + "(" + "'" + body.route + "'" + ", async (req, res) => { \ntry { \nconst newUser = await " + body.route.split('/')[1] + "Controller.deleteUser(req.query." + queryparams[i] + "); \nres.status(201).json(newUser); \n} catch (error) { \nres.status(500).json({ error: 'Internal Server Error' }); \n}}); \n\n"
        } else {
          content2 = "router." + requests[i] + "(" + "'" + body.route + "/:id'" + ", async (req, res) => { \ntry { \nconst newUser = await " + body.route.split('/')[1] + "Controller.deleteUser(req.params.id); \nres.status(201).json(newUser); \n} catch (error) { \nres.status(500).json({ error: 'Internal Server Error' }); \n}}); \n\n"
        }
        combinedContent += content2;
        break
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

const deleteRouter = (body) => {
  fs.unlinkSync('./Code/routes/' + body.router.split('/')[1] + "Router.js");
  fs.unlinkSync('./Code/controllers/' + body.router.split('/')[1] + "Controller.js");
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
        let request = [];
        let methods = [];
        let queryparams = [];
        let models = [];

        const data = fs.readFileSync('./Code/routes/' + files[i], 'utf8');
        const Controllerdata = fs.readFileSync('./Code/controllers/' + files[i].split(".")[0].split("Router")[0] + "Controller.js", 'utf8');


        if (data.match("router.get")) {
          const searchTerm = 'users';
          const regex = new RegExp(`\\b${searchTerm}\\s*=\\s*([^;]*)`);
          const match = Controllerdata.match(regex);
          const variableValue = match[1].trim();
          const methodname = variableValue.split("await ")[1].split(".")[1].split("(")
          if (methodname[0] === "find") {
            methods.push("find()")
            queryparams.push("")
          } else if (methodname[0] === "findById") {
            methods.push("findById()")
            queryparams.push("")
          } else if (methodname[0] === "findOne") {
            methods.push("findOne()")
            queryparams.push(methodname[1].split(":")[0].split("{")[1])
          }

          models.push(variableValue.split("await ")[1].split(".")[0]);
          request.push('get')
        } if (data.match("router.post")) {
          const searchTerm = 'newUser';
          const regex = new RegExp(`\\b${searchTerm}\\s*=\\s*([^;]*)`);
          const match = Controllerdata.match(regex);
          const variableValue = match[1].trim();
          methods.push("save()")
          queryparams.push("")
          models.push(variableValue.split("new ")[1].split("(body")[0]);
          request.push('post')
        } if (data.match("router.put")) {
          const searchTerm = 'user';
          const regex = new RegExp(`\\b${searchTerm}\\s*=\\s*([^;]*)`);
          const match = Controllerdata.match(regex);
          const variableValue = match[1].trim();
          const methodname = variableValue.split("await ")[1].split(".")[1].split("(")
          if (methodname[0] === "findByIdAndUpdate") {
            methods.push("findByIdAndUpdate()")
            queryparams.push("")
          }
          models.push(variableValue.split("await ")[1].split(".")[0]);
          request.push('put')
        }
        if (data.match("router.delete")) {
          const searchTerm = 'result';
          const regex = new RegExp(`\\b${searchTerm}\\s*=\\s*([^;]*)`);
          const match = Controllerdata.match(regex);
          const variableValue = match[1].trim();
          const methodname = variableValue.split("await ")[1].split(".")[1].split("(")
          if (methodname[0] === "findByIdAndDelete") {
            methods.push("findByIdAndDelete()")
            queryparams.push("")
          } else if (methodname[0] === "findOneAndDelete") {
            methods.push("findOneAndDelete()")
            queryparams.push(methodname[1].split(":")[0].split("{")[1])
          }
          models.push(variableValue.split("await ")[1].split(".")[0]);
          request.push('delete')
        }

        files[i] = "/" + files[i].split(".")[0].split("Router")[0];
        routes.push(files[i]);
        routes.push(request)
        routes.push(models)
        routes.push(methods)
        routes.push(queryparams)
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
  readRouter,
  deleteRouter
};
