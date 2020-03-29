<template>
  <div>
    <navigation-bar/>
    <div class="main-container">
      <left-menu/>
      <div class="app-main">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  import NavigationBar from '../NavigationBar'
  import LeftMenu from '../LeftMenu'

  export default {
    name: "Layout",
    components: {
      NavigationBar,
      LeftMenu,
    }
  }
</script>

<style lang="scss" scoped>
  .main-container {
    display: flex;
    background-color: #F2F2F2;
    height: calc(100vh - 60px);

    .app-main {
      flex: 1;
      margin: 3px;
      padding: 10px;
      background-color: #FFF;
      overflow-x: hidden;
      overflow-y: hidden;
    }
  }
</style>
