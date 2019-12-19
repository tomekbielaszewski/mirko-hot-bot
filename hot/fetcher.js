'use strict';

const wykopEntryProvider = require('./wykop_provider');
const dynamo = require('./dynamo');

module.exports.fetch = () => {
  return wykopEntryProvider.getHot()
    .then(dynamo.saveBatch)
};
