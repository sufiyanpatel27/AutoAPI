// importing necessary packages
const fs = require('fs');
const path = require('path');
const util = require('util');
const doubleQuoteRemover = require('./doubleQuoteRemover')

// code for new Schema creation
const createRouter = (body) => {
    let combinedContent = ""
    models = body.models;
    const uniqueArray = [...new Set(models)];
    for (let i = 0; i<= uniqueArray.length-1; i++) {
        const content1 = "const " + uniqueArray[i] +" = require('../models/"+ uniqueArray[i] + "'); \n\n"
        combinedContent += content1
    }
    
    methods = body.methods;
    
    for (let i = 0; i <= methods.length - 1; i++) {
      if (methods[i] == "get") {
        const content2 = "const getUsers = async () => { \ntry { \nconst users = await User.find(); \nreturn users; \n} catch (error) { \nthrow error; \n} \n}; \n\n"
        combinedContent += content2;
      } else if (methods[i] == "post") {
        const content2 = "const createUser = async (body) => { \ntry { \nconst newUser = new User(body); \nawait newUser.save(); \nreturn newUser; \n} catch (error) { \nthrow error; \n} \n}; \n\n"
        combinedContent += content2;
      } else if (methods[i] == "put") {
        const content2 = "const updateUser = async (id, body) => { \ntry { \nconst user = await User.findByIdAndUpdate(id, body, { new: true }); \nreturn user; \n} catch (error) { \nthrow error; \n} \n}; \n\n"
        combinedContent += content2;
      } else if (methods[i] == "delete") {
        const content2 = "const deleteUser = async (id) => { \ntry { \nconst result = await User.findByIdAndDelete(id); \nreturn result !== null; \n} catch (error) { \nthrow error; \n} \n}; \n\n"
        combinedContent += content2;
      }
    }

    const content3 = "module.exports = {\n"
    combinedContent += content3
    for (let i = 0; i <= methods.length - 1; i++) {
        if (methods[i] == "get") {
            const content4 = "getUsers, \n"
            combinedContent += content4
        } else if (methods[i] == "post") {
            const content4 = "createUser, \n"
            combinedContent += content4
        } else if (methods[i] == "put") {
            const content4 = "updateUser, \n"
            combinedContent += content4
        } else if (methods[i] == "delete") {
            const content4 = "deleteUser, \n"
            combinedContent += content4
        }
    }

    const content5 = "};"
    combinedContent += content5
    
    const txtFilePath = path.join("./Code/controllers", body.route + '.js');

    fs.writeFileSync(txtFilePath, combinedContent, 'utf-8');


    return body;
}

module.exports = {
    createRouter
};
