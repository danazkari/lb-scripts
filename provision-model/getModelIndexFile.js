'use strict';

const getModelIndexFile = (modelName, modelInstance) => (
`'use strict';

const operationHooks = require('./${modelName}/operation-hooks');
const remoteHooks = require('./${modelName}/remote-hooks');
const remoteMethods = require('./${modelName}/remote-methods');

module.exports = function(${modelInstance}) {
  // Set up all operation hooks
  operationHooks.forEach(
    ({operation, method}) => ${modelInstance}.observe(operation, method)
  );

  // Set up all remote hooks
  remoteHooks.forEach(
    ({remote, methodName, method}) => ${modelInstance}[remote](methodName, method)
  );

  // Set up all remote methods
  remoteMethods.forEach(
    ({meta, methodObject}) => {
      Object.assign(${modelInstance}, methodObject);
      ${modelInstance}.remoteMethod(meta.name, meta.options);
    }
  );
};
`
);

module.exports = getModelIndexFile;
