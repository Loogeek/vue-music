<template>
    <div class="search-result" ref="listWrap">
        <scroll v-show="!showNoResult"
            :data="searchResult.list"
            :scrollMore="true" 
            :beforeScroll="true"
            @onScrollEnd="handleScrollEnd"
            @onBeforeScroll="handleBeforeScroll"
            ref="scrollHook"
        >
            <ul>
                <li tag="li" 
                    class="search-result-item"
                    @click="handleSelectSong(item, index)"  
                    v-for="(item, index) in searchResult.list" 
                    :key="index"
                >
                    <span class="icon">
                        <i :class="renderResultIcon(item)"></i>
                    </span>
                    <p class="name" v-html="renderResultName(item)"></p>
                </li>
                <Loading v-show="searchResult.hasMore" desc=""></Loading>
            </ul>
        </scroll>
        <no-result v-show="showNoResult"></no-result>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'
    import Scroll from 'components/Scroll'
    import NoResult from 'components/NoResult'
    import Loading from 'components/Loading'
    import { playListBottom } from 'mixins/playList'

    export default {
        mixins: [playListBottom],
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
            showNoResult() {
                const { keyword, list } = this.searchResult
                if (keyword && list.length === 0) {
                    return true
                } else {
                    return false
                }
            },
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
                    this.setSearchHistory(item.singername)
                    this.$router.push({
                        path: `/singer/${item.singermid}`
                    })
                } else {
                    this.setSearchHistory(`${item.songname}-${item.singer}`)
                    this.setPlaySong({
                        list: this.searchResult.list,
                        currentIndex: index,
                        fullScreen: true
                    })
                }
            },
            handleScrollEnd() {
                if (this.searchResult.hasMore) {
                    this.page++
                    this.fetchSearchQuery({query: this.query, page: this.page})
                }
            },
            handleBeforeScroll() {
                this.$emit('onBeforeScroll')
            },
            ...mapActions([
                'fetchSearchQuery'
            ]),
            ...mapMutations({
                 setPlaySong: 'SET_PLAY_SONG',
                 setSearchHistory: 'SET_SEARCH_HISTORY'
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

