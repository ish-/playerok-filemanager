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

const FileSystem = require("../models/FileSystem.model");
async function updateFileSystemInDB(rootPath = FS_ROOT, dirPath = '', parentId = null, listing = []) {
  const items = fs.readdirSync(path.join(rootPath, dirPath));

  const savePromises = items.map(async (item) => {
    const relPath = path.join(dirPath, item);
    const stats = fs.statSync(path.join(rootPath, relPath));

    const isDirectory = stats.isDirectory();
    const dbItem = new FileSystem( {
      name: item,
      isDirectory,
      path: '/' + relPath,
      parentId,
      size: isDirectory ? null : stats.size,
      mimeType: isDirectory ? null : mime.lookup(item),
    } );

    await dbItem.save().catch(err => console.error({err}));
    if (!dbItem._id)
      throw 'No id: ' + dbItem.path;

    listing.push(dbItem);

    if (isDirectory) {
      await updateFileSystemInDB(rootPath, relPath, dbItem._id, listing);
    }
  });

  await Promise.all(savePromises);
  console.log('FileSystem tree updated.');

  return listing;
}


module.exports = {
  FS_ROOT,
  getFullTree,
  updateFileSystemInDB,
};
