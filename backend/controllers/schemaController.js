// importing necessary packages
const fs = require('fs');
const path = require('path');
const util = require('util');
const doubleQuoteRemover = require('./doubleQuoteRemover')

// code for new Schema creation
const createSchema = (body) => {
  const content1 = "const mongoose = require('mongoose');\n\n";
  const content2 = "const " + body.schemaName + "Schema = new mongoose.Schema(";
  const content3 = doubleQuoteRemover(body.schema);
  const content4 = ");\n\n";
  const content5 = "const " + body.schemaName + " = mongoose.model(" + '"' + body.schemaName + '"' + ", " + body.schemaName + "Schema" + ");\n\n"
  const content6 = "module.exports = " + body.schemaName + ";";

  // merging all the contents
  const combinedContent = content1 + content2 + util.inspect(content3, { depth: null }) + content4 + content5 + content6;

  // creating a javascript file
  const txtFilePath = path.join("./Code/models", body.schemaName + '.js');

  // writing into the js file
  fs.writeFileSync(txtFilePath, combinedContent, 'utf-8');

  return body.schema;
}

module.exports = {
  createSchema
};
