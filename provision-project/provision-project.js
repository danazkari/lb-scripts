'use strict';
const fs = require('fs');
const path = require('path');
const getUtilsIndexFile = require('./getUtilsIndexFile');
const getConstantsFile = require('./getConstantsFile');
const getAddAuditDatesFile = require('./getAddAuditDatesFile');

const currentWorkDirectory = process.cwd();
const baseCommonFolder = path.join(currentWorkDirectory, 'common');

module.exports = function provisionProject(dryRun = false) {
  return new Promise((resolve, reject) => {
    // Create the /utils folder
    const utilsFolder = path.join( baseCommonFolder, 'utils');
    if (!fs.existsSync(utilsFolder)) {
      console.log(`Creating folder '${utilsFolder}' ${dryRun ? '(dry run)' : ''}`);
      dryRun || fs.mkdirSync(utilsFolder);
    }
    // Create the index file within /utils
    const fileContents = [
      {
        filePath: path.join(utilsFolder, 'index.js'),
        content: getUtilsIndexFile(),
      },
      {
        filePath: path.join(baseCommonFolder, 'constants.js'),
        content: getConstantsFile(),
      },
      {
        filePath: path.join(utilsFolder, 'addAuditDates.js'),
        content: getAddAuditDatesFile(),
      }
    ];

    fileContents.forEach(({ filePath, content }) => {
      if (!fs.existsSync(filePath)) {
        console.log(`Creating '${filePath}' file ${dryRun ? '(dry run)' : ''}`)
        dryRun || fs.writeFileSync(filePath, content);
      }
    });

    resolve();
  });
};
