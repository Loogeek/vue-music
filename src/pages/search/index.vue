<template>
    <section class="search">
        <search-input @onSearchInput="handleSearchInput" ref="searchInput"></search-input>
        <div class="search-hot" v-show="!query" ref="listWrap">
            <scroll :data="hotAndHistory" ref="scrollHook">
                <div>
                    <div class="search-hot-key">
                        <h1 class="title">热门搜索</h1>
                        <ul v-if="search.hotkey.length > 0">
                            <li class="item" 
                                v-for="(hotItem, index) in search.hotkey"             :key="index"
                                @click="handleSelectHot(hotItem.k)"
                            >
                                <span>{{ hotItem.k }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="search-history" v-show="search.history.length">
                        <h1 class="title">
                            <span class="text">搜索历史</span>
                            <span class="clear" @click.stop="handleDeleHistoryList">
                                <i class="icon-clear"></i>
                            </span>
                        </h1>
                        <search-list :searches="search.history"
                            @onSelectHistory="handleSelectHistory"
                            @onDeleteHistory="handleDeleHistory"
                        >
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
        <Modal ref="modal" 
            contentText="是否清空所有搜索历史"
            @onSelectConfirm="handleSelectConfirm"
            @onSelectCancel="handleSelectCancel"
        >
        </Modal>
    </section>
</template>

<script>
    import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
    import Scroll from 'components/Scroll'
    import SearchInput from 'components/SearchInput'
    import SearchList from 'components/SearchList'
    import SearchResult from './search-result'
    import Modal from 'components/Modal'
    import playListBottom from 'mixins/playList'

    export default {
        mixins: [playListBottom],
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
            handleDeleHistoryList() {
                this.$refs.modal.show()
            },
            handleSelectConfirm() {
                this.deleSearchHistoryList()
                this.$refs.modal.hide()
            },
            handleSelectCancel() {
                this.$refs.modal.hide()
            },
            ...mapActions([
                'fetchHotSearch'
            ]),
            ...mapMutations({
                 setSearchHistory: 'SET_SEARCH_HISTORY',
                 handleDeleHistory: 'DELE_SEARCH_HISTORY',
                 deleSearchHistoryList: 'DELE_SEARCH_HISTORY_LIST'
            })
        },
        components: {
            SearchResult,
            Scroll,
            SearchInput,
            SearchList,
            Modal
        }
    }
</script>

<style lang="scss" scoped>
    @import './style';
</style>
