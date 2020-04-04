<template>
  <div class="user-manage">
    <el-card class="box-card" shadow="never">
      <div slot="header">用户管理</div>
      <div class="opt clear-float">
        <el-input
            @input="search(1)"
            clearable
            placeholder="请输入用户昵称关键字"
            size="small"
            v-model="queryParams.nickname"
            class="fr">
          <el-button slot="append" @click="search(1)" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table ref="table" :data="tableData" border height="calc(100vh - 230px)">
        <el-table-column label="序号" width="80" align="center">
          <template slot-scope="scope">
            {{ (queryParams.currentPage - 1) * queryParams.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
            prop="nickname"
            min-width="150"
            label="用户昵称">
        </el-table-column>
        <el-table-column
            min-width="180"
            label="客户端IP">
          <template slot-scope="scope">{{ scope.row.lanIp || '--' }}</template>
        </el-table-column>
        <el-table-column
            min-width="180"
            align="center"
            label="最近一次活跃时间">
          <template slot-scope="scope">{{ scope.row.lastUpdated || '--' }}</template>
        </el-table-column>
        <el-table-column
            min-width="120"
            align="center"
            label="注册时间">
          <template slot-scope="scope">{{ scope.row.createTime.substr(0, 10) }}</template>
        </el-table-column>
        <el-table-column
            prop="type"
            width="90"
            align="center"
            label="账号状态">
          <template slot-scope="scope">
            <el-switch
                v-model="scope.row.status"
                @change="freezeAccount(scope.row)"
                :disabled="!$store.getters.adminMode"
                :active-value="0"
                :inactive-value="1">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
            v-if="$store.getters.adminMode"
            label="操作"
            align="center"
            width="94">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.row)">修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="sizeChange"
          @current-change="search"
          :current-page="queryParams.currentPage"
          :page-sizes="[20, 30, 50]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
      </el-pagination>
    </el-card>
    <my-dialog
        width="512px"
        height="340px"
        title="修改用户信息"
        :visible.sync="dialogVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="form.nickname" disabled></el-input>
        </el-form-item>
        <el-form-item label="客户端IP" prop="lanIp">
          <el-input v-model="form.lanIp" clearable></el-input>
        </el-form-item>
        <el-form-item label="账号状态" prop="status">
          <el-switch v-model="form.status" :active-value="0" :inactive-value="1"></el-switch>
        </el-form-item>
        <el-form-item style="margin-bottom: 0">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </my-dialog>
  </div>
</template>

<script>
  import MyDialog from '@/components/MyDialog'
  import {saveUser, listUser} from '@/api/admin/user-manage'

  export default {
    components: {
      MyDialog
    },
    data() {
      return {
        dialogVisible: false,
        tableData: [],
        totalCount: 0,
        queryParams: {
          currentPage: 1,
          pageSize: 20,
          nickname: ''
        },
        form: {},
        rules: {
          lanIp: [
            {required: true, message: ' ', trigger: 'blur'},
            {max: 50, message: '最大长度 50 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      this.search();
    },
    methods: {
      // 保存数据
      save() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            saveUser(this.form).then(({msg}) => {
              this.search(this.queryParams.currentPage);
              this.dialogVisible = false;
              this.$message({
                message: msg,
                type: 'success'
              });
            });
          }
        });
      },
      // 重置
      reset() {
        this.form = {...this.tableData.find(item => {return item.id === this.form.id})};
      },
      // 修改按钮事件
      handleEdit(row) {
        this.form = {...row};
        this.dialogVisible = true;
      },
      // 冻结账号
      freezeAccount(row) {
        saveUser(row).then(() => {
          this.$message({
            message: row.status ? '账号已冻结' : '账号已启用',
            type: 'success'
          });
        }).catch(() => row.status = row.status === 0 ? 1 : 0);
      },
      sizeChange(pageSize) {
        this.queryParams.pageSize = pageSize;
        this.search(this.queryParams.currentPage);
      },
      search(currentPage) {
        this.queryParams.currentPage = currentPage ? currentPage : 1;
        listUser(this.queryParams).then(({data}) => {
          this.tableData = data.records;
          this.totalCount = data.total;
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .is-disabled /deep/ .el-input__inner {
    color: #606266;
  }


  .user-manage {

    /deep/ .el-card__header {
      padding: 10px;
      font-size: 18px;
      font-weight: bold;
    }

    /deep/ .el-card__body {
      padding: 10px;
      height: calc(100vh - 130px);

      .opt {
        margin-bottom: 10px;

        .fr {
          max-width: 300px;

          .el-input-group__prepend {
            width: 100px;
            background-color: #FFF;
          }
        }
      }
    }
  }
</style>
