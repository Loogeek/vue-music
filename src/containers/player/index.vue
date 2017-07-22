<template>
    <section class="music-player" v-show="playSong.playList.length > 0">
        <transition name="large-player-an"
            @enter="largeEnterAn"
            @after-enter="largeAfterEnterAn"
            @leave="largeLeaveAn"
            @after-leave="largeAfterLeaveAn"
        >
            <article class="large-player" v-show="playSong.fullScreen" >
                <header class="large-player-header">
                    <span class="back">
                        <i class="icon-back" @click="handleBack"></i>
                    </span>
                    <h2 class="songname" v-html="playSong.currentSong.songname"></h2>
                    <h3 class="singer" v-html="playSong.currentSong.singer"></h3>
                </header>
                <div class="large-player-body">
                    <div class="large-player-body-left" ref="largeCd">
                        <img :src="playSong.currentSong.image">
                    </div>
                    <div class="large-player-body-right"></div>
                </div>
                <footer class="large-player-footer">
                    <nav class="operators">
                        <span class="operators-icon i-left">
                            <i class="icon-loop"></i>
                        </span>
                        <span class="operators-icon i-left">
                            <i class="icon-prev"></i>
                        </span>
                        <span class="operators-icon i-center">
                            <i class="icon-play"></i>
                        </span>
                        <span class="operators-icon i-right">
                            <i class="icon-next"></i>
                        </span>
                        <span class="operators-icon i-right">
                            <i class="icon-not-favorite"></i>
                        </span>
                    </nav>
                </footer>
                <div class="large-player-bgimg">
                    <img :src="playSong.currentSong.image">
                </div>
            </article>
        </transition>
        <transition name="mini-player-an">
            <article class="mini-player" 
                v-show="!playSong.fullScreen"
                @click="handleShow"
            >
                <div class="mini-player-img">
                    <img :src="playSong.currentSong.image" ref="miniCd">
                </div>
                <div class="mini-player-content">
                    <h3 class="songname" v-html="playSong.currentSong.songname"></h3>
                    <p class="singer" v-html="playSong.currentSong.singer"></p>
                </div>
                <div class="mini-player-control">
                    <i class="icon-mini"></i>
                </div>
                <div class="mini-player-control">
                    <i class="icon-playlist"></i>
                </div>
            </article>
        </transition>
    </section>
</template>

<script>
    import createAnimation from 'create-keyframe-animation';
    import { mapGetters, mapMutations } from 'vuex';
    import { prefixStyle } from 'common/js/dom';

    const prefixTransform = prefixStyle('transform');

    export default {
        computed: {
            ...mapGetters([
                'playSong'
            ])
        },
        methods: {
            largeEnterAn(el, done) {
                const { x, y, scale } = this._getPosAndScale();

                const animation = {
                    '0%': {
                        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
                    },
                    '50%': {
                        transform: `translate3d(0, 0, 0) scale(1.1)`
                    },
                    '100%': {
                        transform: `translate3d(0, 0, 0) scale(1)`
                    }
                };
                this._createAnimation(animation, done);
            },
            largeAfterEnterAn(el) {
                createAnimation.unregisterAnimation('move');
                this.$refs.largeCd.style.animation = '';
            },
            largeLeaveAn(el, done) {
                const { x, y, scale } = this._getPosAndScale();

                const animation = {
                    '0%': {
                        transform: `translate3d(0, 0, 0) scale(1)`
                    },
                    '100%': {
                        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
                    }
                };

                this._createAnimation(animation, done);
            },
            largeAfterLeaveAn() {
                const largeCdStyle = this.$refs.largeCd.style;
                largeCdStyle.animation = '';
                largeCdStyle[prefixTransform] = '';
            },
            handleBack() {
                this.setFullScreen(false);
            },
            handleShow() {
                this.setFullScreen(true);
            },
            _createAnimation(animation, done) {
                createAnimation.registerAnimation({
                    name: 'move',
                    animation,
                    presets: {
                        duration: 400,
                        easing: 'linear'
                    }
                });

                createAnimation.runAnimation(this.$refs.largeCd, 'move', done);
            },
            _getPosAndScale() {
                const SINGER_NAME_HEIGHT = 40;          // 顶部歌曲栏高度
                const SINGER_NAME_MAR_BOTTOM = 25;      // 歌曲栏下边距
                const MINI_CD_WIDTH = 40;
                const MINI_CD_PADDING_LEFT = 20;
                const MINI_CD_PADDING_TOP = 10;
                const LARGE_CD_WIDTH = window.innerWidth * 0.8;

                const x = -(window.innerWidth / 2 - MINI_CD_WIDTH / 2 - MINI_CD_PADDING_LEFT);
                const y = window.innerHeight - LARGE_CD_WIDTH / 2 - SINGER_NAME_HEIGHT - SINGER_NAME_MAR_BOTTOM - MINI_CD_WIDTH / 2 - MINI_CD_PADDING_TOP;
                const scale = MINI_CD_WIDTH / LARGE_CD_WIDTH;

                return { x, y, scale };
            },
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN'
            })
        }
    };
</script>

<style lang="scss" scoped>
@import './style';
</style>

