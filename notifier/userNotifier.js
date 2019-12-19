'use strict';

function getEntry(dbEvent) {

}

function notifyAuthor() {

}

module.exports.notify = dbEvent => {
  return getEntry(dbEvent)
    .then(notifyAuthor)
};
