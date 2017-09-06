<template>
    <section class="rank" ref="listWrap">
        <scroll :data="rank" ref="scrollHook">
            <ul class="rank-list">
                <router-link :to="`/rank/${rankItem.id}`" class="rank-list-item" v-for="(rankItem, index) in rank" :key="index">
                    <div class="list-img">
                        <img :src="rankItem.picUrl">
                    </div>
                    <ul class="song-list">
                        <li class="song-list-item" v-for="(item, index) in rankItem.songList" :key="index">
                            <span>{{ index + 1 }}</span>
                            <span>{{ item.singername }}-{{ item.songname }}</span>
                        </li>
                    </ul>    
                </router-link>
            </ul>
        </scroll>
        <router-view></router-view>
    </section>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import Scroll from 'components/Scroll'
    import { playListBottom } from 'mixins/playList'
    
    export default {
        mixins: [playListBottom],
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

