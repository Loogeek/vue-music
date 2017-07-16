import { fetchSingerListReq, fetchSingerDetailReq } from 'api/singer';
import * as types from './mutation-types';
import { ERR_OK } from 'api/config';

export const fetchSingerList = ({ commit }) => {
    fetchSingerListReq().then(resp => {
        if (resp.code === ERR_OK) {
            commit({
                type: types.RECEIVE_SINGER_LIST,
                singerList: resp.data.list
            });
        } else {
            console.warn('fetch singer list error:', resp.message);
        }
    });
};

export const setCurrentSinger = ({ commit }, currentSinger) => {
    commit({
        type: types.SET_CURRENT_SINGER,
        currentSinger
    });
};

export const fetchSingerDetail = ({ commit }, singerId) => {
    fetchSingerDetailReq(singerId).then(resp => {
        if (resp.code === ERR_OK) {
            commit({
                type: types.RECEIVE_SINGER_DETAIL,
                singerDetail: resp.data
            });
        } else {
            console.warn('fetch singer detail error:', resp.message);
        }
    });
};

export const resetSingerDetail = ({ commit, state }) => {
    commit({
        type: types.RESET_SINGER_DETAIL,
        singerDetail: {
            list: []
        }
    });
};

export const setPlaySong = ({ commit, state }, { list, currentIndex }) => {
    commit({
        type: types.SET_PLAY_SONG,
        list,
        currentIndex
    });
};
