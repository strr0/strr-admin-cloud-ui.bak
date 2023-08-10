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
    <!--  应用列表  -->
    <div style="margin-top: 10px">
      <el-table :data="propertiesList" stripe border v-loading="loading" style="width: 100%"
        highlight-current-row @current-change="selectCurrentRow">
        <el-table-column type="selection" />
        <el-table-column prop="application" label="应用" />
        <el-table-column prop="profile" label="环境" />
      </el-table>
    </div>
  </div>
</template>

<script>
  import {
    listApplication
  } from '../../../apis/admin'

  export default {
    name: 'Properties',
    data() {
      return {
        loading: false,
        keyword: null,
        btnList: [],
        propertiesList: []
      }
    },
    mounted() {
      this.initBtn()
      this.initProperties()
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
        listApplication({
          application: this.keyword
        }).then(resp => {
          this.loading = false
          if(resp) {
            this.propertiesList = resp.data
          }
        })
      },
      initProperties() {
        this.keyword = null
        this.search()
      },
      //添加
      add() {
        this.empty()
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