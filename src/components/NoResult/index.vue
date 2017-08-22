<template>
    <article class="no-result">
        <div class="no-result-img"></div>
        <p class="no-result-desc">{{ desc }}</p>
    </article>
</template>

<script>
    export default {
        props: {
            desc: {
                type: String,
                default: '抱歉，暂无搜索结果'
            }
        }
    }
</script>


<style lang="scss" scoped>
    @import '~common/scss/variable';
    @import '~common/scss/mixin';

    .no-result {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;

        &-img {
            @include bg-image('./images/no-result');
            width: 8.6rem;
            height: 9rem;
            margin: 0 auto;
            background-size: 8.6rem 9rem;
        }

        &-desc {
            margin-top: 3rem;
            font-size: $font-size-medium;
            color: $color-text-d;
        }
    }
</style>

