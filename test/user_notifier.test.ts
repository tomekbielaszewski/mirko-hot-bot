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
                            M: {
                                avatar: {
                                    S: "link"
                                },
                                login: {
                                    S: "Grizwold"
                                }
                            }
                        },
                        id: {
                            N: 46638473
                        }
                    }
                }
            },
            {
                eventName: 'UPDATE',
                dynamodb: {
                    NewImage: {
                        author: {
                            M: {
                                avatar: {
                                    S: "link"
                                },
                                login: {
                                    S: "you should not see this"
                                }
                            }
                        },
                        id: {
                            N: 46638473
                        }
                    }
                }
            },
            {
                eventName: 'INSERT',
                dynamodb: {
                    NewImage: {
                        author: {
                            M: {
                                avatar: {
                                    S: "link"
                                },
                                login: {
                                    S: "another author"
                                }
                            }
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
