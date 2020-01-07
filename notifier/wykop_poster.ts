import Wykop from "wykop-v2";

const wykop = new Wykop({
    appkey: process.env.appkey_poster,
    secret: process.env.secretkey_poster,
    errorTelemetry: false
});

interface WykopAPI {
    postComment: (body: string, entryId: number) => void
}

function postComment(body: string, entryId: number) {
    wykop.login(<string>process.env.userkey_poster)
        .then(() => wykop.request(['Entries', 'CommentAdd'], {
            api: [entryId],
            post: {
                body: body
            }
        }));
}

export const WykopPoster: WykopAPI = {postComment: postComment};
