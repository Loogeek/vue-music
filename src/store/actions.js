import { fetchSingerListReq, fetchSingerDetailReq } from 'api/singer'
import { fetchRecommendDetailReq } from 'api/recommend'
import { fetchRankListReq, fetchRankDetailReq } from 'api/rank'
import { fetchHotSearchReq, fetchSearchQueryReq } from 'api/search'

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

export const fetchRankList = ({ commit }) => {
    fetchRankListReq().then(resp => {
        if (resp.code === ERR_OK) {
            commit({
                type: types.RECEIVE_RANK_LIST,
                rank: resp.data.topList
            })
        } else {
            console.warn('fetch rank error:', resp.message)
        }
    })
}

export const fetchRankDetail = ({ commit }, id) => {
    fetchRankDetailReq(id).then(resp => {
        if (resp.code === ERR_OK) {
            commit({
                type: types.RECEIVE_RANK_DETAIL,
                rankDetail: resp
            })
        } else {
            console.warn('fetch rank detail error')
        }
    })
}

// search
export const fetchHotSearch = ({ commit }) => {
    fetchHotSearchReq().then(resp => {
        if (resp.code === ERR_OK) {
            commit({
                type: types.RECEIVE_HOT_SEARCH,
                hotkey: resp.data.hotkey
            })
        } else {
            console.warn('fetch hot search error')
        }
    })
}

export const fetchSearchQuery = ({ commit }, props) => {
    fetchSearchQueryReq(props).then(resp => {
        if (resp.code === ERR_OK) {
            commit({
                type: types.RECEIVE_SEARCH_QUERY,
                result: resp.data
            })
        } else {
            console.warn('fetch search query error:', resp.message)
        }
    })
}
