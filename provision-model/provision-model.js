const fs = require('fs');
const path = require('path');
const getModelIndexFile = require('./getModelIndexFile');
const getOperationHooksIndexFile = require('./getOperationHooksIndexFile');
const getRemoteMethodsIndexFile = require('./getRemoteMethodsIndexFile');
const getRemoteHooksIndexFile = require('./getRemoteHooksIndexFile');

const baseModelsFolder = path.join(process.cwd(), 'common', 'models');

module.exports = function provisionModel(modelName, dryRun = false) {
  return new Promise((resolve, reject) => {
    const modelInstance = modelName.replace(
      /(^|-)([a-z])/g,
      (match) => match.replace('-', '').toUpperCase()
    );
    const modelContainerFolder = path.join(baseModelsFolder, modelName);
    // Create folders if they don't exist
    const directories = [
      {
        isModelFile: true,
        folder: '',
        indexFile: getModelIndexFile(modelName, modelInstance)
      },
      {
        folder: 'operation-hooks',
        indexFile: getOperationHooksIndexFile()
      },
      {
        folder: 'remote-methods',
        indexFile: getRemoteMethodsIndexFile()
      },
      {
        folder: 'remote-hooks',
        indexFile: getRemoteHooksIndexFile()
      }
    ].map(({ folder, indexFile, isModelFile = false }) => ({
      folder: isModelFile ? baseModelsFolder : path.join(baseModelsFolder, modelName, folder),
      indexFile,
      isModelFile,
    }));

    if (!fs.existsSync(modelContainerFolder)) {
      console.log(`${dryRun ? '[dry run] ' : ''}Creating folder '${modelContainerFolder}'`);
      dryRun || fs.mkdirSync(modelContainerFolder);
    }

    directories.forEach(({ isModelFile = false, folder, indexFile: content }) => {
      const filePath = isModelFile ? path.join(folder, `${modelName}.js`) : path.join(folder, 'index.js');

      if (!fs.existsSync(folder)) {
        console.log(`${dryRun ? '[dry run] ' : ''}Creating folder '${folder}'`);
        dryRun || fs.mkdirSync(folder);
      }

      console.log(`${dryRun ? '[dry run] ' : ''}Creating file '${filePath}'`);
      dryRun || fs.writeFileSync(filePath, content);
    });

    resolve();
  });
};
