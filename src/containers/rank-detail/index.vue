<template>
    <transition name="slide">
        <music-list :musics="rankDetail"></music-list>
    </transition>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    import MusicList from 'containers/music-list'

    export default {
        mounted() {
            const { id } = this.$route.params
            console.log(111)
                this.fetchRankDetail(id)
            // if (this.recommendDetail.id !== recommendId) {
            //     this.fetchRecommendDetail(recommendId)
            // } else if (!recommendId) {
            //     this.$router.back()
            // }
        },
        computed: {
            ...mapGetters([
                'rankDetail'
            ])
        },
        methods: {
            ...mapActions([
                'fetchRankDetail'
            ])
            // ...mapMutations({
            //     resetRecommendDetail: 'RESET_RECOMMEND_DETAIL'
            // })
        },
        components: {
            MusicList
        }
    }
</script>

<style lang="scss" scoped>
    @import './style';
</style>

