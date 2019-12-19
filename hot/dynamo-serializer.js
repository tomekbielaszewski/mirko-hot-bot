'use strict';

const _ = require('lodash');

// model as described in:
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#putItem-property
module.exports.serialize = (obj) => {
  let result = {};
  _.forIn(obj, (v, k, _) => {
    result[k] = {S: v.toString()};
  });
  return result;
};

module.exports.deserialize = (obj) => {
  return _.forIn(obj, (v, k, o) => {
    o[k] = _.values(v)[0];
  });
};
