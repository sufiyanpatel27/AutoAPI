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

const deleteSchema = (body) => {
  //console.log(body.schema);
  fs.unlinkSync('./Code/models/' + body.schema + ".js")
}
// code for reading all Schemas
const readSchema = (callback) => {
  fs.readdir('./Code/models/', (err, files) => {
    if (typeof callback === 'function') {
      if (err) {
        console.error('Error reading directory:', err);
        return callback(err);
      }

      let info = []

      for (let i = 0; i <= files.length - 1; i++) {
        let models = [];
        files[i] = files[i].split(".")[0];
        //console.log(files)
        const data = fs.readFileSync('./Code/models/' + files[i] + ".js", 'utf8');
        const searchTerm = files[i] + 'Schema';
        const regex = new RegExp(`\\b${searchTerm}\\s*=\\s*([^;]*)`);
        const match = data.match(regex);
        const variableValue = match[1].trim();
        const final_data = variableValue.split('(')
        const stringJson = final_data[1].split(')')[0]
        //
        str = stringJson.trim();
        str = str.substring(1, str.length - 1);
        var parts = str.split(/,(?![^{]*})/);
        var obj = {};

        parts.forEach(function (part) {
          var keyValue = part.split(/:(?![^{]*})/);
          var key = keyValue[0].trim();
          var value = keyValue[1].trim();
          obj[key] = eval('(' + value + ')');
        });
        //

        models.push(files[i])
        models.push(obj)

        info.push(models)
      }

      //console.log(info)



      callback(null, info);
    } else {
      console.error('Callback is not a function');
    }
  });
}

module.exports = {
  createSchema,
  readSchema,
  deleteSchema
};
