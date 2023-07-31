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
    <!--  权限列表  -->
    <div style="margin-top: 10px">
      <el-table :data="authorityList" stripe border v-loading="loading" style="width: 100%"
        row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" default-expand-all
        highlight-current-row @current-change="selectCurrentRow">
        <el-table-column type="selection" width="50" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="path" label="路由地址" />
        <el-table-column prop="url" label="组件路径" />
        <el-table-column label="图标">
          <template slot-scope="scope">
            <i :class="scope.row.icon" />
          </template>
        </el-table-column>
        <!-- <el-table-column prop="parentId" label="父菜单" /> -->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--  查看  -->
    <authority-show :authority="authority" :showModalVisible="showModalVisible" @cancel="showModalVisible = false" />
    <!--  添加/修改  -->
    <authority-edit :authority="authority" :editModalVisible="editModalVisible" @cancel="editModalVisible = false" @refresh="initAuthority" />
  </div>
</template>

<script>
  import {
    listAuthority,
    deleteAuthority
  } from '../../../apis/admin'
  import AuthorityShow from './components/show.vue'
  import AuthorityEdit from './components/edit.vue'

  export default {
    name: 'Authority',
    components: { AuthorityShow, AuthorityEdit },
    data() {
      return {
        loading: false,
        keyword: null,
        btnList: [],
        authorityList: [],
        showModalVisible: false,
        editModalVisible: false,
        authority: {
          name: '',
          title: '',
          url: '',
          path: '',
          color: '',
          icon: '',
          type: '',
          parentId: '',
          status: 0
        }
      }
    },
    mounted() {
      this.initBtn()
      this.initAuthority()
    },
    methods: {
      handler(name) {
        this[name]()
      },
      selectCurrentRow(val) {
        this.currentRow = val
      },
      initBtn() {
        this.btnList = this.$route.meta || []
      },
      search() {
        this.loading = true
        listAuthority({
          title: this.keyword
        }).then(resp => {
          this.loading = false
          if(resp && resp.success) {
            this.authorityList = resp.data
            this.currentRow = null
          }
        })
      },
      initAuthority() {
        this.keyword = null
        this.search()
      },
      empty() {
        this.authority = {
          name: '',
          title: '',
          url: '',
          path: '',
          color: '',
          icon: '',
          type: '',
          parentId: 0,
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
        this.authority = this.currentRow
        this.showModalVisible = true
      },
      //添加
      add() {
        this.empty()
        if (this.currentRow != null) {
          if (this.currentRow.type == '3') {
            this.$message({
              message: '请选择菜单',
              type: 'warning'
            })
            return
          }
          this.authority.parentId = this.currentRow.id
          this.authority.parentTitle = this.currentRow.title
        } else {
          this.authority.parentTitle = ''
        }
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
        this.authority = this.currentRow
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
          deleteAuthority(this.currentRow.id).then((resp) => {
            if (resp && resp.success) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.initAuthority()
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

<style scoped>
.span-l {
  float: left;
}
.span-r {
  float: right;
}
</style>