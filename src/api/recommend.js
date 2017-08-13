import axios from 'axios'
import jsonp from 'common/js/jsonp'
import { commoneParams } from './config'

export function fetchSliderList() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const opts = {
        ...commoneParams,
        ...{
            platform: 'h5',
            notice: 0,
            needNewCode: 1
        }
    }

    return jsonp(url, opts)
}

export function fetchRecommendList() {
    const url = '/api/getDiscList'

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
    }

    return axios
        .get(url, {
            params: opts
        })
        .then(resp => {
            return Promise.resolve(resp.data)
        })
}

export function fetchRecommendDetail(disstid) {
    const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

    const opts = { 
        ...commoneParams, 
        ...{
        disstid,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        g_tk: 67232076
      }
    }
    
    return jsonp(url, opts)
}
