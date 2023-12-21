//Code to remove double quotes from the objects

const removeDoubleQuotes = (obj) => {
    if (typeof obj === 'object') {
        if (Array.isArray(obj)) {
            // If it's an array, process each element
            return obj.map(removeDoubleQuotes);
        } else {
            // If it's an object, process each property
            const newObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const newKey = key.replace(/"/g, ''); // Remove double quotes from the key
                    newObj[newKey] = removeDoubleQuotes(obj[key]);
                }
            }
            return newObj;
        }
    } else {
        return obj;
    }
}

module.exports = removeDoubleQuotes;
