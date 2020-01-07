const AWS = require('aws-sdk');
AWS.config.update({region: process.env.region});
const unmarshal = AWS.DynamoDB.Converter.unmarshall;
import {Callback, Context, DynamoDBRecord, DynamoDBStreamEvent} from "aws-lambda";
import {WykopEntry} from './wykop_entry';
import {WykopPoster as wykop} from './wykop_poster';

function getEntry(record: DynamoDBRecord): WykopEntry | undefined {
    if (record.eventName === "INSERT") {
        return unmarshal(record.dynamodb?.NewImage);
    }
    return undefined;
}

function notifyAuthor(entry: WykopEntry) {
    if (entry) {
        wykop.postComment(`@${entry.author} MirkoHotBot gratuluje! Twój wpis wylądował w gorących!`, entry.id);
    }
}

function success(callback: Callback) {
    callback(null, true);
}

function failure(callback: Callback, e: any) {
    callback(e, null);
}

export const notify = (event: DynamoDBStreamEvent, context: Context, callback: Callback) => {
    try {
        event.Records
            .map(getEntry)
            .forEach(notifyAuthor);
        success(callback);
    } catch (e) {
        failure(callback, e)
    }
};
