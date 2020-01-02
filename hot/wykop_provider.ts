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

const getHot24 = (page) => {
    return getHotByPeriod(page, 24);
};

export const getHot = () => {
    return Promise.all(_.range(1, 11)
        .map(getHot24))
        .then(res => _.flatMap(res)
            .map(page => page["data"]))
        .then(pages => _.flatMap(pages))
        .then(res => {
            console.log(JSON.stringify(res));
            return res;
        });
};
