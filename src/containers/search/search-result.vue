<template>
    <div class="search-result">
        <scroll :data="searchResult.list" 
            :scrollMore="true" 
            @onScrollEnd="handleScrollEnd"
            v-show="searchResult.list.length"
        >
            <ul>
                <li tag="li" @click="handleSelectSong(item, index)" class="search-result-item" v-for="(item, index) in searchResult.list" :key="index">
                    <span class="icon">
                        <i :class="renderResultIcon(item)"></i>
                    </span>
                    <p class="name" v-html="renderResultName(item)"></p>
                </li>
                <Loading v-show="searchResult.hasMore" desc="" ></Loading>
            </ul>
        </scroll>
        <no-result v-show="!searchResult.list.lenght"></no-result>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    import Scroll from 'components/Scroll'
    import NoResult from 'components/NoResult'
    import Loading from 'components/Loading'

    export default {
        props: {
            query: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                page: 1
            }
        },
        computed: {
            ...mapGetters([
                'searchResult'
            ])
        },
        methods: {
            renderResultIcon(item) {
                if (item.singername) {
                    return 'icon-mine'
                } else {
                    return 'icon-music'
                }
            },
            renderResultName(item) {
                if (item.singername) {
                    return item.singername
                } else {
                    return `${item.songname}-${item.singer}`
                }
            },
            handleSelectSong(item, index) {
                if (item.singername) {
                    this.$router.push({
                        path: `/singer/${item.singermid}`
                    })
                } else {
                    this.setPlaySong({
                        list: this.searchResult.list,
                        currentIndex: index
                    })
                }
            },
            handleScrollEnd() {
                if (this.searchResult.hasMore) {
                    this.page++
                    this.fetchSearchQuery({query: this.query, page: this.page})
                }
            },
            ...mapActions([
                'fetchSearchQuery'
            ]),
            ...mapMutations({
                 setPlaySong: 'SET_PLAY_SONG'
            })
        },
        watch: {
            query(newQuery) {
                this.fetchSearchQuery({query: newQuery})
            }
        },
        components: {
            Scroll,
            Loading,
            NoResult
        }
    }
</script>

<style lang="scss" scoped>
    @import './search-result';
</style>

