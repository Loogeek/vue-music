import { fetchSingerList } from 'api/singer';
import * as types from './mutation-types';
import { ERR_OK } from 'api/config';

const actions = {
    fetchSingerList({ commit }) {
        fetchSingerList().then(resp => {
            if (resp.code === ERR_OK) {
                commit({
                    type: types.RECEIVE_SINGER_LIST, 
                    singerList: resp.data.list
                });
            } else {
                console.warn('fetch singer data error: ', resp.err);
            }
        });
    }
};

export default actions;