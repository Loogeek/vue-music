<template>
    <section class="search">
        <search-input @onSearchInput="handleSearchInput" ref="searchInput"></search-input>
        <div class="search-hot" v-show="!query">
            <scroll :data="hotAndHistory">
                <div>
                    <div class="search-hot-key">
                        <h1 class="title">热门搜索</h1>
                        <ul v-if="search.hotkey.length > 0">
                            <li class="item" v-for="(hotItem, index) in search.hotkey"             :key="index"
                                @click="handleSelectHot(hotItem.k)"
                            >
                                <span>{{ hotItem.k }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="search-history" v-show="search.history.length">
                        <h1 class="title">
                            <span class="text">搜索历史</span>
                            <span class="clear">
                                <i class="icon-clear"></i>
                            </span>
                        </h1>
                        <search-list :searches="search.history"
                            @onSelectHistory="handleSelectHistory">
                        </search-list>
                    </div>
                </div>
            </scroll>
        </div>
        <search-result v-show="query" 
            :query="query"
            @onBeforeScroll="handleBlurInput"
        >
        </search-result>
    </section>
</template>

<script>
    import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
    import Scroll from 'components/Scroll'
    import SearchInput from 'components/SearchInput'
    import SearchList from 'components/SearchList'
    import SearchResult from './search-result'

    export default {
        created() {
            this.fetchHotSearch()
        },
        data() {
            return {
                query: ''
            }
        },
        computed: {
            hotAndHistory() {
                const { hotkey, history } = this.search
                
                return hotkey.concat(history)
            },
            ...mapState([
                'search'
            ]),
            ...mapGetters([
                'searchResult'
            ])
        },
        methods: {
            handleSearchInput(query) {
                this.query = query
            },
            handleSelectHot(hotKey) {
                this.$refs.searchInput.handleSearchQuery(hotKey)
                this.setSearchHistory(hotKey)
            },
            handleBlurInput() {
                this.$refs.searchInput.handleBlurInput()
            },
            handleSelectHistory(hitorySong) {
                this.$refs.searchInput.handleSearchQuery(hitorySong)
                this.setSearchHistory(hitorySong)
            },
            ...mapActions([
                'fetchHotSearch'
            ]),
            ...mapMutations({
                 setSearchHistory: 'SET_SEARCH_HISTORY'
            })
        },
        components: {
            SearchResult,
            Scroll,
            SearchInput,
            SearchList
        }
    }
</script>

<style lang="scss" scoped>
    @import './style';
</style>
