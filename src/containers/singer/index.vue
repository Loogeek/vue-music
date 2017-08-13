<template>
    <section class="singer">
        <scroll ref="singerScroll" @onScroll="handleScroll" :data="singerList" :listenScroll="true" :probeType="3">
            <ul>
                <li class="singer-item" v-for="(singer, index) in singerList" :key="index" ref="listGroup">
                    <h3 class="singer-item-index">{{singer.title}}</h3>
                    <ul class="singer-item-list">
                        <li class="singer-item-list-item" v-for="(item, index) in singer.items" :key="index" @click="setCurrentSinger(item)">
                            <router-link :to="`/singer/${item.id}`" class="item-link">
                                <img class="item-avatar" v-lazy="item.avatar">
                                <span class="item-name">{{item.name}}</span>
                            </router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </scroll>
        <ul class="singer-alphabetlist" @touchstart="handleTouchStart" @touchmove.stop.prevent="handleTouchMove">
            <li v-for="(item, index) in alphabetName" :class="['singer-alphabetlist-item', {'current': currentIndex === index}]" :key="index" :data-index="index">
                {{ item }}
            </li>
        </ul>
        <div class="singer-list-title" v-if="listTopTitle" ref="listTitle">{{ listTopTitle }}</div>
        <Loading v-if="singerList.length === 0"></Loading>
        <router-view></router-view>
    </section>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Scroll from 'components/Scroll'
import Loading from 'components/Loading'

const ALPHABET_ITEM_HEIGHT = 18
const LIST_TOP_TITLE_HEIGHT = 30

export default {
    data() {
        return {
            currentIndex: 0,
            scrollY: 0,
            listTitleDiff: 0,
            listGroupHeight: []
        }
    },
    created() {
        this.touches = {}
    },
    mounted() {
        this.fetchSingerList()
    },
    computed: {
        alphabetName() {
            return this.singerList.map(item => item.title.slice(0, 1))
        },
        listTopTitle() {
            if (this.scrollY < 0) {
                return
            }
            return this.singerList[this.currentIndex] && this.singerList[this.currentIndex].title
        },
        ...mapGetters([
            'singerList'
        ])
    },
    methods: {
        handleTouchStart(e) {
            this.touches.startIndex = parseInt(e.target.dataset.index)
            this.touches.startY = e.touches[0].pageY
            this.currentIndex = this.touches.startIndex
            this._scrollToElement()
        },
        handleTouchMove(e) {
            const moveY = Math.floor((e.touches[0].pageY - this.touches.startY) / ALPHABET_ITEM_HEIGHT)
            let changeIndex = this.touches.startIndex + moveY

            if (changeIndex < 0) {
                changeIndex = 0
            } else if (changeIndex > this.singerList.length - 1) {
                changeIndex = this.singerList.length - 1
            }

            this.currentIndex = changeIndex
            this._scrollToElement()
        },
        handleScroll(pos) {
            this.scrollY = -pos.y
        },
        setCurrentSinger(singerItem) {
            this.setCurrentSinger(singerItem)
        },
        _scrollToElement() {
            const targetDOM = this.$refs.listGroup[this.currentIndex]
            this.$refs.singerScroll.scrollToElement(targetDOM, 0)
        },
        _calculateHeight() {
            let height = 0
            let _listGroupHeight = [0];

            [...this.$refs.listGroup].map(item => {
                height = height + item.clientHeight
                _listGroupHeight.push(height)
            })
            this.listGroupHeight = _listGroupHeight
        },
        ...mapActions([
            'fetchSingerList'
        ]),
        ...mapMutations({
            setCurrentSinger: 'SET_CURRENT_SINGER'
        })
    },
    watch: {
        singerList() {
            this.$nextTick(() => {
                this._calculateHeight()
            })
        },
        scrollY() {
            for (let i = 0, len = this.listGroupHeight.length; i < len; i++) {
                const height1 = this.listGroupHeight[i]
                const height2 = this.listGroupHeight[i + 1]

                if (this.scrollY >= height1 && this.scrollY < height2) {
                    this.currentIndex = i
                    this.listTitleDiff = height2 - this.scrollY
                    break
                }
            }
        },
        listTitleDiff(newValue) {
            if (this.$refs.listTitle) {
                let diffY = newValue > 0 && newValue < LIST_TOP_TITLE_HEIGHT ? newValue - LIST_TOP_TITLE_HEIGHT : 0
                this.$refs.listTitle.style.webkitTransform = `translateY(${diffY}px)`
            }
        }
    },
    components: {
        Scroll,
        Loading
    }
}

</script>

<style scoped lang="scss">
@import './style';
</style>