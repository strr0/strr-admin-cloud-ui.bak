<template>
  <div>
    <div style="display: flex; justify-content: space-between; margin-top: 10px">
      <div>
        <el-input v-model="keyword" clearable prefix-icon="el-icon-search" style="width: 350px; margin-right: 10px" />
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
      <div>
        <el-button v-for="item in btnList" :key="item.id" :type="item.color" :icon="item.icon" @click="handler(item.name)">
          {{ item.title }}
        </el-button>
      </div>
    </div>
    <!--  角色列表  -->
    <div style="margin-top: 10px">
      <el-table :data="roleList" stripe border v-loading="loading" style="width: 100%"
        highlight-current-row @current-change="selectCurrentRow">
        <el-table-column type="selection" />
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="title" label="角色描述" />
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
        @current-change="pageChange"
        layout="prev, pager, next, total"
        :total="total" />
    </div>
    <!--  添加/修改  -->
    <role-edit :role="role" :editModalVisible="editModalVisible" @cancel="editModalVisible = false" @refresh="initRole" />
    <!--  权限控制  -->
    <role-alloc :role="role" :allocModalVisible="allocModalVisible" @cancel="allocModalVisible = false" />
  </div>
</template>

<script>
  import {
    pageRole,
    removeRole
  } from '../../../apis/admin'
  import RoleAlloc from './components/alloc.vue'
  import RoleEdit from './components/edit.vue'

  export default {
    name: 'Role',
    components: { RoleEdit, RoleAlloc },
    data() {
      return {
        loading: false,
        keyword: null,
        page: 0,
        size: 10,
        total: 0,
        btnList: [],
        roleList: [],
        //添加修改角色
        editModalVisible: false,
        allocModalVisible: false,
        role: {
          name: '',
          title: '',
          status: false
        }
      }
    },
    mounted() {
      this.initBtn()
      this.initRole()
    },
    methods: {
      handler(name) {
        this[name]()
      },
      selectCurrentRow(val) {
        this.currentRow = val
      },
      pageChange(page) {
        this.page = page - 1
        this.initUser();
      },
      initBtn() {
        this.btnList = this.$route.meta || []
      },
      search() {
        this.loading = true
        pageRole({
          title: this.keyword,
          page: this.page,
          size: this.size
        }).then(resp => {
          this.loading = false
          if(resp) {
            this.roleList = resp.content
            this.total = resp.total
          }
        })
      },
      initRole() {
        this.keyword = null
        this.search()
      },
      empty() {
        this.role = {
          name: '',
          title: '',
          status: false
        }
      },
      //权限控制
      alloc() {
        if (this.currentRow == null) {
          this.$message({
            message: '请选择一项',
            type: 'warning'
          })
          return
        }
        this.role = this.currentRow
        this.allocModalVisible = true
      },
      //添加
      add() {
        this.empty()
        this.editModalVisible = true
      },
      //修改
      edit() {
        if (this.currentRow == null) {
          this.$message({
            message: '请选择一项',
            type: 'warning'
          })
          return
        }
        this.role = this.currentRow
        this.editModalVisible = true
      },
      //删除
      del() {
        if (this.currentRow == null) {
          this.$message({
            message: '请选择一项',
            type: 'warning'
          })
          return
        }
        this.$confirm('此操作将永久删除此项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeRole(this.currentRow.id).then((resp) => {
            if (resp) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.initRole()
            }
          })
        }).catch(() => {
          this.$message({
            message: '已取消',
            type: 'info'
          })
        })
      }
    }
  }
</script>