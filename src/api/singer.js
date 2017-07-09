import jsonp from 'common/js/jsonp';
import { commoneParams } from './config';

export function fetchSingerListReq() {
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

export function fetchSingerDetailReq(singerId) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
    const opts = {
        ...commoneParams, 
        ...{
            hostUin: 0,
            needNewCode: 0,
            platform: 'yqq',
            order: 'listen',
            begin: 0,
            num: 80,
            songstatus: 1,
            singermid: singerId
        }
    };

    return jsonp(url, opts);
}