const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const dotenv = require("dotenv");

dotenv.config();

const FS_ROOT = path.resolve(process.env.FS_ROOT);
let _fileId = 0;

async function getFullTree(rootPath = FS_ROOT, dirPath = '', parentId = _fileId, listing = []) {
  const items = fs.readdirSync(path.join(rootPath, dirPath));

  for (const item of items) {
    const relPath = path.join(dirPath, item);
    const stats = fs.statSync(path.join(rootPath, relPath));

    const isDirectory = stats.isDirectory();
    const itemData = {
      name: item,
      isDirectory,
      path: '/' + relPath,
      parentId: parentId,
      size: isDirectory ? null : stats.size,
      mimeType: isDirectory ? null : mime.lookup(item),
    };


    listing.push(itemData);

    if (isDirectory) {
      const children = await getFullTree(rootPath, relPath, _fileId++, listing);
      // ...
    }
  }

  return listing;
}


module.exports = {
  FS_ROOT,
  getFullTree,
};
