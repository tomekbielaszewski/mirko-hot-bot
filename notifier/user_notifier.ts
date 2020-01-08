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

async function login(): Promise<any> {
    let login: string = process.env.nick || "";
    let pass: string = process.env.pass || "";
    await wykop.login(login, pass);
}

function onlyNewRecords(record: DynamoDBRecord): boolean {
    return record.eventName === "INSERT";
}

function extractEntry(record: DynamoDBRecord): WykopEntry {
    return unmarshal(record.dynamodb?.NewImage);
}

async function notifyAuthor(entry: WykopEntry): Promise<any> {
    console.log(`Notifying ${entry.author} in entry https://www.wykop.pl/wpis/${entry.id}`);
    // let body = `@${entry.author} MirkoHotBot gratuluje! Twój wpis wylądował w gorących!`;
    let body = `${entry.author} test!`;
    await wykop.postComment(body, entry.id);
}

function success(callback: Callback) {
    return () => callback(null, true);
}

function failure(callback: Callback) {
    return (e) => callback(e, null);
}

export const notify = (event: DynamoDBStreamEvent, context: Context, callback: Callback) => {
    login()
        .then(() =>
            Promise.all(event.Records
                .filter(onlyNewRecords)
                .map(extractEntry)
                .map(notifyAuthor))
        )
        .then(success(callback))
        .catch(failure(callback))
};
