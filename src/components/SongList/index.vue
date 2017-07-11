<template>
    <ul class="song-list">
        <li class="song-list-item" v-for="(item, index) in songList" :key="index">
            <div class="rank"></div>
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
            }
        }
    };
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

