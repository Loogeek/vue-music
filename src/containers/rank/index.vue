<template>
    <section class="rank">
        <scroll :data="rank">
            <ul class="rank-list">
                <li class="rank-list-item" v-for="(rankItem, index) in rank" :key="index">
                    <div class="list-img">
                        <img :src="rankItem.picUrl">
                    </div>
                    <ul class="song-list">
                        <li class="song-list-item" v-for="(item, index) in rankItem.songList" :key="index">
                            <span>{{ index + 1 }}</span>
                            <span>{{ item.singername }}-{{ item.songname }}</span>
                        </li>
                    </ul>    
                </li>
            </ul>
        </scroll>
    </section>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import Scroll from 'components/Scroll'

    export default {
        mounted() {
            this.fetchRankList()
        },
        computed: {
            ...mapState([
                'rank'
            ])
        },
        methods: {
            ...mapActions([
                'fetchRankList'
            ])
        },
        components: {
            Scroll
        }
    }
</script>

<style lang="scss" scoped>
    @import './style';
</style>

