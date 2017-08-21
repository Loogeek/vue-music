<template>
    <div class="search-result">
        <scroll :data="searchResult.list" 
            :scrollMore="true" 
            @onScrollEnd="handleScrollEnd"
        >
            <ul>
                <li class="search-result-item" v-for="(item, index) in searchResult.list" :key="index">
                    <span class="icon">
                        <i :class="renderResultIcon(item)"></i>
                    </span>
                    <p class="name" v-html="renderResultName(item)"></p>
                </li>
                <Loading v-show="searchResult.hasMore" desc="" ></Loading>
            </ul>
        </scroll>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import Scroll from 'components/Scroll'
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
            handleScrollEnd() {
                if (this.searchResult.hasMore) {
                    this.page++
                    this.fetchSearchQuery({query: this.query, page: this.page})
                }
            },
            ...mapActions([
                'fetchSearchQuery'
            ])
        },
        watch: {
            query(newQuery) {
                this.fetchSearchQuery({query: newQuery})
            }
        },
        components: {
            Scroll,
            Loading
        }
    }
</script>

<style lang="scss" scoped>
    @import './search-result';
</style>

