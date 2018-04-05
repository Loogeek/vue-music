<template>
    <article class="m-slider" ref="slider">
        <ul class="m-slider-list" ref="sliderList">
            <li class="m-slider-list-item" v-for="(item, index) in slideList" :key="index">
                <a :href="item.linkUrl">
                    <img :src="item.picUrl">
                </a>
            </li>
        </ul>
        <ul class="m-slider-dots">
            <li :class="[index === currentPage ? 'active' : '', 'm-slider-dots-item']" v-for="(item, index) in sliderChildren" :key="index">
            </li>
        </ul>
    </article>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    data() {
        return {
            sliderChildren: [],
            currentPage: 0
        }
    },
    props: {
        slideList: {
            type: Array,
            default: []
        },
        loop: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 4000
        }
    },
    mounted() {
        this.initSlider()
        this.initScroll()

        window.addEventListener('resize', () => {
            this.initSlider(true)
        })
    },
    destroyed() {
        clearInterval(this.timer)
    },
    methods: {
        initSlider(isResize = false) {
            let width = 0
            const sliderWidth = this.$refs.slider.clientWidth
            const sliderList = this.$refs.sliderList
            this.sliderChildren = [...sliderList.children]

            this.sliderChildren.map(item => {
                item.style.width = sliderWidth + 'px'
            })

            width = sliderWidth * this.sliderChildren.length

            // resize时因为已经复制过节点，所以不需要再加两个节点宽度
            if (this.loop && !isResize) {
                width += sliderWidth * 2       // 无缝循环轮播会在首尾各复制一个节点
            }
            sliderList.style.width = width + 'px'
        },
        initScroll() {
            this.scroll = new BScroll(this.$refs.slider, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: {
                    loop: this.loop,
                    threshold: 0.3,
                    speed: 400
                }
            })

            if (this.autoPlay) {
                this.sliderPlay()
            }

            this.scroll.on('scrollEnd', () => {
                clearInterval(this.timer)
                this.currentPage = this.scroll.getCurrentPage().pageX

                if (this.autoPlay) {
                    this.sliderPlay()
                }
            })
        },
        sliderPlay() {
            const sliderLen = this.sliderChildren.length

            this.timer = setInterval(() => {
                this.currentPage = this.scroll.getCurrentPage().pageX

                // 为了避免interval时长太短，导致一直停留在最后一张图
                if (this.currentPage === sliderLen + 1) {
                    this.currentPage = 0
                }

                this.scroll.goToPage(this.currentPage + 1, 0, 400, 'linear')
            }, this.interval)
        }
    }
}
</script>

<style scoped lang="scss">
@import '~common/scss/variable';

.m-slider {
    position: relative;

    .m-slider-list {
        overflow: hidden;

        &-item {
            display: inline-block;

            >a {
                width: 100%;
                display: inline-block;
            }

            img {
                width: 100%;
            }
        }
    }

    .m-slider-dots {
        position: absolute;
        bottom: 1.2rem;
        left: 0;
        right: 0;
        text-align: center;

        &-item {
            display: inline-block;
            width: .8rem;
            height: .8rem;
            background-color: $color-text-l;
            border-radius: 50%;
            margin: 0 .4rem;

            &.active {
                width: 2rem;
                border-radius: .5rem;
                background-color: $color-text-ll;
            }
        }
    }
}
</style>
