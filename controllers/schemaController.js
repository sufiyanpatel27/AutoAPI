// importing necessary packages
const fs = require('fs');
const path = require('path');
const util = require('util');

// code for new Schema creation
const createSchema = (body) => {
  const content1 = "const mongoose = require('mongoose');\n\n";
  const content2 = "const " + body.schemaName + "Schema = new mongoose.Schema(";
  const content3 = body.schema;
  const content4 = ");\n\n";
  const content5 = "const " + body.schemaName + " = mongoose.model(" + '"' + body.schemaName + '"' + ", " + body.schemaName + "Schema" + ");\n\n"
  const content6 = "module.exports = " + body.schemaName + ";";

  // merging all the contents
  const combinedContent = content1 + content2 + util.inspect(content3, { depth: null }) + content4 + content5 + content6;

  // creating a javascript file
  const txtFilePath = path.join("./Code/models", body.schemaName + '.js');

  // writing into the js file
  fs.writeFileSync(txtFilePath, combinedContent, 'utf-8');

  //return body.schema;
}

// code for reading all Schemas
const readSchema = (callback) => {
  fs.readdir('./Code/models/', (err, files) => {
    if (typeof callback === 'function') {
      if (err) {
        console.error('Error reading directory:', err);
        return callback(err);
      }
      for (let i = 0; i <= files.length-1; i++) {
        files[i] = files[i].split(".")[0];
      }
      callback(null, files);
    } else {
      console.error('Callback is not a function');
    }
  });
}

module.exports = {
  createSchema,
  readSchema
};
