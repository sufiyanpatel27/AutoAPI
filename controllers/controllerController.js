// importing necessary packages
const fs = require('fs');
const path = require('path');
const util = require('util');

// code for new Controller creation
const createRouter = (body) => {
  let combinedContent = ""
  models = body.models;
  const uniqueArray = [...new Set(models)];
  for (let i = 0; i <= uniqueArray.length - 1; i++) {
    const content1 = "const " + uniqueArray[i] + " = require('../models/" + uniqueArray[i] + "'); \n\n"
    combinedContent += content1
  }

  requests = body.requests;

  methods = body.methods;

  quryparams = body.quryparams;

  console.log(methods)

  for (let i = 0; i <= requests.length - 1; i++) {
    let content2 = "";
    switch (requests[i]) {
      case "get":
        if (methods[i] === "findById()") {
          content2 = "const getUsers = async (id) => { \ntry { \nconst users = await " + body.models[i] + ".findById(id);"
        } else if(methods[i] === "findOne()") {
          content2 = "const getUsers = async (quryparam) => { \ntry { \nconst users = await " + body.models[i] + ".findOne( {" + quryparams[i] + ": quryparam" +" });"
        }
        else {
          content2 = "const getUsers = async () => { \ntry { \nconst users = await " + body.models[i] + ".find();"
        }
        content2 += " \nreturn users; \n} catch (error) { \nthrow error; \n} \n}; \n\n"

        //content2 = "const getUsers = async () => { \ntry { \nconst users = await " + body.models[i] + ".find(); \nreturn users; \n} catch (error) { \nthrow error; \n} \n}; \n\n"
        combinedContent += content2;
        break
      case "post":
        content2 = "const createUser = async (body) => { \ntry { \nconst newUser = new " + body.models[i] + "(body); \nawait newUser.save(); \nreturn newUser; \n} catch (error) { \nthrow error; \n} \n}; \n\n"
        combinedContent += content2;
        break
      case "put":
        content2 = "const updateUser = async (id, body) => { \ntry { \nconst user = await " + body.models[i] + ".findByIdAndUpdate(id, body, { new: true }); \nreturn user; \n} catch (error) { \nthrow error; \n} \n}; \n\n"
        combinedContent += content2;
        break
      case "delete":
        if (methods[i] === "findOneAndDelete()") {
          content2 = "const deleteUser = async (quryparam) => { \ntry { \nconst result = await " + body.models[i] + ".findOneAndDelete( {" + quryparams[i] + ": quryparam" +" });"
        } else {
          content2 = "const deleteUser = async (id) => { \ntry { \nconst result = await " + body.models[i] + ".findByIdAndDelete(id);"
        }
        content2 += " \nreturn result !== null; \n} catch (error) { \nthrow error; \n} \n}; \n\n"

        //content2 = "const deleteUser = async (id) => { \ntry { \nconst result = await " + body.models[i] + ".findByIdAndDelete(id); \nreturn result !== null; \n} catch (error) { \nthrow error; \n} \n}; \n\n"
        combinedContent += content2;
        break
    }
  }

  const content3 = "module.exports = {\n"
  combinedContent += content3
  for (let i = 0; i <= requests.length - 1; i++) {
    let content4 = "";
    switch (requests[i]) {
      case "get":
        content4 = "getUsers, \n"
        combinedContent += content4
        break
      case "post":
        content4 = "createUser, \n"
        combinedContent += content4
        break
      case "put":
        content4 = "updateUser, \n"
        combinedContent += content4
        break
      case "delete":
        content4 = "deleteUser, \n"
        combinedContent += content4
        break
    }
  }

  const content5 = "};"
  // merging all the contents
  combinedContent += content5

  // creating a javascript file
  const txtFilePath = path.join("./Code/controllers", body.route + 'Controller.js');

  // writing into the js file
  fs.writeFileSync(txtFilePath, combinedContent, 'utf-8');


  return body;
}

module.exports = {
  createRouter
};
