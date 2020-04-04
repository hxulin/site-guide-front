<template>
  <div class="client-settings">
    <el-card class="box-card" shadow="never">
      <div slot="header">客户端设置</div>
      <el-form :model="form" :rules="rules" ref="form">
        <ul>
          <li class="dns">
            <div class="label">客户端DNS地址设置</div>
            <el-form-item prop="localDnsAddress">
              <el-input
                  :disabled="!$store.getters.adminMode"
                  v-model="form.localDnsAddress"
                  placeholder="请输入DNS地址，如：192.168.1.1"></el-input>
            </el-form-item>
            <div class="explain">客户端DNS地址是客户端所在的局域网的网关地址，用于指导客户端寻找正确的内网IP地址。</div>
          </li>
          <li class="time">
            <div class="label">客户端同步IP频率<span v-text="text"></span></div>
            <div class="slider_box">
              <el-slider
                  :disabled="!$store.getters.adminMode"
                  @change="timeChange"
                  v-model="timeRange"
                  :format-tooltip="formatTooltip"
                  range :min="1" :max="720">
              </el-slider>
              <el-tooltip effect="dark" content="3 小时 ~ 6 小时 30 分钟" placement="bottom-end">
                <el-button
                    :disabled="!$store.getters.adminMode"
                    @click="setDefaultVal" plain size="small">默认值</el-button>
              </el-tooltip>
            </div>
            <div class="explain">该设置项用来指定客户端多长时间更新一次IP信息，客户端更新IP的频率会在当前设定的时间内取一个随机值。</div>
          </li>
        </ul>
        <el-button
            v-if="$store.getters.adminMode"
            :disabled="$store.getters.loading"
            @click="saveConf"
            style="margin-top: 20px"
            type="primary">保存</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {fetchClientConf, saveClientConf} from '@/api/admin/client-settings'

  export default {
    data() {
      const validateIpAddress = (rule, value, callback) => {
        if (/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(value)) {
          callback();
        } else {
          callback(new Error('DNS地址格式错误'));
        }
      };
      return {
        form: {
          localDnsAddress: '',
          minTime: '',
          maxTime: ''
        },
        timeRange: [null, null],
        rules: {
          localDnsAddress: [
            {required: true, message: ' ', trigger: 'blur'},
            {validator: validateIpAddress, trigger: 'blur'}
          ]
        },
        text: ''
      }
    },
    mounted() {
      fetchClientConf().then(({data}) => {
        this.form.localDnsAddress = data.localDnsAddress;
        this.timeRange = [data.minTime, data.maxTime];
        this.timeChange(this.timeRange);
      });
    },
    methods: {
      // 滑块时间格式化
      formatTooltip(val) {
        if (val) {
          let text = '';
          const hour = Math.floor(val / 60);
          if (hour > 0) {
            text += `${hour} 小时`;
            if (val % 60 !== 0) {
              text += ` ${val % 60} 分钟`;
            }
          } else {
            text = `${val} 分钟`;
          }
          return text;
        }
        return '';
      },
      // 滑块数据改变事件
      timeChange(arr) {
        const start = this.formatTooltip(arr[0]);
        const end = this.formatTooltip(arr[1]);
        this.text = `（${start} ~ ${end}）`;
      },
      // 设置默认值
      setDefaultVal() {
        this.timeRange = [180, 390];
        this.timeChange(this.timeRange);
      },
      // 保存配置信息
      saveConf() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.form.minTime = this.timeRange[0] || 180;
            this.form.maxTime = this.timeRange[1] || 390;
            saveClientConf(this.form).then(({msg}) => {
              this.$message({
                message: msg,
                type: 'success'
              });
            });
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .client-settings {

    /deep/ .el-card__header {
      padding: 10px;
      font-size: 18px;
      font-weight: bold;
    }

    /deep/ .el-card__body {
      padding: 10px;
      height: calc(100vh - 130px);

      ul {

        li {
          border-bottom: 1px solid $--border-color-light;

          .label {
            font-weight: bold;
            margin-bottom: 12px;
          }

          .explain {
            font-size: 14px;
            color: #606266;
          }
        }

        .dns {
          padding: 10px 0 50px 0;
        }

        .time {
          padding: 30px 0;

          .slider_box {
            display: flex;
            justify-content: space-between;

            .el-slider {
              flex: 1;
              padding: 0 20px 0 8px;
              margin-bottom: 8px;
            }

            .el-button {
              height: 32px;
              margin-top: 3px;
            }
          }
        }
      }
    }
  }
</style>
