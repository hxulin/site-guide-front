<template>
  <div class="project-manage">
    <el-card class="box-card" shadow="never">
      <div slot="header">项目管理</div>
      <div class="opt clear-float">
        <el-button-group class="fl" v-if="$store.getters.adminMode">
          <el-button @click="handleAdd" type="primary" size="small" icon="el-icon-plus">新增</el-button>
          <el-button @click="handleBatchDel" type="primary" size="small" icon="el-icon-delete">删除</el-button>
        </el-button-group>
        <el-input
            placeholder="请输入项目名称关键字"
            :clearable="true"
            @input="search(1)"
            size="small"
            v-model="queryParams.name"
            class="fr">
          <el-select
              v-model="queryParams.type"
              @change="search(1)"
              clearable slot="prepend" placeholder="请选择" value="">
            <el-option label="前端" value="0"></el-option>
            <el-option label="后端" value="1"></el-option>
          </el-select>
          <el-button slot="append" @click="search(1)" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table ref="table" :data="tableData" border height="calc(100vh - 230px)">
        <el-table-column
            v-if="$store.getters.adminMode"
            type="selection"
            align="center"
            width="50">
        </el-table-column>
        <el-table-column label="序号" width="80" align="center">
          <template slot-scope="scope">
            {{ (queryParams.currentPage - 1) * queryParams.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
            prop="type"
            width="90"
            align="center"
            label="分类">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 0" style="color: #FE671C; font-weight: bold">前端</span>
            <span v-else-if="scope.row.type === 1" style="color: #07C160; font-weight: bold">后端</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="name"
            min-width="240"
            label="项目名称">
        </el-table-column>
        <el-table-column
            min-width="360"
            label="入口地址">
          <template slot-scope="scope">
            <a class="url" :href="scope.row.entranceUrl" target="_blank">{{ scope.row.entranceUrl }}</a>
          </template>
        </el-table-column>
        <el-table-column
            prop="type"
            width="90"
            align="center"
            label="首页展示">
          <template slot-scope="scope">
            <el-switch
                :disabled="!$store.getters.adminMode"
                v-model="scope.row.status"
                @change="homePageShow(scope.row)"
                :active-value="0"
                :inactive-value="1">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
            v-if="$store.getters.adminMode"
            label="操作"
            align="center"
            width="160">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.row)">修改
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDel(scope.row)">删除
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
        width="1024px"
        height="576px"
        :title="(form.id ? '修改' : '新增') + '项目'"
        @open="openDialog"
        :visible.sync="dialogVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="入口地址" prop="entranceUrl">
          <el-input
              type="textarea"
              :rows="3"
              @change="formatUrl"
              v-model="form.entranceUrl"
              placeholder="如：http://192.168.150:8080/index.html"></el-input>
        </el-form-item>
        <el-form-item label="项目类别" prop="type">
          <el-select v-model="form.type" clearable placeholder="请选择" value="">
            <el-option label="前端" :value="0"></el-option>
            <el-option label="后端" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sequence">
          <el-input-number v-model="form.sequence" :min="1" :max="maxSequence"></el-input-number>
          <el-button style="margin-left: 10px" type="primary" plain @click="form.sequence = 1">置顶</el-button>
        </el-form-item>
        <el-form-item label="首页展示" prop="status">
          <el-switch v-model="form.status" :active-value="0" :inactive-value="1"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </my-dialog>
  </div>
</template>

<script>
  import MyDialog from '@/components/MyDialog'
  import {parseUri} from '@/utils/common'
  import * as apis from '@/api/admin/project-manage'

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
          name: '',
          type: ''
        },
        emptyForm: {
          id: '',
          name: '',
          entranceUrl: '',
          type: 0,
          sequence: 1,
          status: 0
        },
        form: {},
        rules: {
          name: [
            {required: true, message: ' ', trigger: 'blur'},
            {max: 50, message: '最大长度 50 个字符', trigger: 'blur'}
          ],
          entranceUrl: [
            {required: true, message: ' ', trigger: 'blur'},
            {max: 500, message: '最大长度 500 个字符', trigger: 'blur'}
          ]
        },
        maxSequence: 1
      }
    },
    mounted() {
      this.search();
    },
    methods: {
      // 格式化用户输入的 URL
      formatUrl(val) {
        const uri = parseUri(val);
        if (uri && uri.host !== 'localhost') {
          this.form.entranceUrl = uri.source.replace(new RegExp(uri.host), 'localhost');
        }
      },
      // 初始化对话框
      openDialog() {
        // 查询最大序列号
        apis['queryMaxSequence']().then(({data}) => this.maxSequence
          = this.form.id ? data.maxSequence - 1 : data.maxSequence);
      },
      // 保存数据
      save() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            apis['saveProject'](this.form).then(({msg}) => {
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
        this.form = this.form.id
          ? {...this.tableData.find(item => {return item.id === this.form.id})}
          : {...this.emptyForm};
      },
      // 新增按钮事件
      handleAdd() {
        this.form = {...this.emptyForm};
        this.dialogVisible = true;
      },
      // 批量删除
      handleBatchDel() {
        if (this.$refs.table.selection.length > 0) {
          this.del(this.$refs.table.selection, '此操作将永久删除这些记录，是否继续？');
        }
      },
      // 单条记录删除
      handleDel(row) {
        this.del([row], '此操作将永久删除这条记录，是否继续？');
      },
      // 公共删除方法
      del(data, message) {
        this.$confirm(message, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          apis['delProject'](data).then(({msg}) => {
            this.search(this.queryParams.currentPage);
            this.$message({
              type: 'success',
              message: msg
            });
          });
        }).catch(() => {});
      },
      // 修改按钮事件
      handleEdit(row) {
        this.form = {...row};
        this.maxSequence = row.sequence;
        this.dialogVisible = true;
      },
      // 修改首页是否显示
      homePageShow(row) {
        apis['saveProject'](row).then(() => {
          this.$message({
            message: row.status ? '首页展示已关闭' : '首页展示已开启',
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
        apis['listProject'](this.queryParams).then(({data}) => {
          this.tableData = data.records;
          this.totalCount = data.total;
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  a.url {
    color: $--color-primary;

    &:hover {
      text-decoration: underline;
    }
  }

  .el-form-item .el-select {
    width: 260px;
  }

  .project-manage {

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
          max-width: 400px;

          .el-input-group__prepend {
            width: 100px;
            background-color: #FFF;
          }
        }
      }
    }
  }
</style>
