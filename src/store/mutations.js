import * as types from './mutation-types';

const mutations = {
    [types.RECEIVE_SINGER_LIST](state, payload) {
        state.singerList = payload.singerList;
    },
    [types.RECEIVE_SINGER_DETAIL](state, payload) {
        state.singerDetail = payload.singerDetail;
    },
    [types.RESET_SINGER_DETAIL](state, payload) {
        state.singerDetail = {
            list: []
        };
    },
    [types.SET_CURRENT_SINGER](state, currentSinger) {
        state.currentSinger = currentSinger;
    },
    [types.SET_PLAY_SONG](state, payload) {
        state.playSong = {
            playing: true,
            fullScreen: true,
            sequenceList: payload.list,
            playList: payload.list,
            currentIndex: payload.currentIndex
        };
    },
    [types.SET_FULL_SCREEN](state, fullScreen) {
        state.playSong.fullScreen = fullScreen;
    }
};

export default mutations;
