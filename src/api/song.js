import axios from 'axios'
import { commonParams } from './config'

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