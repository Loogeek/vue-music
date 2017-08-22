import { playMode } from 'api/config'

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
        history: []
    }
}

export default state
