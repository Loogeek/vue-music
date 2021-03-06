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
                    @click.stop="handleSetPlaySong(index, item)"
                    ref="playListItem"
                >
                    <i :class="['current-icon', {'icon-play': currentSong(item)}]"></i>
                    <span :class="['songname', {'current-song': currentSong(item)}]" v-html="item.songname"></span>
                    <span class="like"
                        @click.stop="handleToggleSong(item)"
                    >
                        <i :class="getFavoriteIcon(item)"></i>
                    </span>
                    <span class="delete" @click.stop="handleDelPlaySong(item, index)">
                        <i class="icon-delete"></i>
                    </span>
                </li>
            </ul>
        </scroll>
        <!-- <div class="playList-operate">
            <div class="add" @click.stop="handleAddSong">
                <i class="icon-add"></i>
                <span class="text">添加歌曲到队列</span>
            </div>
        </div> -->
        <Modal ref="modal" 
            contentText="是否清空播放列表"
            @onSelectConfirm="handleSelectConfirm"
            @onSelectCancel="handleSelectCancel"
        >
        </Modal>
    </section>
</template>

<script>
    import { mapState, mapGetters, mapMutations } from 'vuex'
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
            favoriteSongIcon() {
                return this.isFavoriteSong() > -1 ? 'icon-favorite' : 'icon-not-favorite'
            },
            ...mapState([
                'user'
            ]),
            ...mapGetters([
                'playSong'
            ])
        },
        methods: {
            currentSong(song) {
                return song.id === this.playSong.currentSong.id
            },
            getFavoriteIcon(song) {
                return this.isFavoriteSong(song) > -1 ? 'icon-favorite' : 'icon-not-favorite'
            },
            handleSetPlaySong(index, song) {
                this.setPlaySong({
                    fullScreen: false,
                    currentIndex: index 
                })
                this.setPlayHistory({
                    playSong: song
                })
                this._scrollToSong(index)
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
            handleAddSong() {
                this.$refs.recentPlayHook.show()
            },
            handleToggleSong(item) {
                const songIndex = this.isFavoriteSong(item)

                if (songIndex === -1) {
                    this.addFavoriteSong({
                        targetSong: item
                    })
                } else {
                    this.delFavoriteSong({
                        songIndex
                    })
                }
            },
            isFavoriteSong(item) {
                const songIndex = this.user.favoriteList.findIndex(song => song && song.id === item.id)

                return songIndex
            },
            _scrollToSong(index) {
                const currentEl = this.$refs.playListItem[index]
                this.$refs.playListHook.scrollToElement(currentEl, 500)
            },
            ...mapMutations({
                setPlaySong: 'SET_PLAY_SONG',
                delPlaySong: 'DEL_PLAY_SONG',
                delPlaySongList: 'DEL_PLAY_SONG_LIST',
                addFavoriteSong: 'ADD_FAVORITE_SONG',
                delFavoriteSong: 'DEL_FAVORITE_SONG',
                setPlayHistory: 'SET_PLAY_HISTORY'
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
