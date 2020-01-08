import Wykop from "wykop-v2";
import {ILoginData} from "wykop-v2/dist/models";

const wykop = new Wykop({
    errorTelemetry: false
});

interface WykopAPI {
    login: (login: string, password: string) => Promise<any>
    postComment: (body: string, entryId: number) => Promise<any>
}

async function login(login: string, password: string): Promise<any> {
    console.log(`Logging in as ${process.env.nick}`);
    await wykop.login(<ILoginData>{
        login: login,
        password: password
    });
    console.log(`Log in finished`);
}

async function postComment(body: string, entryId: number): Promise<any> {
    console.log(`Posting comment for entry id: ${entryId} with body "${body}"`);
    await wykop.request(['Entries', 'CommentAdd'], {
        // api: [entryId],
        api: [46638473],
        post: {
            body: body
        }
    });
}

export const WykopPoster: WykopAPI = {login, postComment};
