<template>
  <div class="left_menu">
    <el-tooltip v-show="isCollapse" effect="dark" content="展开" placement="right">
      <div class="menu_switch" @click="menuSwitch">
        <i class="el-icon-s-unfold"></i>
      </div>
    </el-tooltip>
    <div v-show="!isCollapse" class="menu_switch" @click="menuSwitch">
      <i class="el-icon-s-fold"></i>
      <span>收起</span>
    </div>
    <el-scrollbar
        class="menu_list"
        :key="$store.getters.screenHeight"
        :style="{width: (isCollapse ? 64 : 200) + 'px'}">
      <el-menu :default-active="activeIndex" :collapse-transition="false" :collapse="isCollapse">
        <el-menu-item
            v-for="(item, index) in menuList"
            :index="String(index)"
            :key="index"
            @click="$router.push({path: item.path})">
          <i :class="item.icon"></i>
          <span slot="title" v-text="item.title"></span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  export default {
    name: "LeftMenu",
    data() {
      return {
        isCollapse: false,
        activeIndex: '0',
        menuList: [{
          title: '热点页面',
          icon: 'el-icon-data-line',
          path: '/admin/hot-pages'
        }, {
          title: '用户管理',
          icon: 'el-icon-user-solid',
          path: '/admin/user-manage'
        }, {
          title: '项目管理',
          icon: 'el-icon-menu',
          path: '/admin/project-manage'
        }, {
          title: '客户端设置',
          icon: 'el-icon-setting',
          path: '/admin/client-settings'
        }]
      };
    },
    watch: {
      $route(to) {
        this.updateMenuIndex(to.path);
      }
    },
    mounted() {
      this.updateMenuIndex(this.$route.path);
    },
    methods: {
      // 菜单展开收起
      menuSwitch() {
        this.isCollapse = !this.isCollapse;
      },
      // 更新菜单选中项
      updateMenuIndex(path) {
        const index = this.menuList.findIndex(item => {
          return item.path === path;
        });
        this.activeIndex = String(index);
      }
    }
  }
</script>

<style lang="scss" scoped>

  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .left_menu {
    background-color: #FFF;
    border-right: none;

    .menu_list {
      height: calc(100vh - 110px);

      .el-menu {
        border-right: none;
      }
    }

    .menu_switch {
      color: #303133;
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      border-bottom: 2px #F2F2F2 solid;
      cursor: pointer;

      i {
        margin-left: 3px;
        font-size: 18px;
      }

      span {
        margin-left: 8px;
        font-size: 14px;
      }
    }

    .menu_switch:hover {
      background-color: $--color-plain-hover;
    }
  }
</style>
