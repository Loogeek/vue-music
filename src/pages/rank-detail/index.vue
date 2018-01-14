<template>
    <transition name="slide">
        <music-list :musics="rankDetail" :showRank="true"></music-list>
    </transition>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    import MusicList from 'pages/music-list'

    export default {
        mounted() {
            const { id } = this.$route.params
            if (this.rankDetail.id !== id) {
                this.resetRankDetail()
                this.fetchRankDetail(id)
            } else if (!id) {
                this.$router.back()
            }
        },
        computed: {
            ...mapGetters([
                'rankDetail'
            ])
        },
        methods: {
            ...mapActions([
                'fetchRankDetail'
            ]),
            ...mapMutations({
                resetRankDetail: 'RESET_RANK_DETAIL'
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

