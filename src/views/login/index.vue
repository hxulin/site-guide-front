<template>
  <div class="login">
    <navigation-bar/>
    <el-scrollbar :key="$store.getters.screenHeight">
      <div style="position: relative">
        <div class="content">
          <div class="header">Doorplate 是一个私有服务，请输入口令</div>
          <div class="body">
            <div class="title">口令提示：公司名称拼音首字母小写</div>
            <el-form ref="form" :model="form" :rules="rules" @submit.native.prevent class="form" label-width="0">
              <el-form-item prop="password">
                <el-input
                    v-model="form.password"
                    show-password
                    placeholder="请输入口令"
                    @keyup.enter.native.prevent="handleLogin"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                    type="primary"
                    :disabled="$store.getters.loading"
                    @click="handleLogin">登录</el-button>
              </el-form-item>
            </el-form>
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
        form: {
          password: ''
        },
        rules: {
          password: [
            {required: true, message: ' ', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      // 登录
      handleLogin() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.$store.dispatch('login', this.form.password)
              .then(() => this.$router.push({path: this.$route.query.redirect || '/'}));
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .el-button {
    width: 100%;
  }

  .login {

    .el-scrollbar {
      height: calc(100vh - 60px);

      .content {

        .header {
          background-color: #F5F7FA;
          border-bottom: 1px solid #E4E7ED;
          font-size: 22px;
          padding: 20px;
        }

        .body {
          padding: 20px;

          .title {
            font-size: 16px;
            margin-bottom: 18px;
            color: #606266;
          }

          .form {
            max-width: 320px;
          }
        }
      }
    }
  }
</style>
