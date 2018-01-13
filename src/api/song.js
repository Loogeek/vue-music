import axios from 'axios'
import { commonParams, params } from './config'
import jsonp from 'common/js/jsonp'
import { getUid } from 'common/js/uid'

export function fetchSongLyricReq(mid) {
    const url = '/api/lyric'
    const opts = {
        ...commonParams,
        ...{
            songmid: mid,
            platform: 'yqq',
            hostUin: 0,
            needNewCode: 0,
            categoryId: 10000000,
            pcachetime: +new Date(),
            format: 'json'
        }
    }

    return axios.get(url, {
        params: opts
    }).then(resp => {
        return Promise.resolve(resp.data)
    })
}

export function fetchVKey(songmid, filename) {
    const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  
    const opts = {
        ...commonParams, 
        ...{
            cid: 205361747,
            format: 'json',
            platform: 'yqq',
            hostUin: 0,
            needNewCode: 0,
            uin: 0,
            songmid,
            filename,
            guid: getUid()
        }
    }

    return jsonp(url, opts, Object.assign({}, params, {
        param: 'callback'
    }))
  }