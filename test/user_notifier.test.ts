global.process.env = {
    appkey: 'd99b6pFK8f',
    secretkey: 'z7nF82zdPy',
    nick: 'Mirkostatbot',
    pass: ''
};
const notifier = require('../notifier/user_notifier');

test('test', () => {
    let dbEvent = {
        Records: [
            {
                eventName: 'INSERT',
                dynamodb: {
                    NewImage: {
                        author: {
                            S: "Grizwold"
                        },
                        id: {
                            N: 46638473
                        }
                    }
                }
            }
        ]
    };
    let callback = (err, ok) => {
        console.error(err);
        console.log(ok);
    };
    return notifier.notify(dbEvent, null, callback);
}, 30000);
