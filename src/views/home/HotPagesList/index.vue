<template>
  <div class="project_list">
    <div class="header" v-text="title"></div>
    <div class="body">
      <el-table :data="data">
        <el-table-column
            prop="name"
            label="页面名称">
        </el-table-column>
        <el-table-column
            label="访问地址">
          <template slot-scope="scope">
            <a class="entrance_href"
               :href="scope.row.url.replace(/localhost/, lanIp)"
               target="_blank">{{ scope.row.url.replace(/localhost/, lanIp) }}</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      lanIp: String,
      data: {
        type: Array,
        default: () => {return []},
      }
    }
  }
</script>

<style lang="scss" scoped>

  .el-table {
    /deep/ .el-table__header .cell,
    /deep/ .el-table__body .cell {
      font-size: 16px;
    }
  }

  a.entrance_href {
    color: $--color-primary;

    &:hover {
      text-decoration: underline;
    }
  }

  .project_list {
    background: #FFF;
    border: 1px solid #DCDFE6;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);

    .header {
      background-color: #F5F7FA;
      border-bottom: 1px solid #E4E7ED;
      font-size: 22px;
      text-align: center;
      padding: 20px 0;
    }

    .body {
      padding: 30px;
    }
  }
</style>
