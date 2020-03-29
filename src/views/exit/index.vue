<template>
  <div>

  </div>
</template>

<script>
  export default {
    created() {
      // 退出系统
      this.$store.dispatch('logOut').then(() => {
        this.$router.push({path: '/'});
      });
    }
  }
</script>
