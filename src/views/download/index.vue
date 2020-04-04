<template>
  <div class="download">
    <navigation-bar/>
    <el-scrollbar :key="$store.getters.screenHeight">
      <div style="padding: 15px 20px">
        <div class="content">
          <div class="header">客户端下载</div>
          <div class="body" :style="{height: boxHeight}">
            <div class="title">一、客户端常见问题解答</div>
            <div class="qa">
              <p>1、客户端的功能是什么？</p>
              <div class="answer"><p>实时同步局域网的IP地址，解决路由器动态分配IP后，找不到项目访问地址的问题。</p></div>
              <p>2、下载客户端，为什么需要填写<span class="emp">昵称</span>和<span class="emp">授权码</span>？</p>
              <div class="answer">
                <p>昵称信息在客户端同步内网IP时，用来标识身份信息。（昵称建议填写姓名即可）</p>
                <p>授权码是用来保护昵称信息的，第一次下载，授权码由用户自定义，以后下载该昵称的客户端，将会校验授权码是否正确。</p>
              </div>
              <p>3、客户端程序如何使用？</p>
              <div class="answer">
                <p>客户端是绿色免安装的Windows可执行文件，双击即可打开，没有界面，无感运行，不影响你的其他工作。</p>
                <p>建议将客户端程序放在Windows的开机自启动文件夹，每次开机自动帮你更新局域网IP地址。</p>
                <p>Windows开机自启动文件夹：<span class="emp">C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp</span>
                </p>
              </div>
            </div>
            <div class="title">二、客户端下载</div>
            <el-form class="form" :model="form" :rules="rules" ref="form" label-width="100px">
              <el-form-item label="昵称" prop="nickname">
                <el-input v-model="form.nickname" placeholder="建议填写姓名，方便大家识别"></el-input>
              </el-form-item>
              <el-form-item label="授权码" prop="authCode">
                <el-input v-model="form.authCode" show-password placeholder="第一次自定义"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :disabled="$store.getters.loading" @click="downloadClick">立即下载</el-button>
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
  import {download} from '@/api/download'
  import FileSaver from 'file-saver'

  export default {
    components: {
      NavigationBar
    },
    data() {
      // 检验昵称
      const validateNickname = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(' '));
        } else if (/^[\u4E00-\u9FA5A-Za-z0-9]{1,10}$/.test(value)
          && value.replace(/([\u4E00-\u9FA5]+?)/g, 'aa').length <= 10) {
          callback();
        } else {
          callback(new Error('数字、字母或汉字的组合，最大长度 10 个字符，1 个汉字代表 2 个字符'));
        }
      };
      // 校验授权码
      const validateAuthCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(' '));
        } else if(/^[A-Za-z0-9]{1,10}$/.test(value)) {
          callback();
        } else {
          callback(new Error('数字或字母的组合，最大长度 10 个字符'));
        }
      };
      return {
        form: {
          nickname: '',
          authCode: ''
        },
        rules: {
          nickname: [
            {required: true, message: ' ', trigger: 'change'},
            {validator: validateNickname, trigger: 'change'}
          ],
          authCode: [
            {required: true, message: ' ', trigger: 'change'},
            {validator: validateAuthCode, trigger: 'change'}
          ]
        }
      }
    },
    computed: {
      boxHeight: function () {
        return (this.$store.getters.screenHeight < 872
          ? 714
          : this.$store.getters.screenHeight - 160) + 'px';
      }
    },
    methods: {
      downloadClick() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.$alert('客户端中将会写入你的昵称信息，请不要发送给他人使用，以免他人的IP信息更新到你的名下，造成数据错乱', '下载提示', {
              confirmButtonText: '朕知道了，现在下载',
              type: 'warning',
              callback: () => {
                download(this.form).then(response => {
                  const blob = new Blob([response.data], {
                    type: response.headers['content-type']
                  });
                  FileSaver.saveAs(blob, 'site-guide.exe');
                });
              }
            });
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

  .download {

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

          .qa {
            background-color: #F2F2F2;
            margin: 15px 0;
            padding: 5px 20px;
            border-radius: 4px;

            .answer {
              padding-left: 28px;
            }

            p {
              font-size: 18px;
            }

            span {
              color: $--color-danger;
            }
          }

          .form {
            margin-top: 22px;
            max-width: 520px;
          }
        }
      }
    }
  }
</style>
