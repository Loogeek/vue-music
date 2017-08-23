import { playMode } from 'api/config'
import store from 'common/js/store'

const storeName = '__SEARCH_HISTORY__'

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
        currentSong: {}
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
        history: store.get(storeName) || []
    }
}

export default state
