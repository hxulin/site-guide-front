<template>
  <div id="app" v-loading.fullscreen.lock="$store.getters.loading">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "app"
  };
</script>
