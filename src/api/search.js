import jsonp from 'common/js/jsonp'
import { commonParams } from './config'

export function fetchHotSearchReq() {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
    const opts = {
        ...commonParams,
        ...{
            uin: 0,
            needNewCode: 1,
            platform: 'h5'
        }
    }

    return jsonp(url, opts)
}

export function fetchSearchQueryReq({query = '', page = 1, pageNum = 20, zhida = 1}) {
    const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  
    const opts = {
        ...commonParams, 
        ...{
            w: query,
            p: page,
            perpage: pageNum,
            n: pageNum,
            catZhida: zhida,
            zhidaqu: 1,
            t: 0,
            flag: 1,
            ie: 'utf-8',
            sem: 1,
            aggr: 0,
            remoteplace: 'txt.mqq.all',
            uin: 0,
            needNewCode: 1,
            platform: 'h5'
        }
    }
  
    return jsonp(url, opts)
}