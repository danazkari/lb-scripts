#!/usr/bin/env node
'use strict';

const lbScripts = require('commander');
const projectMeta = require('./package.json');
const provisionModel = require('./provision-model');
const provisionProject = require('./provision-project');

lbScripts
  .version(projectMeta.version)
  .option('-p, --provision-project', 'Provisions the current project')
  .option('-m, --provision-model [model-name]', 'Provisions the given model')
  .option('-d, --dry-run', 'Executes the process in dry run mode')
  .parse(process.argv);

if (lbScripts.provisionProject) {
  // Run project provisioning
  provisionProject(lbScripts.dryRun)
    .then(() => process.exit(0));
} else if (lbScripts.provisionModel) {
  // Run provisioning for the given model
  provisionModel(lbScripts.provisionModel, lbScripts.dryRun)
    .then(() => process.exit(0));
} else {
  // Error out, there are no given parameters
  console.error('Either --provision-project or --provision-model options should be used. Choose one, choose wisely.');
  process.exit(1);
}
