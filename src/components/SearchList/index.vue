<template>
    <article class="search-list">
        <ul>
            <li class="search-list-item" v-for="(item, index) in searchSong" :key="index">
                <span class="text">{{ item }}</span>
                <span class="icon">
                    <i class="icon-delete"></i>
                </span>
            </li>
        </ul>
    </article>
</template>

<script>
export default {
    props: {
        searches: {
            type: Array,
            default: []
        }
    },
    computed: {
        searchSong() {
            return this.searches.song && this.searches.song.list || []
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/variable';
@import '~common/scss/mixin';

.search-list {
    &-item {
        display: flex;
        align-items: center;
        height: 4rem;
    }
    .text {
        flex:1;
        color:$color-text-l;
    }
    .icon {
        @extend %extend-click;

        &-delete {
            font-size: $font-size-small;
            color: $color-text-d;
        }
    }
}
</style>

