<template>
    <transition name="slide">
        <music-list :musics="recommendDetail"></music-list>
    </transition>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    import MusicList from 'pages/music-list'

    export default {
        mounted() {
            const recommendId = this.$route.params.id
            
            if (this.recommendDetail.id !== recommendId) {
                this.resetRecommendDetail()
                this.fetchRecommendDetail(recommendId)
            } else if (!recommendId) {
                this.$router.back()
            }
        },
        computed: {
            ...mapGetters([
                'recommendDetail'
            ])
        },
        methods: {
            ...mapActions([
                'fetchRecommendDetail'
            ]),
            ...mapMutations({
                resetRecommendDetail: 'RESET_RECOMMEND_DETAIL'
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
