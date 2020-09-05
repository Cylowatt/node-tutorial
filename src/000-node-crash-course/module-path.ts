import path from 'path';

// Base file name.
console.log(path.basename(__filename));

// Directory name.
console.log(path.dirname(__filename));

// File extension.
console.log(path.extname(__filename));

// Create ParsedPath object.
const parsedPath = path.parse(__filename);
console.log(parsedPath);

// Concatenate paths.
console.log(path.join(__dirname, 'test', 'hello.html'));
