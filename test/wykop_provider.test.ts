global.process.env = {
  appkey: 'd99b6pFK8f',
  secretkey: 'z7nF82zdPy'
};
const wykopProvider = require('../hot/wykop_provider');

test('test', () => {
  return wykopProvider.getHot()
    .then(r => {
      console.log(r);
      return r;
    });
}, 30000);
