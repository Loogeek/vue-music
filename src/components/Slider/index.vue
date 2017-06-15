<template>
    <div class="m-slider" ref="slider">
        <ul class="m-slider-list" ref="sliderList">
            <li class="m-slider-list-item" v-for="item in slideList">
                <a :href="item.linkUrl">
                    <img :src="item.picUrl">
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';

    export default {
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
                default: 2000
            }
        },
        mounted() {
            this.initSlider();
            this.initScroll();     
        },
        destroyed() {
            clearInterval(this.timer);
        },
        methods: {
            initSlider() {
                let width = 0;
                const sliderWidth = this.$refs.slider.clientWidth;
                const sliderList = this.$refs.sliderList;
                const sliderChild = [...sliderList.children];

                sliderChild.map(item => {
                    item.style.width = sliderWidth + 'px';
                });

                width = sliderWidth * sliderChild.length;

                if (this.loop) {
                    width += sliderWidth * 2;       // 无缝循环轮播会在首尾各复制一个节点
                }
                sliderList.style.width = width + 'px';
            },
            initScroll() {
                const scroll = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    snap: true,
                    snapLoop: this.loop,
                    snapThreshold: 0.3,
                    snapSpeed: 400
                });

                if (this.autoPlay) {
                    const sliderLen = this.$refs.sliderList.children.length;

                    this.timer = setInterval(() => {
                        let currentPage = scroll.getCurrentPage().pageX;
                        if (currentPage === sliderLen) {
                            currentPage = 0;
                        }
                        scroll.goToPage(currentPage + 1, 0, 400, 'linear');
                    }, this.interval);
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .m-slider-list {
        overflow: hidden;

        &-item {
            display: inline-block;

            > a {
                width: 100%;
                display: inline-block;
            }

            img {
                width: 100%;
            }
        }
    }
</style>
