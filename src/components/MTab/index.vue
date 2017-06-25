<template>
  <ul class="m-tab">
    <router-link tag="li" class="m-tab-item" to="/recommend">
      <span class="link">推荐</span>
    </router-link>
    <router-link tag="li" class="m-tab-item" to="/singer">
      <span class="link">歌手</span>
    </router-link>
    <router-link tag="li" class="m-tab-item" to="/rank">
      <span class="link">排行</span>
    </router-link>
    <router-link tag="li" class="m-tab-item" to="/search">
      <span class="link">搜索</span>
    </router-link>
  </ul>
</template>

<script>
    export default {};
</script>

<style scoped lang="scss">
    @import "~common/scss/variable";

    .m-tab {
        display: flex;
        height: 4.4rem;
        line-height: 4.4rem;
        font-size: $font-size-medium;

        &-item {
            flex: 1;
            text-align: center;

            .link {
                padding-bottom: .5rem;
                color: $color-text-l;
            }

            .link-active {
                color: $color-theme;
                border-bottom: .2rem solid $color-theme;
            }
        }
    }
</style>
