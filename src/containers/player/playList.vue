<template>
    <section class="playList">
        <header class="playList-header">
            <i class="icon icon-sequence"></i>
            <span class="text">顺序播放</span>
            <span class="clear" @click.stop="handleDelPlayList">
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
                    <span class="delete" @click.stop="handleDelPlaySong(item, index)">
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
        <Modal ref="modal" 
            contentText="是否清空播放列表"
            @onSelectConfirm="handleSelectConfirm"
            @onSelectCancel="handleSelectCancel"
        >
        </Modal>
    </section>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'
    import Scroll from 'components/Scroll'
    import Modal from 'components/Modal'

    export default {
        mounted() {
            const currentEl = this.$refs.playListItem[this.playSong.currentIndex]
            this.$nextTick(() => {
                this.$refs.playListHook.scrollToElement(currentEl, 0)
            })
        },
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
                return 'icon-not-favorite'
            },
            handleSetPlaySong(index) {
                this.setPlaySong({
                    currentIndex: index 
                })
                const currentEl = this.$refs.playListItem[index]
                this.$refs.playListHook.scrollToElement(currentEl, 500)
            },
            handleDelPlayList() {
                this.$refs.modal.show()
            },
            handleSelectConfirm() {
                this.$refs.modal.hide()
                this.$emit('onDelPlaySongList')
                this.delPlaySongList()
            },
            handleDelPlaySong(item, index) {
                if (item.deleing) return
                item.deleing = true

                this.delPlaySong(index)
            },
            handleSelectCancel() {
                this.$refs.modal.hide()
            },
            ...mapMutations({
                setPlaySong: 'SET_PLAY_SONG',
                delPlaySong: 'DEL_PLAY_SONG',
                delPlaySongList: 'DEL_PLAY_SONG_LIST'
            })
        },
        components: {
            Scroll,
            Modal
        }
    }
</script>

<style lang="scss" scoped>
    @import './playList.scss';
</style>
