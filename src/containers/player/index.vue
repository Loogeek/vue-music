<template>
    <section class="music-player" v-if="playSong.playList.length > 0">
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
            <div class="larger-player-bgimg">
                <img :src="playSong.currentSong.image" alt="">
            </div>
        </article>
        <article class="mini-player" v-show="!playSong.fullScreen">
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
        ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN'
        })
    }
};
</script>

<style lang="scss" scoped>
    @import './style';
</style>

