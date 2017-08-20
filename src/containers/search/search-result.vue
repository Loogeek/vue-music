<template>
    <div class="search-result">
        <scroll :data="searchResult.list">
            <ul>
                <li class="search-result-item" v-for="(item, index) in searchResult.list" :key="index">
                    <span class="icon">
                        <i :class="renderResultIcon(item)"></i>
                    </span>
                    <p class="name" v-html="renderResultName(item)"></p>
                </li>
            </ul>
        </scroll>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import Scroll from 'components/Scroll'

    export default {
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
            }
        },
        components: {
            Scroll
        }
    }
</script>

<style lang="scss" scoped>
    // @import './search-result';
</style>

