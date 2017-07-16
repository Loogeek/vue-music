import { Singer, CreateSong } from 'common/js/singer';

const HOT_NAME = '热门';

export const singerList = state => {
    const { singerList } = state;

    if (singerList.length > 0) {
        let formatList = {};
        let hotList = {
            title: HOT_NAME,
            items: []
        };
        let ret = [];

        hotList.items = singerList.slice(0, 10).map(item => 
            new Singer(
                item.Fsinger_mid,
                item.Fsinger_name
            )
        );
        
        ret.push(hotList);

        singerList.map(item => {
            const key = item.Findex;
            if (key.match(/[a-zA-Z]/)) {
                if (formatList[key]) {
                    formatList[key].items.push(new Singer(
                        item.Fsinger_mid,
                        item.Fsinger_name
                    ));
                } else {
                    formatList[key] = {
                        title: key,
                        items: [new Singer(
                            item.Fsinger_mid,
                            item.Fsinger_name
                        )]
                    };
                }
            }
        });

        return [
            ...ret, 
            ...Object.keys(formatList).sort((a, b) => 
                formatList[a].title.charCodeAt() - formatList[b].title.charCodeAt()
            ).map(item => formatList[item])
        ];
    } else {
        return [];
    }
};

export const singerDetail = state => {
    const { singerDetail } = state;
    
    if (singerDetail.list.length > 0) {
        return {
            list: singerDetail.list && singerDetail.list.map(singer => new CreateSong(singer.musicData)),
            ...new Singer(
                singerDetail.singer_mid,
                singerDetail.singer_name
            )
        };
    } else {
        return {
            list: []
        };
    }
};

export const currentSinger = state => state.currentSinger;

export const playSong = state => {
    return {
        ...state.playSong,
        currentSong: state.playSong.playList[state.playSong.currentIndex] || {}
    };
};

