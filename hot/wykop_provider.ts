import Wykop from "wykop-v2";

import * as _ from "lodash";

const getHotByPeriod = (page, period) => {
    const wykop = new Wykop({
        appkey: process.env.appkey,
        secret: process.env.secretkey,
        errorTelemetry: false
    });
    return wykop.request(['Entries', 'Hot'], {
        named: {
            page: page,
            period: period
        }
    });
};

interface WykopResponse {
    response: any,
    page: number,
    period: number
}

function getHot24(page: number): Promise<WykopResponse> {
    return getHotByPeriod(page, 24)
        .then(res => {
            return {
                response: res,
                page: page,
                period: 24
            }
        });
}

export const getHot = () => {
    return Promise.all(_.range(1, 11)
        .map(getHot24))
        .then(res => _.flatMap<WykopResponse>(res)
            .map(singlePage => {
                singlePage.response = singlePage.response.data;
                return singlePage;
            }))
        .then(res => res
            .map<WykopResponse>(singleRes => singleRes.response
                .map(entry => {
                    entry.page = singleRes.page;
                    entry.period = singleRes.period;
                    return entry;
                })))
        .then(entries => _.flatMap(entries))
        .then(res => {
            console.log(JSON.stringify(res));
            return res;
        });
};
