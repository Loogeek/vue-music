import * as types from './mutation-types'
import store from 'common/js/store'

const SEARCH_STORE_NAME = '__SEARCH_HISTORY__'
const PLAY_HISTORY = '__PLAY_HISTORY__'
const FAVORITE_LIST = '__FAVORITE_LIST__'

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
            ...state.playSong,
            playing: true,
            fullScreen: payload.fullScreen,
            sequenceList: payload.list || state.playSong.sequenceList,
            playList: payload.list || state.playSong.playList,
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
    [types.SET_PLAY_MODE](state, playMode) {
        state.playSong.mode = playMode
    },
    [types.SET_PLAY_LIST](state, playList) {
        state.playSong.playList = playList
    }, 
    [types.SET_PLAY_HISTORY](state, payload = {}) {
        const { playSong } = payload
        let playHistory = store.get(PLAY_HISTORY) || []

        const songIndex = playHistory.findIndex(song => song.id === playSong.id)
        if (songIndex > -1) {
            playHistory.splice(songIndex, 1)
            playHistory.unshift(playSong)
        } else {
            playHistory.unshift(playSong)
        }
        state.user.playHistory = playHistory

        store.set(PLAY_HISTORY, playHistory)
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
                list: state.search.result.song.list.concat(
                    payload.result.song.list
                )
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
        store.set(SEARCH_STORE_NAME, history.slice(0, 15))
    },
    [types.DELE_SEARCH_HISTORY](state, payload) {
        const { history } = state.search
        
        history.splice(payload, 1)
        store.set(SEARCH_STORE_NAME, history)
    },
    [types.DELE_SEARCH_HISTORY_LIST](state, payload) {
        state.search.history = []
        store.clear()
    },
    [types.SET_SONG_LYRIC](state, lyric) {
        state.playSong = {
            ...state.playSong,
            lyric: lyric
        }
    },
    [types.DEL_PLAY_SONG](state, delIndex) {
        let { currentIndex, playList } = state.playSong
        const newPlayList = playList.slice()
        newPlayList.splice(delIndex, 1)

        if (currentIndex > delIndex || currentIndex > newPlayList.length) {
           currentIndex--
        }
        
        state.playSong = {
            ...state.playSong,
            playing: newPlayList.length > 0,
            playList: newPlayList,
            sequenceList: newPlayList,
            currentIndex
        }
    },
    [types.DEL_PLAY_SONG_LIST](state) {
        state.playSong = {
            playing: false,
            fullScreen: false,
            sequenceList: [],
            playList: [],
            currentIndex: 0,
            currentSong: {},
            lyric: ''
        }
    },
    [types.ADD_FAVORITE_SONG](state, payload) {
        const { favoriteList } = state.user
        const newFavoriteList = favoriteList.slice()
        newFavoriteList.unshift(payload.targetSong)

        state.user = {
            ...state.user,
            favoriteList: newFavoriteList
        }
        store.set(FAVORITE_LIST, newFavoriteList)
    },
    [types.DEL_FAVORITE_SONG](state, payload) {
        const { favoriteList } = state.user
        const newFavoriteList = favoriteList.slice()
        newFavoriteList.splice(payload.songIndex, 1)

        state.user = {
            ...state.user,
            favoriteList: newFavoriteList
        }
        store.set(FAVORITE_LIST, newFavoriteList)
    }
}

export default mutations
