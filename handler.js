'use strict';

const hotFetcher = require('./hot/fetcher');
const userNotifier = require('./notifier/user_notifier');

module.exports.hotFetcher = hotFetcher.fetch;
module.exports.userNotifier = userNotifier.notify;
