async function getAllJsons(pressed) {
    try {
        const directoryPath = 'maps/intro';
        const response = await fetch(directoryPath);
        
        if (!response.ok) {
            throw new Error('Failed to fetch directory contents. Status: ' + response.status);
        }

        const fileNamesText =await response.text();
        // Split the text response by newlines to get an array of file names
        var fileNames = fileNamesText.split('\n').filter(fileName => fileName.trim() !== '');
        fileNames = fileNames
    .filter(fileName => fileName.trim().includes('.json')) // Filter only file names ending with '.json'
    .map(fileName => {
        // Extract the file name from the HTML anchor tag
        const regex = /\/([^\/]+\.json)/;
        const match = fileName.match(regex);
        if(pressed=='intro') return match ? match[1].slice(0,27+2) : null; 
        return match ? match[1].slice(0,27) : null; 
    });

    fileNames.forEach((fileName, index, array) => {
        const indexAfterGreaterThan = fileName.indexOf('\">');
        if (indexAfterGreaterThan !== -1) {
            array[index] = fileName.substring(0, indexAfterGreaterThan);
        }
    });

        
        console.log(fileNames);
        return fileNames;
    } catch (err) {
        console.error("Error accessing directory:", err);
        return [];
    }
}

// Call the function to get file names


