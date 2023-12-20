const fs = require('fs').promises;
const path = require('path');

const createDirectory = async (dirPath) => {
    try {
        await fs.mkdir(dirPath);
        console.log(`new Directory created: ${dirPath}`);
    } catch (err) {
        if (err.code === 'EEXIST') {
            console.log(`Directory already exists: ${dirPath}`);
        } else {
            throw err;
        }
    }
}

// Function to create nested folders
const createNewDirectory = async() => {
    const rootFolder = './Code';

    try {
        // Create the root folder
        await createDirectory(rootFolder);

        // Create multiple folders and nested folders
        const foldersToCreate = [
            'models',
            'controllers',
            'routes'
        ];

        for (const folder of foldersToCreate) {
            const folderPath = path.join(rootFolder, folder);
            await createDirectory(folderPath);
        }

        console.log('Directory structure created successfully!');
    } catch (err) {
        console.error('Error creating directory structure:', err);
    }
}

module.exports = createNewDirectory;