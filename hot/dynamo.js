'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region: process.env.region});
const dynamo = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const marshall = AWS.DynamoDB.Converter.marshall;
const hotEntriesTable = process.env.dynamo_table;
const batchSize = 25;
const _ = require('lodash');

module.exports.saveBatch = (entries) => {
  console.log("Starting dynamo batch save");
  return Promise.all(
    _.chunk(entries, batchSize)
      .map(toBatchRequest)
      .map(writeBatch)
  );
};

function toBatchRequest(entries) {
  let request = {
    RequestItems: {}
  };
  request.RequestItems[hotEntriesTable] = entries
    .map(marshall)
    .map(e => {
      return {
        PutRequest: {
          Item: e
        }
      };
    });
  console.log("Dynamo batch chunk:");
  console.log(JSON.stringify(request));
  return request;
}

function writeBatch(batch) {
  return new Promise((res, rej) => {
    dynamo.batchWriteItem(batch, (err, data) => {
      console.log("Dynamo response: err:{}, data:{} ", err, data);
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    });
  });
}
