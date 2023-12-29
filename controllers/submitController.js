// importing necessary packages
const fs = require('fs');
const path = require('path');
const util = require('util');
const archiver = require('archiver');


// code for Server creation
const createCode = () => {
    fs.readdir('./Code/routes/', (err, files) => {
        let combinedContent = ""
        if (err) console.error('Error reading folder:', err);
        const content1 = "const express = require('express');\n";
        const content3 = "const mongoose = require('mongoose');\n";
        combinedContent += content1 + content3;
        for (let i = 0; i <= files.length - 1; i++) {
            const content2 = "const " + files[i].split('.')[0] + " = require('./routes/" + files[i].split('.')[0] + "');\n";
            combinedContent += content2
        }
        const content5 = "\nconst PORT = process.env.PORT || 5000;\n"
        const content6 = "mongoose.connect('mongodb://127.0.0.1:27017/herewego', \n{ useNewUrlParser: true, useUnifiedTopology: true } \n);\n\n";
        const content7 = "const db = mongoose.connection;\n"
        const content8 = "db.on('error', console.error.bind(console, 'MongoDB connection error:'));\n"
        const content9 = "db.once('open', () => { \nconsole.log('Connected to MongoDB'); \n});\n\n"
        const content10 = "const app = express();\n\n"
        combinedContent += content5 + content6 + content7 + content8 + content9 + content10
        for (let i = 0; i <= files.length - 1; i++) {
            const content2 = "app.use('/', " + files[i].split('.')[0] + ");\n";
            combinedContent += content2
        }
        const content11 = "\n"
        const content12 = "app.listen(PORT, () => { \nconsole.log(`Server is running on port ${PORT}`) \n})"

        // merging all the contents
        combinedContent += content11 + content12

        // creating a javascript file
        const txtFilePath = path.join("./Code", "server" + '.js');

        // writing into the js file
        fs.writeFileSync(txtFilePath, combinedContent, 'utf-8');


        //
        const outputZip = fs.createWriteStream('Code.zip');

        // Create a zip archive
        const archive = archiver('zip', { zlib: { level: 9 } });

        // Pipe the archive to the output stream
        archive.pipe(outputZip);

        // Add all files in the folder to the archive
        archive.directory('Code', false);

        // Finalize the archive
        archive.finalize();

    });
}

module.exports = {
    createCode
};
