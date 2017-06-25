<template>
    <article class="loading">
        <img src="./loading.gif" class="loading-img">
        <p class="loading-desc">{{ desc }}</p>
    </article>
</template>

<script>
    export default {
        props: {
            desc: {
                type: String,
                default: '正在载入...'
            }
        }
    };
</script>

<style lang="scss">
    @import "~common/scss/variable";

    .loading {
        text-align: center;

        &-img {
            width: 24px;
            height: 24px;
        }

        &-desc {
            line-height: 2rem;
            font-size: $font-size-small;
            color: $color-text-l;
        }
    }
</style>

