import * as types from './mutation-types';

const mutations = {
    [types.RECEIVE_SINGER_LIST](state, singerList) {
        state.singerList = singerList;
    }
};

export default mutations;