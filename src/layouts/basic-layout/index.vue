<template>
  <el-container class="home">
    <el-header class="header">
      <el-row>
        <el-col :span="22">
          <s-navbar :items="menus" :active="active" @showSub="showSub" />
        </el-col>
        <el-col :span="2">
          <el-dropdown class="settings" @command='commandHandler'>
            <span>
              <div class="settings-menu">
                <div class="settings-menu-item settings-p8">
                  <el-avatar>{{ username || 'unknown' }}</el-avatar>
                </div>
                <div class="settings-menu-item settings-h60">
                  <span>{{ username || '未登录' }}</span>
                  <i class="el-icon-arrow-down el-icon--right home_userinfo" />
                </div>
              </div>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>系统消息</el-dropdown-item>
              <el-dropdown-item>我的文章</el-dropdown-item>
              <el-dropdown-item>个人主页</el-dropdown-item>
              <el-dropdown-item command='logout' divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <s-main :item="currentMenu" :sidebarActive="sidebarActive" />
    </el-container>
  </el-container>
</template>

<script>
import SNavbar from '../components/s-navbar'
import SMain from '../components/s-main'
import { securityLogout } from '../../apis/auth'
import { setCookie, getCookie } from '../../utils/auth'
import { getDefaultMenu } from '../../utils/menu'

export default {
  name: 'BasicLayout',
  components: { SNavbar, SMain },
  data() {
    return {
      menus: [],
      currentMenu: null,
      active: null,
      sidebarActive: null,
      username: ''
    }
  },
  watch: {
    '$store.state.menus': {
      handler (newV) {
        this.menus = newV
        // 默认勾选第一个一级菜单
        if (newV.length > 0) {
          this.active = '0'
          this.currentMenu = newV[0]
          // 获取第一个子菜单
          let defaultMenu = getDefaultMenu(newV[0])
          if (defaultMenu.type == '1') {
            this.sidebarActive = defaultMenu.id + ''
            this.$router.push({ path: defaultMenu.path })
          }
        }
      },
      deep: true,
      // immediate: true
    }
  },
  mounted() {
    this.username = getCookie('user')
  },
  methods: {
    showSub(item) {
      this.currentMenu = item
    },
    commandHandler(cmd) {
      switch(cmd) {
        case 'logout':
          this.$confirm('是否注销登录', '提醒', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            securityLogout().then(resp => {
              if (resp && resp.success) {
                this.$message({
                  message: '已注销登录',
                  type: 'success'
                })
                setCookie('user', '')
                this.$store.commit('logout')
                this.$router.replace('/')
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
          break
        default:
          break
      }
    }
  }
}
</script>

<style scoped>
.home {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}
.header {
  padding: 0;
  background: #545c64;
}
.settings {
  height: 60px;
  /* line-height: 60px; */
  margin: 0;
  font-size: 14px;
  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;
  color: #fff;
}
.settings-menu {
  overflow: hidden;
}
.settings-menu-item {
  float: left;
}
.settings-h60 {
  line-height: 60px;
}
.settings-p8 {
  padding: 8px;
}
</style>