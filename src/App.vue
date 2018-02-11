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
import MHeader from 'components/MHeader'
import MTab from 'components/MTab'
import player from 'pages/player'
import style from 'common/scss/index.scss'

export default {
    components: {
        MHeader,
        MTab,
        player
    }
}
</script>

<style>
    #app {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
    }
</style>
