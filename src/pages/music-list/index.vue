<template>
    <section class="singer-detail">
        <header class="singer-detail-header">
            <span class="back">
                <i class="icon-back" @click="handleBack"></i>
            </span>
            <h2 class="title" v-html="musics.name"></h2>
        </header>
        <div class="singer-detail-image" :style="bgStyle" ref="singerBg">
            <div class="filter"></div>
            <div class="play-btn" v-if="musics.list.length > 0" ref="playBtn">
                <i class="icon-play"></i>
                <span class="play-btn-text">随机播放全部</span>
            </div>
        </div>
        <div class="singer-detail-layer" ref="layerHook"></div>
        <div class="singer-detail-list" ref="listWrap">
            <scroll ref="scrollHook" @onScroll="handleScroll" :data="musics.list" :listenScroll="true" :probeType="3">
                <song-list 
                    :songList="musics.list" 
                    @onPlaySong="handlePlaySong"
                    :showRank="showRank"
                >
                </song-list>
            </scroll>
            <Loading v-if="musics.list.length === 0"></Loading>
        </div>
    </section>
</template>

<script>
    import { mapMutations } from 'vuex'
    import Scroll from 'components/Scroll'
    import SongList from 'components/SongList'
    import Loading from 'components/Loading'
    import { prefixStyle } from 'common/js/dom'
    import { playListBottom } from 'mixins/playList'

    const TOP_TITLE_HEIGHT = 40

    const prefixTransform = prefixStyle('transform')
    const prefixBackdrop = prefixStyle('backdrop-filter')

    export default {
        mixins: [playListBottom],
        props: {
            musics: {
                type: Object,
                default: {}
            },
            showRank: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            this.bgHeight = window.innerWidth * 0.7
            this.$refs.listWrap.style.top = `${this.bgHeight}px`
            this.maxScrollY = this.bgHeight - TOP_TITLE_HEIGHT
        },
        data() {
            return {
                scrollY: 0
            }
        },
        computed: {
            bgStyle() {
                return `background-image: url(${this.musics.avatar})`
            }          
        },
        methods: {
            handleBack() {
                this.$router.back()
            },
            handleScroll(pos) {
                this.scrollY = pos.y
            },
            handlePlaySong(item, index) {
                this.setPlaySong({
                    list: this.musics.list,
                    currentIndex: index
                })
            },
            ...mapMutations({
                setPlaySong: 'SET_PLAY_SONG'
            })
        },
        components: {
            Scroll,
            SongList,
            Loading
        },
        watch: {
            scrollY(newVal) {
                const singerBgStyle = this.$refs.singerBg.style
                const playBtnStyle = this.$refs.playBtn.style
                const precent = Math.abs(newVal / this.bgHeight)
                let zIndex = 0

                if (newVal > 0) {
                    zIndex = 10
                    const scaleChange = 1 + precent
                    singerBgStyle[prefixTransform] = `scale(${scaleChange})`
                } else {
                    if (-newVal < this.maxScrollY) {
                        const blur = 1 + Math.min(20, precent * 20)
                        this.$refs.layerHook.style[prefixTransform] = `translateY(${newVal}px)`
                        singerBgStyle[prefixBackdrop] = `blur${blur}`
                        // 之所以改变背景图和标题同高是因为标题没有背景色无法遮住滚动的歌曲
                        // 所以得通过改变背景图来达到效果
                        singerBgStyle.paddingTop = `${this.bgHeight}px`
                        singerBgStyle.height = 0
                        playBtnStyle.display = ''
                    } else {
                        singerBgStyle.paddingTop = 0
                        singerBgStyle.height = `${TOP_TITLE_HEIGHT}px`
                        playBtnStyle.display = 'none'
                        zIndex = 10
                    }
                }

                this.$refs.singerBg.style.zIndex = zIndex
            }
        }     
    }
</script>

<style lang="scss" scoped>
    @import './style';
</style>
