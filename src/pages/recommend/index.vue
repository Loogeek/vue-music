<template>
    <div class="recommend" ref="listWrap">
        <Scroll :data="recommendList" ref="scrollHook">
            <div>
                <slider v-if="slideList.length" :slideList="slideList"></slider>
                <section class="recommend-list" v-if="recommendList.length > 0">
                    <header class="recommend-list-header">热门歌单推荐</header>
                    <ul>
                        <router-link :to="`/recommend/${item.dissid}`" v-for="(item, index) in recommendList" class="list-item" :key="index" tag="li">
                            <div class="list-item-left">
                                <img v-lazy="item.imgurl">
                            </div>
                            <div class="list-item-right">
                                <h4 class="list-item-right-header" v-html="item.creator.name"></h4>
                                <p class="list-item-right-desc" v-html="item.dissname"></p>
                            </div>
                        </router-link>
                    </ul>
                </section>
            </div>
            <Loading v-if="recommendList.length === 0"></Loading>
        </Scroll>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Slider from 'components/Slider/index.vue'
import Loading from 'components/Loading/index.vue'
import Scroll from 'components/Scroll/index.vue'
import Component from 'vue-class-component'
import { fetchSliderList, fetchRecommendList } from '../../api/recommend'
import { ERR_OK } from '../../api/config.js'
import playListBottom from '../../mixins/playList.vue'

@Component({
    components: {
        Slider,
        Scroll,
        Loading
    },
    mixins: [playListBottom]
})
export default class Recommend extends Vue {
    slideList: number[] = []
    recommendList: number[] = []

    created() {
        this.fetchSliderList()
        this.fetchRecommendList()
    }

    fetchSliderList() {
        fetchSliderList().then((resp: any) => {
            if (resp.code === ERR_OK) {
                this.slideList = resp.data.slider
            }
        }).catch((err: string) => {
            console.warn(err)
        })
    }

    fetchRecommendList() {
        fetchRecommendList().then(resp => {
            if (resp.code === ERR_OK) {
                this.recommendList = resp.data.list
            }
        }).catch(err => {
            console.warn(err)
        })
    }
}
</script>

<style scoped lang="scss">
    @import './style';
</style>