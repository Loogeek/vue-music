import * as types from './mutation-types'

const mutations = {
    [types.RECEIVE_SINGER_LIST](state, payload) {
        state.singerList = payload.singerList
    },
    [types.RECEIVE_SINGER_DETAIL](state, payload) {
        state.singerDetail = payload.singerDetail
    },
    [types.RESET_SINGER_DETAIL](state, payload) {
        state.singerDetail = {
            list: []
        }
    },
    [types.SET_CURRENT_SINGER](state, currentSinger) {
        state.currentSinger = currentSinger
    },
    [types.SET_PLAY_SONG](state, payload) {
        state.playSong = {
            playing: true,
            fullScreen: true,
            sequenceList: payload.list,
            playList: payload.list,
            currentIndex: payload.currentIndex
        }
    },
    [types.SET_FULL_SCREEN](state, fullScreen) {
        state.playSong.fullScreen = fullScreen
    },
    [types.SET_PLAYING_STATUS](state, playingStatus) {
        state.playSong.playing = playingStatus
    },
    [types.SET_CURRENT_INDEX](state, currentIndex) {
        state.playSong.currentIndex = currentIndex
    },
    [types.RECEIVE_RECOMMEND_DETAIL](state, payload) {
        state.recommendDetail = payload.recommendDetail
    },
    [types.RESET_RECOMMEND_DETAIL](state, payload) {
        state.recommendDetail = {
            list: []
        }
    },
    [types.RECEIVE_RANK_LIST](state, payload) {
        state.rank = payload.rank
    },
    [types.RECEIVE_RANK_DETAIL](state, payload) {
        state.rankDetail = payload.rankDetail
        console.log(222, state.rankDetail)
    }
}

export default mutations
