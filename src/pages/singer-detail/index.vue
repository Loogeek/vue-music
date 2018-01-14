<template>
    <transition name="slide">
        <music-list :musics="singerDetail"></music-list>
    </transition>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    import MusicList from 'pages/music-list'

    export default {
        mounted() {
            const singerId = this.$route.params.id

            if (this.singerDetail.id !== singerId) {
                this.resetSingerDetail()
                this.fetchSingerDetail(singerId)
            } else if (!singerId) {
                this.$router.back()
            }
        },
        computed: {
            ...mapGetters([
                'singerDetail'
            ])
        },
        methods: {
            ...mapActions([
                'fetchSingerDetail'
            ]),
            ...mapMutations({
                resetSingerDetail: 'RESET_SINGER_DETAIL'
            })
        },
        components: {
            MusicList
        }
    }
</script>

<style lang="scss" scoped>
    @import './style';
</style>
