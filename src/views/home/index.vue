<template>
  <div class="home">
    <navigation-bar/>
    <div class="body">
      <user-list @click="itemClick"/>
      <div class="content">
        <loading v-if="loading" style="margin-top: 30vh"/>
        <el-scrollbar v-else :key="$store.getters.screenHeight">
          <div style="padding: 15px 20px">
            <hot-pages-list
                :title="`${nickname}的热点页面`"
                :lan-ip="lanIp"
                :data="projectList.hotPages"/>
            <project-list
                :title="`${nickname}的前端项目`"
                column="项目名称"
                :lan-ip="lanIp"
                :data="projectList.frontend"
                style="margin-top: 15px"/>
            <project-list
                :title="`${nickname}的后端项目`"
                column="项目名称"
                :lan-ip="lanIp"
                :data="projectList.backend"
                style="margin-top: 15px"/>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
  import NavigationBar from '@/components/NavigationBar'
  import Loading from '@/components/Loading'
  import UserList from './UserList'
  import ProjectList from './ProjectList'
  import HotPagesList from './HotPagesList'
  import {fetchProjectList} from '@/api/home'

  export default {
    components: {
      NavigationBar,
      Loading,
      UserList,
      ProjectList,
      HotPagesList
    },
    data() {
      return {
        loading: true,
        nickname: '',
        lanIp: '',
        // 前后端项目列表数据
        projectList: {
          frontend: [],
          backend: [],
          hotPages: []
        }
      }
    },
    mounted() {
      // 初始化查询项目列表数据
      fetchProjectList().then(({data}) => this.projectList = data);
    },
    methods: {
      itemClick(data) {
        this.loading = true;
        setTimeout(() => this.loading = false, 500);
        this.nickname = data.nickname;
        this.lanIp = data.lanIp;
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .home {

    .body {
      display: flex;
      justify-content: left;

      .content {
        flex: 1;
        overflow-x: hidden;
        overflow-y: hidden;

        .el-scrollbar {
          height: calc(100vh - 60px);

          /deep/ .el-scrollbar__bar.is-horizontal {
            display: none;
          }
        }
      }
    }
  }
</style>
