<template>
  <el-container>
    <template v-if="item && item.children">
      <el-aside style="background: #ececec">
        <el-menu :default-active="sidebarActive" ref="bar" router>
          <s-sidebar :items="item.children" />
        </el-menu>
      </el-aside>
    </template>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>{{ item ? item.name : '' }}</el-breadcrumb-item>
        <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
      </el-breadcrumb>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import SSidebar from '../s-sidebar'
export default {
  name: 'SMain',
  components: { SSidebar },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    sidebarActive: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>

</style>