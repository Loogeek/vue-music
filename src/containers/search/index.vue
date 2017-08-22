<template>
    <section class="search">
        <search-input @onSearchInput="handleSearchInput" ref="searchInput"></search-input>
        <div class="search-hot" v-show="!query">
            <scroll>
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
                <div class="search-history">
                    <h1 class="title">
                        <span class="text">搜索历史</span>
                        <span class="clear">
                            <i class="icon-clear"></i>
                        </span>
                    </h1>
                    <search-list :searches="searchHistory"></search-list>
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
    import { mapActions, mapState, mapGetters } from 'vuex'
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
            ...mapState([
                'search'
            ]),
            ...mapGetters([
                'searchResult',
                'searchHistory'
            ])
        },
        methods: {
            handleSearchInput(query) {
                this.query = query
            },
            handleSelectHot(hotKey) {
                this.$refs.searchInput.handleSearchQuery(hotKey)
            },
            handleBlurInput() {
                this.$refs.searchInput.handleBlurInput()
            },
            ...mapActions([
                'fetchHotSearch'
            ])
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
