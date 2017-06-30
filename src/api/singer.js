import jsonp from 'common/js/jsonp';
import { commoneParams } from './config';

export function fetchSingerList() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
    const opts = {
        ...commoneParams,
        ...{
            channel: 'singer',
            page: 'list',
            key: 'all_all_all',
            pagesize: 100,
            pagenum: 1,
            hostUin: 0,
            needNewCode: 0,
            platform: 'yqq'
        }
    };

    return jsonp(url, opts);
}