<template>
    <section class="music-player" v-show="playSong.playList.length > 0">
        <transition name="larger-player-an">
            <article class="larger-player" v-show="playSong.fullScreen">
                <header class="larger-player-header">
                    <span class="back">
                        <i class="icon-back" @click="handleBack"></i>
                    </span>
                    <h2 class="songname" v-html="playSong.currentSong.songname"></h2>
                    <h3 class="singer" v-html="playSong.currentSong.singer"></h3>
                </header>
                <div class="larger-player-body">
                    <div class="larger-player-body-left">
                        <img :src="playSong.currentSong.image">
                    </div>
                    <div class="larger-player-body-right"></div>
                </div>
                <footer class="larger-player-footer">
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
                <div class="larger-player-bgimg">
                    <img :src="playSong.currentSong.image" alt="">
                </div>
            </article>
        </transition>
        <transition name="mini-player-an">
            <article class="mini-player" 
                v-show="!playSong.fullScreen"
                @click="handleShow"
            >
                <div class="mini-player-img">
                    <img :src="playSong.currentSong.image">
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
import { mapGetters, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'playSong'
        ])
    },
    methods: {
        handleBack() {
            this.setFullScreen(false);
        },
        handleShow() {
            this.setFullScreen(true);
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

