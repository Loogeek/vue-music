<template>
    <section class="search">
        <search-input></search-input>
        <div class="search-hot">
            <scroll>
                <div class="search-hot-key">
                    <h1 class="title">热门搜索</h1>
                    <ul v-if="search.hotkey.length > 0">
                        <li class="item" v-for="(hotItem, index) in search.hotkey" :key="index">
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
                    <search-list :searches="[]"></search-list>
                </div>
            </scroll>
        </div>
    </section>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import Scroll from 'components/Scroll'
    import SearchInput from 'components/SearchInput'
    import SearchList from 'components/SearchList'

    export default {
        created() {
            this.fetchHotSearch()
        },
        computed: {
            ...mapState([
                'search'
            ])
        },
        methods: {
            ...mapActions([
                'fetchHotSearch'
            ])
        },
        components: {
            Scroll,
            SearchInput,
            SearchList
        }
    }
</script>

<style lang="scss" scoped>
    @import './style';
</style>
