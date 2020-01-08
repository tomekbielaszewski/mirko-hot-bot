import Wykop from "wykop-v2";
import {ILoginData} from "wykop-v2/dist/models";

const wykop = new Wykop({
    errorTelemetry: false
});

interface WykopAPI {
    postComment: (body: string, entryId: number) => Promise<any>
}

function postComment(body: string, entryId: number): Promise<any> {
    console.log(`Posting comment for entry id: ${entryId} with body "${body}"`);
    return wykop.login(<ILoginData>{
        login: process.env.nick,
        password: process.env.pass
    }).then(() => wykop.request(['Entries', 'CommentAdd'], {
            // api: [entryId],
            api: [46638473],
            post: {
                body: body
            }
        }));
}

export const WykopPoster: WykopAPI = {postComment: postComment};
