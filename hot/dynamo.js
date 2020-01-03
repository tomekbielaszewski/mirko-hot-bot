'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: process.env.region});
const dynamo = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const serialize = require('./dynamo-serializer').serialize;
const hotEntriesTable = process.env.dynamo_table;
const batchSize = 25;
const _ = require('lodash');

module.exports.saveBatch = (entries) => {
  console.log(JSON.stringify(entries));
  return _.chunk(entries, batchSize)
    .map(toBatchRequest)
    .map(writeBatch);
};

function toBatchRequest(entries) {
  let request = {
    RequestItems: {}
  };
  request.RequestItems[hotEntriesTable] = entries
    .map(serialize)
    .map(e => {
      return {
        PutRequest: {
          Item: e
        }
      };
    });
  return request;
}

function writeBatch(batch) {
  return new Promise((res, rej) => {
    dynamo.batchWriteItem(batch, (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    });
  });
}
