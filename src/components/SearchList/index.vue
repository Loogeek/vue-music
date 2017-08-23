<template>
    <ul class="search-list">
        <li class="search-list-item" :key="index"
            v-for="(item, index) in searches" 
            @click="handleSelectHistory(item)"
        >
            <span class="text">{{ item }}</span>
            <span class="icon">
                <i class="icon-delete"></i>
            </span>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        searches: {
            type: Array,
            default: []
        }
    },
    methods: {
        handleSelectHistory(historySong) {
            this.$emit('onSelectHistory', historySong)
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
            font-size: $font-size-small;
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

