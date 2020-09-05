import fs from 'fs';
import path from 'path';

// Create directory.
const newDir = path.join(__dirname, 'test-dir');
if (!fs.existsSync(newDir)) {
  fs.mkdirSync(newDir);
}

// Create and write to file.
const fileName = path.join(newDir, 'hello.txt');
fs.writeFileSync(fileName, 'Hello, World!');

// Append to file.
fs.appendFileSync(fileName, '\nHello again!');

// Read file.
const fileBuffer = fs.readFileSync(fileName);
console.log(fileBuffer.toString('utf8'));

// Rename file.
const now = new Date();
const dateString = now.toISOString().replace(':', '-');
const newFileName = path.join(newDir, `hello-${dateString}.txt`);
fs.renameSync(fileName, newFileName);
