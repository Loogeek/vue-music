<template>
    <article class="search-input">
        <i class="icon-search"></i>
        <input type="text" class="search-input-box" :placeholder="placeholder">
        <i class="icon-dismiss search-input-clear" ></i>
    </article>
</template>

<script>
    export default {
        props: {
            placeholder: {
                type: String,
                default: '搜索歌曲、歌手'
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~common/scss/variable';

    .search-input {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        padding: 0 .6rem;
        height: 4rem;
        background-color: $color-highlight-background;
        border-radius: .6rem;

        .icon-search {
            font-size: 2.4rem;
            color: $color-background;
        }

        &-box {
            flex: 1;
            margin: 0 .5rem;
            line-height: 1.8rem;
            background-color: $color-highlight-background;
            color: $color-text;
            font-size: $font-size-medium;

            &::placeholder {
                color: $color-text-d;
            }
        }

        &-clear {
            font-size: 1.6rem;
            color: $color-background;
        }
    }
</style>
