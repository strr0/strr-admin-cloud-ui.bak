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
    <!--  用户列表  -->
    <div style="margin-top: 10px">
      <el-table :data="userList" stripe border v-loading="loading" style="width: 100%"
        highlight-current-row @current-change="selectCurrentRow">
        <el-table-column type="selection" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="avatar" label="用户头像" />
        <el-table-column prop="remark" label="描述" />
        <el-table-column prop="loginTime" label="登录时间" />
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
    <!--  查看  -->
    <user-show :user="user" :showModalVisible="showModalVisible" @cancel="showModalVisible = false" />
    <!--  添加/修改  -->
    <user-edit :user="user" :editModalVisible="editModalVisible" @cancel="editModalVisible = false" @refresh="initUser" />
  </div>
</template>

<script>
  import {
    pageUser,
    removeUser
  } from '../../../apis/admin'
  import UserShow from './components/show.vue'
  import UserEdit from './components/edit.vue'

  export default {
    name: 'User',
    components: { UserShow, UserEdit },
    data() {
      return {
        loading: false,
        keyword: null,
        page: 0,
        size: 10,
        total: 0,
        btnList: [],
        userList: [],
        showModalVisible: false,
        editModalVisible: false,
        user: {
          username: '',
          //password: '',
          nickname: '',
          email: '',
          avatar: '',
          remark: '',
          status: false
        }
      }
    },
    mounted() {
      this.initBtn()
      this.initUser()
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
        this.initUser()
      },
      initBtn() {
        this.btnList = this.$route.meta || []
      },
      search() {
        this.loading = true
        pageUser({
          nickname: this.keyword,
          page: this.page,
          size: this.size
        }).then(resp => {
          this.loading = false
          if(resp) {
            this.userList = resp.content
            this.total = resp.total
          }
        })
      },
      initUser() {
        this.keyword = null
        this.search()
      },
      empty() {
        this.user = {
          username: '',
          //password: '',
          nickname: '',
          email: '',
          avatar: '',
          remark: '',
          status: false
        }
      },
      //查看
      show() {
        if (this.currentRow == null) {
          this.$message({
            message: '请选择一项',
            type: 'warning'
          })
          return
        }
        this.user = this.currentRow
        this.showModalVisible = true
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
        this.user = this.currentRow
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
          removeUser(this.currentRow.id).then((resp) => {
            if (resp) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.initUser()
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