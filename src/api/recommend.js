import axios from 'axios'
import jsonp from 'common/js/jsonp'
import { commonParams, params } from './config'

export function fetchSliderList() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const opts = {
        ...commonParams,
        ...{
            platform: 'h5',
            notice: 0,
            needNewCode: 1
        }
    }
    
    return jsonp(url, opts, params)
}

export function fetchRecommendList() {
    const url = '/api/getDiscList'

    const opts = {
        ...commonParams,
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

export function fetchRecommendDetailReq(disstid) {
    const url = '/api/fetchRecommendDetail'

    const opts = { 
        ...commonParams, 
        ...{
            disstid,
            type: 1,
            json: 1,
            utf8: 1,
            onlysong: 0,
            platform: 'yqq',
            hostUin: 0,
            needNewCode: 0,
            g_tk: 1928093487
      }
    }

    return axios.get(url, {
        params: opts
    }).then(resp => {
        return Promise.resolve(resp.data)
    })
}
