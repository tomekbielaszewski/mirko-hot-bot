'use strict';

const wykopEntryProvider = require('./wykop_provider');
const dynamo = require('./dynamo');

module.exports.fetch = () => {
  console.log("Started fetching hot entries");
  return wykopEntryProvider.getHot()
    .then(dynamo.saveBatch)
};
