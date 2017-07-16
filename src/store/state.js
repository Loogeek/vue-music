import { playMode } from 'api/config';

const state = {
    singerList: [],
    singerDetail: {
        list: []
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
    }
};

export default state;