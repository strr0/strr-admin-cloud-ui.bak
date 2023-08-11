<template>
  <div>
    <div style="display: flex; justify-content: space-between; margin-top: 10px">
      <div>
        <el-input v-model="keyword" clearable prefix-icon="el-icon-search" style="width: 350px; margin-right: 10px" />
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
      <div>
        <el-button icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
    <!--  应用列表  -->
    <div style="margin-top: 10px">
      <el-table :data="propertiesList" stripe border v-loading="loading" style="width: 100%"
        highlight-current-row @current-change="selectCurrentRow">
        <el-table-column type="selection" />
        <el-table-column prop="application" label="应用" />
        <el-table-column prop="profile" label="环境" />
        <el-table-column label="键">
          <template slot-scope="scope">
            <el-input :value="scope.row.key" v-if="scope.row.editable" />
            <span v-else>{{ scope.row.key }}</span>
          </template>
        </el-table-column>
        <el-table-column label="键名称">
          <template slot-scope="scope">
            <el-input :value="scope.row.name" v-if="scope.row.editable" />
            <span v-else>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="值">
          <template slot-scope="scope">
            <el-input :value="scope.row.value" v-if="scope.row.editable" />
            <span v-else>{{ scope.row.value }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle plain @click="scope.row.editable = true"></el-button>
            <el-button type="success" icon="el-icon-check" circle plain @click="scope.row.editable = false"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle plain></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {
    listProperties
  } from '../../../../apis/admin'

  export default {
    name: 'PropertiesShow',
    data() {
      return {
        loading: false,
        application: null,
        keyword: null,
        btnList: [],
        propertiesList: []
      }
    },
    created() {
      this.application = this.$route.query.application
    },
    mounted() {
      this.initProperties()
    },
    methods: {
      handler(name) {
        this[name]()
      },
      selectCurrentRow(val) {
        this.currentRow = val
      },
      search() {
        this.loading = true
        listProperties({
          application: this.application
        }).then(resp => {
          this.loading = false
          if(resp) {
            this.propertiesList = resp.data.map(item => {
              return {
                ...item,
                editable: false
              }
            })
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