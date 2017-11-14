'use strict';

const getUtilsIndexFile = () => (
`'use strict';

module.exports = {
  addAuditDates: require('./addAuditDates'),
};
`);

module.exports = getUtilsIndexFile;
