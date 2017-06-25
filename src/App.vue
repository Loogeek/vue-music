<template>
  <div id="app">
    <m-header></m-header>
    <m-tab></m-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
    import MHeader from 'components/MHeader';
    import MTab from 'components/MTab';

    export default {
      components: {
        MHeader,
        MTab
      }
    };
</script>

<style>

</style>
