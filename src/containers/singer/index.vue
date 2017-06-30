<template>
    <section class="singer">
        <scroll :data="singerList">
            <ul>
                <li class="singer-item" v-for="(singer, index) in singerList" :key="index">
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
        <ul class="singer-alphabetlist">
            <li class="singer-alphabetlist-item" v-for="(item, index) in singerList" :key="index">
                {{item.title.slice(0, 1)}}
            </li>
        </ul>
    </section>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'components/Scroll';
    import Singer from 'common/js/singer';
    import { fetchSingerList } from 'api/singer';
    import { ERR_OK } from 'api/config';

    const HOT_NAME = '热门';
    const HOT_SINGER_LEN = 10;

    export default {
        data() {
            return {
                singerList: []
            };
        },
        mounted() {
            this.fetchSingerList();
        },
        methods: {
            fetchSingerList() {
                fetchSingerList().then(resp => {
                    if (resp.code === ERR_OK) {
                        this.singerList = this.formatSingerList(resp.data.list);
                        console.log(this.formatSingerList(resp.data.list));
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
                                title: item.Findex,
                                items: []
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
            }
        },
        components: {
            Scroll
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

        &-item {
            padding-bottom: 3rem;

            &-index {
                height: 3rem;
                line-height: 3rem;
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