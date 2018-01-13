<template>
    <div class="m-header">
        <i class="m-header-icon"></i>
        <h1 class="m-header-text">Chicken Music</h1>
    </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style scoped lang="scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";

.m-header {
    text-align: center;
    color: $color-theme;
    font-size: 0;

    &-icon {
        display: inline-block;
        vertical-align: top;
        width: 30px;
        height: 32px;
        margin-top: 6px;
        margin-right: 9px;
        @include bg-image('logo');
        background-size: 30px 32px;
    }

    &-text {
        display: inline-block;
        vertical-align: top;
        line-height: 4.4rem;
        font-size: $font-size-large;
    }
}
</style>
