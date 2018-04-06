<template>
    <transition name="slide">
        <section class="user-center">
            <span class="back">
                <i class="icon-back" @click="handleBack"></i>
            </span>
            <div class="user-center-switches">
                <switches @onChangeSwitch="handleChangeSwitch"
                    :switches="switches"
                    :currentIndex="currentIndex"
                >
                </switches>
            </div>
            <div class="play-btn" ref="playBtn">
                <i class="icon-play"></i>
                <span class="text">随机播放全部</span>
            </div>
            <div class="user-center-list">
                <scroll 
                    ref="favoriteList" 
                    class="list-scroll" 
                    v-if="currentIndex===0" 
                    :data="user.favoriteList"
                >
                    <div class="list-inner">
                        <!-- <song-list 
                            :songs="user.favoriteList" 
                            @select="selectSong">
                        </song-list> -->
                    </div>
                </scroll>
                <scroll ref="playList" class="list-scroll" v-if="currentIndex===1" :data="playHistory">
                <div class="list-inner">
                    <!-- <song-list :songs="playHistory" @select="selectSong"></song-list> -->
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
    import { mapState, mapActions } from 'vuex'
    import { playListBottom } from 'mixins/playList'

    export default {
        data() {
            return {
                currentIndex: 0,
                switches: [
                    { name: '我喜欢的' },
                    { name: '最近听的' }
                ]
            }
        },
        methods: {
            handleBack() {
                this.$router.back()
            },
            handleChangeSwitch(index) {

            }
        },
        computed: {
            noResult() {
                const { favoriteList, playHistory } = this.user
                if (this.currentIndex === 0) {
                    return !favoriteList.length
                } else {
                    return !playHistory.length
                }
            },
            noResultDesc() {
                if (this.currentIndex === 0) {
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