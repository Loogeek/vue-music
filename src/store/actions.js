import { fetchSingerListReq, fetchSingerDetailReq } from 'api/singer'
import { fetchRecommendDetailReq } from 'api/recommend'
import * as types from './mutation-types'
import { ERR_OK } from 'api/config'

export const fetchSingerList = ({ commit }) => {
    fetchSingerListReq().then(resp => {
        if (resp.code === ERR_OK) {
            commit({
                type: types.RECEIVE_SINGER_LIST,
                singerList: resp.data.list
            })
        } else {
            console.warn('fetch singer list error:', resp.message)
        }
    })
}

export const fetchSingerDetail = ({ commit }, singerId) => {
    fetchSingerDetailReq(singerId).then(resp => {
        if (resp.code === ERR_OK) {
            commit({
                type: types.RECEIVE_SINGER_DETAIL,
                singerDetail: resp.data
            })
        } else {
            console.warn('fetch singer detail error:', resp.message)
        }
    })
}

export const fetchRecommendDetail = ({ commit }, recommendId) => {
    fetchRecommendDetailReq(recommendId).then(resp => {
        if (resp.code === ERR_OK) {
            commit({
                type: types.RECEIVE_RECOMMEND_DETAIL,
                recommendDetail: resp.cdlist
            })
        }
    })
}
