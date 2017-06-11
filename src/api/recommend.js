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