<template>
  <div class="page_not_found">
    <svg-icon icon-class="page-not-found"/>
    <div class="text">
      <span>您访问的页面不存在，请输入正确的网址或</span>
      <el-button type="primary" plain size="small" @click="$router.push('/')">返回主页</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .page_not_found {
    text-align: center;

    .svg-icon {
      font-size: 70vh;
      color: $--color-primary;
    }

    .text {
      font-weight: bold;
      font-size: 24px;

      span {
        margin-right: 5px;
        position: relative;
        top: 5px;
      }
    }
  }
</style>
