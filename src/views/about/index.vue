<template>
  <div class="about">
    <navigation-bar/>
    <el-scrollbar :key="$store.getters.screenHeight">
      <div style="padding: 15px 20px">
        <div class="content">
          <div class="header">关于</div>
          <div class="body" :style="{height: boxHeight}">
            <div class="title">一、项目简介</div>
            <p>本项目的功能是同步内网IP地址，实现内网网址导航，方便前后端开发人员联调测试。</p>
            <p>本项目共分为三个模块：前端、后端、客户端，它们的协作关系如下：</p>
            <div style="margin-bottom: 18px; height: 792px">
              <img src="/static/img/about/topology-diagram.png" alt="">
            </div>
            <div class="title">二、项目地址</div>
            <el-table :data="tableData" border style="margin: 18px 0">
              <el-table-column align="center" label="欢迎大家 fork、pr、star 😊">
                <el-table-column
                    prop="module"
                    align="center"
                    min-width="15%"
                    label="项目模块">
                </el-table-column>
                <el-table-column
                    prop="language"
                    align="center"
                    min-width="15%"
                    label="开发语言">
                </el-table-column>
                <el-table-column
                    prop="library"
                    align="center"
                    min-width="30%"
                    label="技术栈">
                </el-table-column>
                <el-table-column
                    align="center"
                    min-width="40%"
                    label="项目地址">
                  <template slot-scope="scope">
                    <a class="address" :href="scope.row.address" target="_blank">{{ scope.row.address }}</a>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <div class="title">三、特别鸣谢</div>
            <p>感谢星姐为项目取了一个非常有创意的名字Doorplate😀，以及提供了一些宝贵的建议。</p>
            <div style="height: 814px">
              <img src="/static/img/about/chat-screenshot-1.png" alt="">
            </div>
            <div style="margin-top: 10px; height: 434px">
              <img src="/static/img/about/chat-screenshot-2.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
  import NavigationBar from '@/components/NavigationBar'

  export default {
    components: {
      NavigationBar
    },
    data() {
      return {
        tableData: [{
          module: '前端',
          language: 'Vue',
          library: 'Vue、ElementUI',
          address: 'https://github.com/hxulin/site-guide-front'
        }, {
          module: '后端',
          language: 'Java',
          library: 'SpringBoot、MyBatisPlus',
          address: 'https://github.com/hxulin/site-guide-api'
        }, {
          module: '客户端',
          language: 'C#',
          library: '--',
          address: 'https://github.com/hxulin/site-guide'
        }]
      }
    },
    computed: {
      boxHeight: function () {
        return (this.$store.getters.screenHeight < 2778
          ? 2620
          : this.$store.getters.screenHeight - 160) + 'px';
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #FFF;
  }

  a.address {
    color: $--color-primary;

    &:hover {
      text-decoration: underline;
    }
  }

  .el-table {
    /deep/ .el-table__header .cell,
    /deep/ .el-table__body .cell {
      font-size: 16px;
    }
  }

  .about {

    .el-scrollbar {
      height: calc(100vh - 60px);

      .content {
        background: #FFF;
        border: 1px solid #DCDFE6;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);

        .header {
          background-color: #F5F7FA;
          border-bottom: 1px solid #E4E7ED;
          font-size: 22px;
          padding: 20px;
        }

        .body {
          padding: 30px;

          .title {
            font-size: 20px;
          }

          p {
            font-size: 18px;
          }
        }
      }
    }
  }
</style>
