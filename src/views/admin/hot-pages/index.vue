<template>
  <div class="hot-pages">
    <el-card class="box-card" shadow="never">
      <div slot="header">热点页面</div>
      <div class="opt clear-float">
        <el-button-group class="fl">
          <el-button @click="handleAdd" type="primary" size="small" icon="el-icon-plus">新增</el-button>
          <el-button @click="handleBatchDel" type="primary" size="small" icon="el-icon-delete">删除</el-button>
        </el-button-group>
        <el-input
            placeholder="页面名称 / 备注"
            :clearable="true"
            @input="search(1)"
            size="small"
            v-model="queryParams.keyword"
            class="fr">
          <el-button slot="append" @click="search(1)" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table ref="table" :data="tableData" border height="calc(100vh - 230px)">
        <el-table-column
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
            prop="name"
            min-width="200"
            label="页面名称">
        </el-table-column>
        <el-table-column
            min-width="320"
            label="访问地址">
          <template slot-scope="scope">
            <a class="url" :href="scope.row.url" target="_blank">{{ scope.row.url }}</a>
          </template>
        </el-table-column>
        <el-table-column
            prop="remark"
            width="150"
            label="备注">
        </el-table-column>
        <el-table-column
            prop="type"
            width="90"
            align="center"
            label="首页展示">
          <template slot-scope="scope">
            <el-switch
                v-model="scope.row.status"
                @change="homePageShow(scope.row)"
                :active-value="0"
                :inactive-value="1">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
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
        :title="(form.id ? '修改' : '新增') + '热点页面'"
        @open="openDialog"
        :visible.sync="dialogVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="页面名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="访问地址" prop="url">
          <el-input
              type="textarea"
              :rows="3"
              @change="formatUrl"
              v-model="form.url"
              placeholder="如：http://192.168.150:8080/index.html"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sequence">
          <el-input-number v-model="form.sequence" :min="1" :max="maxSequence"></el-input-number>
          <el-button style="margin-left: 10px" type="primary" plain @click="form.sequence = 1">置顶</el-button>
        </el-form-item>
        <el-form-item label="首页展示" prop="status">
          <el-switch v-model="form.status" :active-value="0" :inactive-value="1"></el-switch>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
              type="textarea"
              :rows="3"
              v-model="form.remark"
              placeholder="如：晚风习习的页面"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="$store.getters.loading" @click="save">保存</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </my-dialog>
  </div>
</template>

<script>
  import MyDialog from '@/components/MyDialog'
  import {parseUri} from '@/utils/common'
  import * as apis from '@/api/admin/hot-pages'

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
          keyword: ''
        },
        emptyForm: {
          id: '',
          name: '',
          url: '',
          sequence: 1,
          status: 0,
          remark: ''
        },
        form: {},
        rules: {
          name: [
            {required: true, message: ' ', trigger: 'blur'},
            {max: 50, message: '最大长度 50 个字符', trigger: 'blur'}
          ],
          url: [
            {required: true, message: ' ', trigger: 'blur'},
            {max: 500, message: '最大长度 500 个字符', trigger: 'blur'}
          ],
          remark: [
            {max: 50, message: '最大长度 50 个字符', trigger: 'blur'}
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
          this.form.url = uri.source.replace(new RegExp(uri.host), 'localhost');
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
            apis['saveHotPages'](this.form).then(({msg}) => {
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
          apis['delHotPages'](data).then(({msg}) => {
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
        apis['saveHotPages'](row).then(() => {
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
        apis['listHotPages'](this.queryParams).then(({data}) => {
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

  .hot-pages {

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
