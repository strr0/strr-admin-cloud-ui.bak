<template>
  <div>
    <div style="display: flex; justify-content: space-between; margin-top: 10px">
      <div>
        <el-input v-model="keyword" clearable prefix-icon="el-icon-search" style="width: 350px; margin-right: 10px" />
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
    </div>
    <!--  用户列表  -->
    <div style="margin-top: 10px">
      <el-table :data="matchServerList" stripe border v-loading="loading" style="width: 100%"
        highlight-current-row @current-change="selectCurrentRow">
        <el-table-column type="selection" />
        <el-table-column prop="predicate" label="Predicate" />
        <el-table-column label="Metadata">
          <template slot-scope="scope">
            <span>{{ scope.row.metadata }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="route_id" label="RouteId" />
        <!-- <el-table-column prop="filters" label="Filters" /> -->
        <el-table-column prop="uri" label="Uri" />
        <el-table-column prop="order" label="Order" />
      </el-table>
    </div>
  </div>
</template>

<script>
  import {
    listServer
  } from '../../../apis/admin'

  export default {
    name: 'Server',
    data() {
      return {
        loading: false,
        keyword: null,
        btnList: [],
        serverList: [],
        matchServerList: []
      }
    },
    mounted() {
      this.initBtn()
      this.initServer()
    },
    methods: {
      handler(func) {
        this[func]()
      },
      selectCurrentRow(val) {
        this.currentRow = val
      },
      initBtn() {
        this.btnList = this.$route.meta.buttons || []
      },
      search() {
        if (this.keyword) {
          this.matchServerList = this.serverList.filter(item => item.predicate && item.predicate.includes(this.keyword))
        } else {
          this.matchServerList = this.serverList
        }
      },
      initServer() {
        this.keyword = null
        listServer().then(resp => {
          this.loading = false
          this.serverList = resp
          this.search()
        })
      }
    }
  }
</script>