<template>
    <ul class="song-list">
        <li class="song-list-item" v-for="(item, index) in songList" :key="index" @click="handlePlaySong(item, index)">
            <div class="rank" v-if="showRank">
                <span :class="renderRankClass(index)">{{ renderRank(index) }}</span>
            </div>
            <div class="content">
                <h4 class="content-name" v-html="item.songname"></h4>
                <p class="content-singer">{{item.singer}}·{{item.albumname}}</p>
            </div>
        </li>
    </ul>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        songList: {
            type: Array,
            default: () => []
        },
        showRank: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handlePlaySong(item, index) {
            this.$emit('onPlaySong', item, index)
        },
        renderRankClass(index) {
            if (index < 3) {
                return `icon icon${index}`
            } else {
                return 'text'
            }
        },
        renderRank(index) {
            if (index > 2) {
                return index + 1
            } 
        }        
    }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";
@import "~common/scss/mixin";

.song-list {
    &-item {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 6.4rem;
        font-size: $font-size-medium;

        .rank {
            width: 2.5rem;
            margin-right: 3rem;
            text-align: center;

            .icon {
                width: 2.5rem;
                height: 2.4rem;
                display: inline-block;
                background-size: 2.5rem 2.4rem;

                &.icon0 {
                    @include bg-image('./images/first');
                }
                &.icon1 {
                    @include bg-image('./images/second');
                }
                &.icon2 {
                    @include bg-image('./images/third');
                }
            }

            .text {
                color: $color-theme;
                font-size: $font-size-large;
            }
        }

        .content {
            flex: 1;
            line-height: 2rem;
            overflow: hidden;

            &-name {
                @extend %no-wrap;
                color: $color-text;
            }

            &-singer {
                @extend %no-wrap;
                margin-top: .4rem;
                color: $color-text-d;
            }
        }
    }
}
</style>

