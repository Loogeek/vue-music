import * as types from './mutation-types';

const mutations = {
    [types.RECEIVE_SINGER_LIST](state, payload) {
        state.singerList = payload.singerList;
    },
    [types.RECEIVE_SINGER_DETAIL](state, payload) {
        state.singerDetail = payload.singerDetail;
    },
    [types.RESET_SINGER_DETAIL](state, payload) {
        state.singerDetail = payload.singerDetail;
    },
    [types.SET_CURRENT_SINGER](state, payload) {
        state.currentSinger = payload.currentSinger;
    },
    [types.SET_PLAY_SONG](state, payload) {
        state.playSong = {
            playing: true,
            fullScreen: true,
            sequenceList: payload.list,
            playList: payload.list,
            currentIndex: payload.currentIndex
        };
    }
};

export default mutations;
