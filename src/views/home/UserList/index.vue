<template>
  <div class="user_list">
    <el-scrollbar :key="$store.getters.screenHeight">
      <item
          v-for="(item, index) in tableData"
          @click="selectItem"
          :selected="item.id===selectedId"
          :data="item"
          :key="index"/>
    </el-scrollbar>
  </div>
</template>

<script>
  import Item from './Item'
  import {fetchUserList} from '@/api/home'

  export default {
    components: {
      Item
    },
    data() {
      return {
        tableData: [],
        selectedId: 0
      }
    },
    mounted() {
      fetchUserList().then(({data}) => {
        this.tableData = data;
        if (data) {
          this.selectItem(data[0]);
        }
      });
    },
    methods: {
      selectItem(data) {
        if (data.lanIp) {
          this.selectedId = data.id;
          this.$emit('click', data);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .user_list {
    width: 259px;
    border-right: 3px solid #F2F2F2;

    .el-scrollbar {
      height: calc(100vh - 60px);
    }
  }
</style>
