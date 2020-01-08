const AWS = require('aws-sdk');
AWS.config.update({region: process.env.region});
const unmarshal = AWS.DynamoDB.Converter.unmarshall;
import {Callback, Context, DynamoDBRecord, DynamoDBStreamEvent} from "aws-lambda";
import {WykopPoster as wykop} from './wykop_poster';

export interface WykopEntry {
    id: number,
    author: string,
    page: number,
    period: number
}

function getEntry(record: DynamoDBRecord): Promise<WykopEntry> {
    return new Promise<WykopEntry>((resolve) => {
        if (record.eventName === "INSERT") {
            resolve(unmarshal(record.dynamodb?.NewImage));
        }
        return resolve();
    });
}

function notifyAuthor(entry: WykopEntry): Promise<any> {
    if (entry) {
        // let body = `@${entry.author} MirkoHotBot gratuluje! Twój wpis wylądował w gorących!`;
        let body = `${entry.author} test!`;
        return wykop.postComment(body, entry.id);
    }
    return Promise.resolve();
}

function success(callback: Callback) {
    return () => callback(null, true);
}

function failure(callback: Callback) {
    return (e) => callback(e, null);
}

export const notify = (event: DynamoDBStreamEvent, context: Context, callback: Callback) => {
    Promise.all(event.Records.map(record =>
        getEntry(record)
            .then(notifyAuthor)))
        .then(success(callback))
        .catch(failure(callback));
};
