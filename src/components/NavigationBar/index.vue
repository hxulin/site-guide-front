<template>
  <div class="navigation-bar">
    <div class="logo">
      <svg-icon icon-class="logo"/>
      <h1>Doorplate - 内网导航从这里开始</h1>
    </div>
    <el-menu mode="horizontal">
      <el-menu-item
          v-for="(item, index) in this.dynamicMenuList"
          :class="{selected: menuIndex===index}"
          :key="index">
        <router-link :to="item.path">{{ item.text }}</router-link>
      </el-menu-item>
      <el-menu-item>
        <el-tooltip effect="dark" content="主题换肤" placement="bottom-start">
          <theme-picker/>
        </el-tooltip>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import ThemePicker from '../ThemePicker'

  export default {
    name: "NavigationBar",
    components: {
      ThemePicker
    },
    data() {
      const menuList = [{
        path: '/home',
        text: '主页'
      }, {
        path: '/download',
        text: '下载'
      }, {
        path: '/about',
        text: '关于'
      }, {
        path: '/admin/hot-pages',
        text: '管理'
      }];
      return {
        activeIndex: '0',
        menuList: {
          default: [],
          user: menuList,
          admin: menuList
        }
      }
    },
    computed: {
      menuIndex() {
        return this.$store.getters.currentMenuIndex;
      },
      dynamicMenuList() {
        return this.menuList[this.$store.getters.userGroup];
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navigation-bar {
    display: flex;
    justify-content: space-between;
    background-color: $--color-primary;
    padding: 0 10px;
    height: 60px;
    line-height: 60px;

    .logo {

      .svg-icon {
        color: $--color-primary;
        font-size: 40px;
        position: relative;
        top: 9px;
      }

      h1 {
        margin: 0 0 0 10px;
        padding: 0;
        display: inline-block;
        text-align: center;
        font-size: 16px;
        color: #FFF;
      }
    }

    .el-menu.el-menu--horizontal {
      border-bottom: none;
    }

    .el-menu {
      background-color: $--color-primary;
    }

    .el-menu--horizontal > .el-menu-item {
      color: #FFF;
      font-weight: bold;
      font-size: 16px;
      padding: 0;
      margin: 0 20px;

      &:last-child {
        margin-right: 0;
      }

      &:not(.is-disabled):hover, &:not(.is-disabled):focus {
        background-color: $--color-primary;
      }

      &.is-active {
        border-color: $--color-primary;
      }

      &.selected:after {
        position: absolute;
        content: "";
        left: 50%;
        bottom: 7px;
        border: 3px solid #FFF;
        transform: translateX(-50%);
        border-radius: 50%;
      }

      a {
        display: block;
        padding: 0 20px;
      }
    }
  }
</style>
