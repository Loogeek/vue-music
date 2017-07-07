<template>
    <section class="singer">
        <scroll ref="singerScroll"
            @onScroll="handleScroll"
            :data="singerList"
            :listenScroll="true"
            :probeType="3"
        >
            <ul>
                <li class="singer-item" v-for="(singer, index) in singerList" :key="index" ref="listGroup">
                    <h3 class="singer-item-index">{{singer.title}}</h3>
                    <ul class="singer-item-list">
                        <li class="singer-item-list-item" v-for="(item, index) in singer.items" :key="index">
                            <img class="item-avatar" v-lazy="item.avatar">
                            <span class="item-name">{{item.name}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </scroll>
        <ul class="singer-alphabetlist" 
            @touchstart="handleTouchStart" 
            @touchmove.stop.prevent="handleTouchMove"
        >
            <li v-for="(item, index) in alphabetName" :class="['singer-alphabetlist-item', {'current': currentIndex === index}]" :key="index" :data-index="index">
                {{ item }}
            </li>
        </ul>
        <div class="singer-list-title" v-if="listTopTitle" ref="listTitle">{{ listTopTitle }}</div>
        <Loading v-if="singerList.length === 0"></Loading>
    </section>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'components/Scroll';
    import Loading from 'components/Loading';
    import Singer from 'common/js/singer';
    import { fetchSingerList } from 'api/singer';
    import { ERR_OK } from 'api/config';

    const HOT_NAME = '热门';
    const HOT_SINGER_LEN = 10;
    const ALPHABET_ITEM_HEIGHT = 18;
    const LIST_TOP_TITLE_HEIGHT = 30;

    export default {
        data() {
            return {
                currentIndex: 0,
                scrollY: 0,
                listTitleDiff: 0,
                singerList: [],
                listGroupHeight: []
            };
        },
        created() {
            this.touches = {};
        },
        mounted() {
            this.fetchSingerList();
        },
        computed: {
            alphabetName() {
                return this.singerList.map(item => item.title.slice(0, 1));
            },
            listTopTitle() {
                if (this.scrollY < 0) {
                    return;
                }
                return this.singerList[this.currentIndex] && this.singerList[this.currentIndex].title;
            }
        },
        methods: {
            fetchSingerList() {
                fetchSingerList().then(resp => {
                    if (resp.code === ERR_OK) {
                        this.singerList = this.formatSingerList(resp.data.list);
                    }
                });
            },
            formatSingerList(data) {
                let formatList = {};
                let hotList = {
                    title: HOT_NAME,
                    items: []
                };
                let ret = [];

                hotList.items = data && data.slice(0, 10).map(item => 
                    new Singer(
                        item.Fsinger_mid,
                        item.Fsinger_name
                    )
                );
                
                ret.push(hotList);
                data && data.map(item => {
                    const key = item.Findex;
                    if (key.match(/[a-zA-Z]/)) {
                        if (formatList[key]) {
                            formatList[key].items.push(new Singer(
                                item.Fsinger_mid,
                                item.Fsinger_name
                            ));
                        } else {
                            formatList[key] = {
                                title: key,
                                items: [new Singer(
                                    item.Fsinger_mid,
                                    item.Fsinger_name
                                )]
                            };
                        }
                    }
                });

                return [
                    ...ret, 
                    ...Object.keys(formatList).sort((a, b) => 
                        formatList[a].title.charCodeAt() - formatList[b].title.charCodeAt()
                    ).map(item => formatList[item])
                ];
            },
            handleTouchStart(e) {
                this.touches.startIndex = parseInt(e.target.dataset.index);
                this.touches.startY = e.touches[0].pageY;
                this.currentIndex = this.touches.startIndex;
                this._scrollToElement();
            },
            handleTouchMove(e) {
                const moveY = Math.floor((e.touches[0].pageY - this.touches.startY) / ALPHABET_ITEM_HEIGHT);
                let changeIndex = this.touches.startIndex + moveY;

                if (changeIndex < 0) {
                    changeIndex = 0;
                } else if (changeIndex > this.singerList.length - 1) {
                    changeIndex = this.singerList.length - 1;
                }
                
                this.currentIndex = changeIndex; 
                this._scrollToElement();
            },
            handleScroll(pos) {
                this.scrollY = -pos.y;
            }, 
            _scrollToElement() {
                const targetDOM = this.$refs.listGroup[this.currentIndex];
                this.$refs.singerScroll.scrollToElement(targetDOM, 0);
            },
            _calculateHeight() {
                let height = 0;
                let _listGroupHeight = [0];

                [...this.$refs.listGroup].map(item => {
                    height = height + item.clientHeight;
                    _listGroupHeight.push(height);
                });
                this.listGroupHeight = _listGroupHeight;
            }
        },
        watch: {
            singerList() {
                this.$nextTick(() => {
                    this._calculateHeight();
                });
            },
            scrollY() {
                for (let i = 0, len = this.listGroupHeight.length; i < len; i++) {
                    const height1 = this.listGroupHeight[i];
                    const height2 = this.listGroupHeight[i + 1];

                    if (this.scrollY >= height1 && this.scrollY < height2) {
                        this.currentIndex = i;
                        this.listTitleDiff = height2 - this.scrollY;
                        break;
                    }
                }
            },
            listTitleDiff(newValue) {
                let diffY = newValue > 0 && newValue < LIST_TOP_TITLE_HEIGHT ? newValue - LIST_TOP_TITLE_HEIGHT : 0;
                this.$refs.listTitle.style.webkitTransform = `translateY(${diffY}px)`;
            }
        },
        components: {
            Scroll,
            Loading
        }
    };

</script>

<style scoped lang="scss">
    @import "~common/scss/variable";

    .singer {
        position: fixed;
        top: 88px;
        bottom: 0;
        width: 100%;
        overflow: hidden;

        &-item {
            padding-bottom: 3rem;

            &-index {
                height: 30px;
                line-height: 30px;
                padding-left: 2rem;
                font-size: $font-size-small;
                color: $color-text-l;
                background-color: $color-highlight-background;
            }

            &-list-item {
                display: flex;
                align-items: center;
                padding: 2rem 0 0 3rem;

                .item-avatar {
                    width: 5rem;
                    height: 5rem;
                    border-radius: 50%;
                }

                .item-name {
                    margin-left: 2rem;
                    color: $color-text-l;
                    font-size: $font-size-medium;
                }
            }
        }

        &-list-title {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 30px;
            line-height: 30px;
            padding-left: 2rem;
            font-size: $font-size-small;
            color: $color-text-l;
            background-color: $color-highlight-background;
        }

        &-alphabetlist {
            position: fixed;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            width: 2rem;
            padding: 2rem 0;
            border-radius: 1rem;
            text-align: center;
            background-color: $color-background-d;
            font-family: Helvetica;

            &-item {
                padding: .3rem;
                line-height: 1;
                color: $color-text-l;
                font-size: $font-size-small;

                &.current {
                    color: $color-theme;
                }
            }
        }
    }
</style>