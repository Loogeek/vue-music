<template>
    <section class="playList">
        <header class="playList-header">
            <i class="icon icon-sequence"></i>
            <span class="text">顺序播放</span>
            <span class="clear">
                <i class="icon-clear"></i>
            </span>
        </header>
        <scroll :data="playSong.playList"
            class="playList-content"
            ref="playListHook"
        >
            <ul>
                <li class="playList-content-item" v-for="(item, index) in playSong.playList" :key="item.songmid">
                    <i class="current"></i>
                    <span class="songname" v-html="item.songname"></span>
                    <span class="like">
                        <i></i>
                    </span>
                    <span class="delete">
                        <i class="icon-delete"></i>
                    </span>
                </li>
            </ul>
        </scroll>
    </section>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'
    import Scroll from 'components/Scroll'

    export default {
        computed: {
            ...mapGetters([
                'playSong'
            ])
        },
        components: {
            Scroll
        }
    }
</script>

<style lang="scss" scoped>
    @import './playList.scss';
</style>
