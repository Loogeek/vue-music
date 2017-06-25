<template>
    <div class="recommend">
        <Scroll :data="recommendList">
            <div>
                <slider v-if="slideList.length" :slideList="slideList"></slider>
                <section class="recommend-list" v-if="recommendList.length > 0">
                    <header class="recommend-list-header">热门歌单推荐</header>
                    <ul>
                        <li v-for="item in recommendList" class="list-item">
                            <div class="list-item-left">
                                <img v-lazy="item.imgurl">
                            </div>
                            <div class="list-item-right">
                                <h4 class="list-item-right-header" v-html="item.creator.name"></h4>
                                <p class="list-item-right-desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </section>
            </div>
            <Loading v-if="recommendList.length === 0" />
        </Scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import Slider from 'components/Slider';
    import Loading from 'components/loading';
    import Scroll from 'components/Scroll';
    import { fetchSliderList, fetchRecommendList } from 'api/recommend';
    import { ERR_OK } from 'api/config';

    export default {
        data() {
            return {
                slideList: [],
                recommendList: []
            };
        },
        created() {
            this.fetchSliderList();
            this.fetchRecommendList();
        },
        methods: {
            fetchSliderList() {
                fetchSliderList().then(resp => {
                    if (resp.code === ERR_OK) {
                        this.slideList = resp.data.slider;
                    }
                }).catch(err => {
                    console.warn(err);
                });
            },
            fetchRecommendList() {
                fetchRecommendList().then(resp => {
                    if (resp.code === ERR_OK) {
                        this.recommendList = resp.data.list;
                    }
                }).catch(err => {
                    console.warn(err);
                });
            }
        },
        components: {
            Slider,
            Scroll,
            Loading
        }
    };
</script>

<style scoped lang="scss">
    @import '~common/scss/variable';

    .recommend {
        position: fixed;
        top: 8.8rem;
        left: 0;
        bottom: 0;
        width: 100%;

        .loading {
            position: absolute;
            top: 50%;
            width: 100%;
            transform: translateY(-50%);
        }

        &-list {
            &-header {
                height: 6.5rem;
                line-height: 6.5rem;
                text-align: center;
                font-size: $font-size-medium;
                color: $color-theme;
            }

            .list-item {
                display: flex;
                padding: 0 20px 20px;
                align-items: center;

                &-left {
                    width: 6rem;
                    height: 6rem;
                    overflow: hidden;
                    margin-right: 2rem;

                    > img {
                        width: 100%;
                        height: 100%;
                    }
                }

                &-right {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    font-size: 1.4rem;

                    &-header {
                        margin-bottom: 1rem;
                        color: $color-text;
                    }

                    &-desc {
                        color: $color-text-d;
                    }
                }
            }
        }
    }
</style>