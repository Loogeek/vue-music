<template>
    <transition name="slide">
        <section class="singer-detail">
            <header class="singer-detail-header">
                <span class="back">
                    <i class="icon-back" @click="handleBack"></i>
                </span>
                <h2 class="title" v-html="singerDetail.name"></h2>
            </header>
            <div class="singer-detail-image" :style="bgStyle" ref="singerBg">
                <div class="filter"></div>
                <div class="play-btn" v-if="singerDetail.list.length > 0" ref="playBtn">
                    <i class="icon-play"></i>
                    <span class="play-btn-text">随机播放全部</span>
                </div>
            </div>
            <div class="singer-detail-layer" ref="layerHook"></div>
            <div class="singer-detail-list" ref="listWrap">
                <scroll ref="scrollHook" @onScroll="handleScroll" :data="singerDetail.list" :listenScroll="true" :probeType="3">
                    <song-list :songList="singerDetail.list" @onPlaySong="handlePlaySong">
                    </song-list>
                </scroll>
                <Loading v-if="singerDetail.list.length === 0"></Loading>
            </div>
        </section>
    </transition>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import Scroll from 'components/Scroll';
    import SongList from 'components/SongList';
    import Loading from 'components/Loading';
    import { prefixStyle } from 'common/js/dom';

    const TOP_TITLE_HEIGHT = 40;

    const prefixTransform = prefixStyle('transform');
    const prefixBackdrop = prefixStyle('backdrop-filter');

    export default {
        data() {
            return {
                scrollY: 0
            };
        },
        mounted() {
            const singerId = this.$route.params.id;

            if (this.singerDetail.id !== singerId) {
                this.resetSingerDetail();
                this.fetchSingerDetail(singerId);
            } else if (!singerId) {
                this.$router.back();
            }

            this.bgHeight = window.innerWidth * 0.7;
            this.$refs.listWrap.style.top = `${this.bgHeight}px`;
            this.maxScrollY = this.bgHeight - TOP_TITLE_HEIGHT;
        },
        computed: {
            bgStyle() {
                return `background-image: url(${this.currentSinger.avatar || this.singerDetail.avatar})`;
            },
            ...mapGetters([
                'singerDetail',
                'currentSinger'
            ])
        },
        methods: {
            handleBack() {
                this.$router.back();
            },
            handleScroll(pos) {
                this.scrollY = pos.y;
            },
            handlePlaySong(item, index) {
                this.setPlaySong({
                    list: this.singerDetail.list,
                    currentIndex: index
                });
            },
            ...mapActions([
                'fetchSingerDetail',
                'resetSingerDetail',
                'setPlaySong'
            ])
        },
        watch: {
            scrollY(newVal) {
                const singerBgStyle = this.$refs.singerBg.style;
                const playBtnStyle = this.$refs.playBtn.style;
                const precent = Math.abs(newVal / this.bgHeight);
                let zIndex = 0;

                if (newVal > 0) {
                    zIndex = 10;
                    const scaleChange = 1 + precent;
                    singerBgStyle[prefixTransform] = `scale(${scaleChange})`;
                } else {
                    if (-newVal < this.maxScrollY) {
                        const blur = 1 + Math.min(20, precent * 20);
                        this.$refs.layerHook.style[prefixTransform] = `translateY(${newVal}px)`;
                        singerBgStyle[prefixBackdrop] = `blur${blur}`;
                        // 之所以改变背景图和标题同高是因为标题没有背景色无法遮住滚动的歌曲
                        // 所以得通过改变背景图来达到效果
                        singerBgStyle.paddingTop = `${this.bgHeight}px`;
                        singerBgStyle.height = 0;
                        playBtnStyle.display = '';
                    } else {
                        singerBgStyle.paddingTop = 0;
                        singerBgStyle.height = `${TOP_TITLE_HEIGHT}px`;
                        playBtnStyle.display = 'none';
                        zIndex = 10;
                    }
                }

                this.$refs.singerBg.style.zIndex = zIndex;
            }
        },
        components: {
            Scroll,
            SongList,
            Loading
        }
    };
</script>

<style lang="scss" scoped>
    @import "~common/scss/variable";
    @import "~common/scss/mixin";

    .slide-enter-active,
    .slide-leave-active {
        transition: all .3s linear;
    }

    .slide-enter,
    .slide-leave-to {
        transform: translateX(100%);
    }

    .singer-detail {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
        background-color: $color-background;

        &-header {
            display: flex;

            .back {
                position: absolute;
                top: 0;
                left: .6rem;
                z-index: 50;

                .icon-back {
                    display: block;
                    padding: 1rem;
                    font-size: $font-size-large-x;
                    color: $color-theme;
                }
            }

            .title {
                position: absolute;
                top: 0;
                left: 10%;
                width: 80%;
                @extend %no-wrap;
                z-index: 50;
                text-align: center;
                line-height: 4rem;
                font-size: $font-size-large;
                color: $color-text;
            }
        }

        &-image {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 70%;
            background-size: cover;
            transform-origin: top;

            .filter {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(7, 17, 27, 0.4);
            }

            .play-btn {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: 2rem;
                padding: .7rem 2rem;
                text-align: center;
                border: .5px solid $color-theme;
                color: $color-theme;
                border-radius: 3rem;
                font-size: 0;

                .icon-play {
                    vertical-align: middle;
                    margin-right: .6rem;
                    font-size: $font-size-medium-x;
                }

                &-text {
                    vertical-align: middle;
                    font-size: $font-size-small;
                }
            }
        }

        &-layer {
            position: relative;
            height: 100%;
            background-color: $color-background;
        }

        &-list {
            position: fixed;
            top: 0;
            bottom: 0;
            width: 100%;

            .m-scroll {
                overflow: initial;
            }

            .song-list {
                padding: 2rem 3rem;
            }
        }
    }
</style>
