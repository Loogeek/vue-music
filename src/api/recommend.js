import axios from 'axios';
import jsonp from 'common/js/jsonp';
import { commoneParams } from './config';

export function fetchSliderList() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    const opts = {
        ...commoneParams,
        ...{
            platform: 'h5',
            notice: 0,
            needNewCode: 1
        }
    };

    return jsonp(url, opts);
}

export function fetchRecommendList() {
    const url = '/api/getDiscList';
    
    const opts = {
        ...commoneParams,
        ...{
            platform: 'yqq',
            hostUin: 0,
            sin: 0,
            ein: 29,
            sortId: 5,
            needNewCode: 0,
            categoryId: 10000000,
            rnd: Math.random(),
            format: 'json'
        }
    };

    return axios.get(url, {
        params: opts
    }).then(resp => {
        return Promise.resolve(resp.data);
    });
};