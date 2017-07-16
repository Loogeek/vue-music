<template>
    <section class="music-player" v-if="playSong.playList.length > 0">
        <article class="larger" v-show="playSong.fullScreen">
            <header class="larger-header">
                <span class="back">
                    <i class="icon-back"></i>
                </span>
                <h2 class="title" v-html="playSong.currentSong.songname"></h2>
                <h3 class="subtitle" v-html="playSong.currentSong.singer"></h3>
            </header>
            <div class="larger-body">
                <div class="larger-body-left">
                    <img :src="playSong.currentSong.image">
                </div>
                <div class="larger-body-right"></div>
            </div>
            <div class="larger-bgimg">
                 <img :src="playSong.currentSong.image" alt=""> 
            </div>
        </article>
        <article class="mini" v-show="!playSong.fullScreen"></article>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'playSong'
        ])
    }
};
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";
@import "~common/scss/mixin";

.music-player {
    .larger {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
        background-color: $color-background;

        &-header {
            position: relative;
            margin-bottom: 2.5rem;

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
                    transform: rotate(-90deg);
                }
            }

            .title {
                width: 70%;
                margin: 0 auto;
                @extend %no-wrap;
                z-index: 50;
                text-align: center;
                line-height: 4rem;
                font-size: $font-size-large;
                color: $color-text;
            }

            .subtitle {
                line-height: 2rem;
                text-align: center;
                font-size: $font-size-medium;
                color: $color-text;
            }
        }

        &-body {

            &-left {
                width: 80%;
                margin: 0 auto;

                > img {
                    border-radius: 50%;
                }
            }
        }

        &-bgimg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: .6;
            filter: blur(2rem);

            > img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>

