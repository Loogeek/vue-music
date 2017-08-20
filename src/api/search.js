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

// export function fetchRankDetailReq(topid) {
//     const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  
//     const opts = {
//         ...commonParams, 
//         ...{
//             topid,
//             needNewCode: 1,
//             uin: 0,
//             tpl: 3,
//             page: 'detail',
//             type: 'top',
//             platform: 'h5'
//         }
//     }
  
//     return jsonp(url, opts)
// }