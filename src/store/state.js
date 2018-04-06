import { playMode } from 'api/config'
import store from 'common/js/store'

const SEARCH_STORE_NAME = '__SEARCH_HISTORY__'
const PLAY_HISTORY = '__PLAY_HISTORY__'
const FAVORITE_LIST = '__FAVORITE_LIST__'

const state = {
    singerList: [],
    singerDetail: {
        list: [],
        name: '',
        avatar: '',
        id: ''
    },
    currentSinger: {},
    playSong: {
        playing: false,
        fullScreen: false,
        sequenceList: [],
        playList: [],
        mode: playMode.sequence,
        currentIndex: 0,
        currentSong: {},
        lyric: ''
    },
    recommendDetail: {
        list: [],
        name: '',
        avatar: '',
        id: ''
    },
    rank: [],
    rankDetail: {
        list: [],
        name: '',
        avatar: '',
        id: ''
    },
    search: {
        hotkey: [],
        result: {},
        history: store.get(SEARCH_STORE_NAME) || []
    },
    user: {
        playHistory: store.get(PLAY_HISTORY) || [],
        favoriteList: store.get(FAVORITE_LIST) || []
    }
}

export default state
