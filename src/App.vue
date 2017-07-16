<template>
  <div id="app">
    <m-header></m-header>
    <m-tab></m-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
    import MHeader from 'components/MHeader';
    import MTab from 'components/MTab';
    import player from 'containers/player';

    export default {
      components: {
        MHeader,
        MTab,
        player
      }
    };
</script>

<style>

</style>
