<template>
  <el-card :class="{selected: selected, disabled: !data.lanIp}" @click.native="$emit('click', data)" shadow="never">
    <div class="name">{{ data.nickname }}</div>
    <div class="ip">{{ data.lanIp || '-' }}</div>
    <div class="time">更新时间：{{ data.lastUpdated | timeAgo }}</div>
  </el-card>
</template>

<script>
  export default {
    props: {
      data: Object,
      selected: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-card {
    margin: 15px;
    cursor: pointer;

    &:not(.disabled).selected {
      color: $--color-primary;
      background-color: $--color-plain-hover;
    }

    &:not(.disabled):hover {
      color: $--color-primary;
      background-color: $--color-plain-hover;
    }

    &.disabled {
      opacity: .7;
      cursor: not-allowed;
    }

    /deep/ .el-card__body {

      .name {
        font-size: 30px;
      }

      .ip {
        margin: 10px 0;
      }

      .ip, .time {
        font-size: 14px;
      }
    }
  }
</style>
