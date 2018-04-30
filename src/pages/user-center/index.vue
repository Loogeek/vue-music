<template>
    <transition name="slide">
        <section class="user-center">
            <span class="back">
                <i class="icon-back" @click="handleBack"></i>
            </span>
            <div class="user-center-switches">
                <switches 
                    @onChangeSwitch="handleChangeSwitch"
                    :switches="switches"
                    :currentIndex="currentIndex"
                >
                </switches>
            </div>
            <div class="play-btn" ref="playBtn">
                <i class="icon-play"></i>
                <span class="text">随机播放全部</span>
            </div>
            <div class="user-center-list" v-show="!noResult" ref="listWrap">
                <scroll 
                    ref="scrollHook" 
                    class="list-scroll" 
                    v-if="currentIndex === 0" 
                    :data="user.favoriteList"
                >
                    <div class="list-inner">
                        <song-list 
                            :songList="user.favoriteList" 
                            @onPlaySong="handlePlaySong"
                        >
                        </song-list>
                    </div>
                </scroll>
                <scroll 
                    ref="scrollHook" 
                    class="list-scroll" 
                    v-if="currentIndex===1" 
                    :data="user.playHistory"
                >
                    <div class="list-inner">
                        <song-list 
                            :songList="user.playHistory" 
                            @onPlaySong="handlePlaySong"
                        >
                        </song-list>
                    </div>
                </scroll>
            </div>
            <div class="user-center-no-result" v-show="noResult">
                <no-result :title="noResultDesc"></no-result>
            </div>
        </section>
    </transition>
</template>

<script type="text/ecmascript-6">
    import Switches from 'components/Switches'
    import Scroll from 'components/Scroll'
    import SongList from 'components/SongList'
    import NoResult from 'components/NoResult'
    import { mapState, mapMutations } from 'vuex'
    import { playListBottom } from 'mixins/playList'
    
    const CURRENT_LIKE = 0 

    export default {
        data() {
            return {
                currentIndex: CURRENT_LIKE,
                switches: [
                    { name: '我喜欢的' },
                    { name: '最近听的' }
                ]
            }
        },
        mixins: [playListBottom],
        methods: {
            handleBack() {
                this.$router.back()
            },
            handlePlaySong(item, index) {
                const { favoriteList, playHistory } = this.user
                const songList = this.currentIndex === 0 ? favoriteList : playHistory
                this.setPlaySong({
                    list: songList,
                    currentIndex: index,
                    fullScreen: true
                })
                this.setPlayHistory({
                    playSong: item
                })
            },
            handleChangeSwitch(index) {
                this.currentIndex = index
            },
            ...mapMutations({
                setPlaySong: 'SET_PLAY_SONG',
                setPlayHistory: 'SET_PLAY_HISTORY'
            })
        },
        computed: {
            noResult() {
                const { favoriteList, playHistory } = this.user
                if (this.currentIndex === CURRENT_LIKE) {
                    return !favoriteList.length
                } else {
                    return !playHistory.length
                }
            },
            noResultDesc() {
                if (this.currentIndex === CURRENT_LIKE) {
                    return '暂无收藏歌曲'
                } else {
                    return '你还没有听过歌曲'
                }
            },
            ...mapState([
                'user'
            ])
        },
        components: {
            Switches,
            Scroll,
            SongList,
            NoResult
        }
    }
</script>

<style lang="scss">
    @import './index';
</style>