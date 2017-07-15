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
    }
};

export default mutations;