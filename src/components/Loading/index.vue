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

<style scoped lang="scss">
    @import "~common/scss/variable";

    .loading {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translate3d(0, -50%, 0);
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

