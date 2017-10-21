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
                <li class="playList-content-item" 
                    v-for="(item, index) in playSong.playList" 
                    :key="item.songmid"
                    @click="handleSetPlaySong(index)"
                    ref="playListItem"
                >
                    <i :class="['current-icon', {'icon-play': currentSong(item)}]"></i>
                    <span :class="['songname', {'current-song': currentSong(item)}]" v-html="item.songname"></span>
                    <span class="like">
                        <i :class="getFavoriteIcon(item)"></i>
                    </span>
                    <span class="delete">
                        <i class="icon-delete"></i>
                    </span>
                </li>
            </ul>
        </scroll>
        <div class="playList-operate">
            <div class="add">
                <i class="icon-add"></i>
                <span class="text">添加歌曲到队列</span>
            </div>
        </div>
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
        methods: {
            currentSong(song) {
                return song.id === this.playSong.currentSong.id
            },
            getFavoriteIcon(song) {
                // if (song.id === this.playSong.currentSong.id) {
                //     return 
                // }
                return 'icon-not-favorite'
            },
            handleSetPlaySong(index) {
                this.setPlaySong({
                    currentIndex: index 
                })
                const el = this.$refs.playListItem[index]
                this.$refs.playListHook.scrollToElement(el, 500)
            },
            ...mapMutations({
                setPlaySong: 'SET_PLAY_SONG'
            })
        },
        components: {
            Scroll
        }
    }
</script>

<style lang="scss" scoped>
    @import './playList.scss';
</style>
