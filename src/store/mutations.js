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
            list: [],
            name: '',
            avatar: '',
            id: ''
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
            list: [],
            name: '',
            avatar: '',
            id: ''
        }
    },
    [types.RECEIVE_RANK_LIST](state, payload) {
        state.rank = payload.rank
    },
    [types.RECEIVE_RANK_DETAIL](state, payload) {
        state.rankDetail = payload.rankDetail
    },
    [types.RESET_RANK_DETAIL](state, payload) {
        state.rankDetail = {
            list: [],
            name: '',
            avatar: '',
            id: ''
        }
    },
    [types.RECEIVE_HOT_SEARCH](state, payload) {
        state.search = {
            ...state.search,
            hotkey: payload.hotkey && payload.hotkey.slice(0, 10)
        }
    },
    [types.RECEIVE_SEARCH_QUERY](state, payload) {
        if (payload.result.song.curpage > 1) {
            state.search.result.song = {
                ...payload.result.song,
                list: state.search.result.song.list.concat(payload.result.song.list)
            }
        } else {
            state.search = {
                ...state.search,
                result: payload.result
            }
        }
    },
    [types.SET_SEARCH_HISTORY](state, payload) {
        const { history } = state.search
        const index = history.findIndex(value => value === payload)
        
        if (index !== -1) {
            history.splice(index, 1)
        }
        history.unshift(payload)
    }
}

export default mutations
