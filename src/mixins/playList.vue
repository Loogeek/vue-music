<template>
  
</template>

<script>
    import { mapGetters } from 'vuex'

    export const playListBottom = {
        computed: {
            ...mapGetters([
                'playSong'
            ])
        },
        mounted() {
            this.handlePlayListBottom(this.playSong.playList)
        },
        activated() {
            this.handlePlayListBottom(this.playSong.playList)
        },
        methods: {
            handlePlayListBottom(playList) {
                const listWrap = this.$refs.listWrap
                const scrollHook = this.$refs.scrollHook
                const bottom = playList.length > 0 ? '60px' : '0px'

                if (listWrap) {
                    listWrap.style.bottom = bottom
                    scrollHook.refresh()
                }
            }
        },
        watch: {
            playSong(newValue) {
                this.handlePlayListBottom(newValue.playList)
            }
        }
    }
</script>

<style>
</style>