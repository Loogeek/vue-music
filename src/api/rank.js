import jsonp from 'common/js/jsonp'
import { commoneParams } from './config'

export function fetchRankListReq() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
    const opts = {
        ...commoneParams,
        ...{
            needNewCode: 1,
            platform: 'h5'
        }
    }

    return jsonp(url, opts)
}

// export function fetchSingerDetailReq(singerId) {
//     const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
//     const opts = {
//         ...commoneParams,
//         ...{
//             hostUin: 0,
//             needNewCode: 0,
//             platform: 'yqq',
//             order: 'listen',
//             begin: 0,
//             num: 80,
//             songstatus: 1,
//             singermid: singerId
//         }
//     }

//     return jsonp(url, opts)
// }
