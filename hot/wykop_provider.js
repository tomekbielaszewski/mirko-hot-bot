'use strict';

const Wykop = require('wykop-es6-2');
const _ = require('lodash');

const wykop = new Wykop(process.env.appkey, process.env.secretkey, {output: 'clear'});

function getHot(page, period) {
  return wykop.request('Entries', 'Hot', {api: {page: page, period: period}})
}

function getHot24(page) {
  return getHot(page, 24);
}

module.exports.getHot = () => {
  let hotPagesPromises = _.range(1, 11).map(getHot24);
  let hotPageResponses = Promise.all(hotPagesPromises);
  let hotPages = _.flatMap(hotPageResponses);
  let hotEntriesPerPage = hotPages.map(e => e.items);
  let hotEntries = _.flatMap(hotEntriesPerPage);

  return hotEntries;
};
