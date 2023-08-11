<template>
  <el-container>
    <template v-if="item && item.children">
      <el-aside style="background: #ececec">
        <el-menu :default-active="$router.currentRoute.meta.id" ref="bar" router>
          <s-sidebar :items="item.children" />
        </el-menu>
      </el-aside>
    </template>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>{{ item ? item.title : '' }}</el-breadcrumb-item>
        <el-breadcrumb-item :key="index" v-for="(breadcrumb, index) in $router.currentRoute.meta.paths">{{ breadcrumb.title }}</el-breadcrumb-item>
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
    }
  }
}
</script>

<style scoped>

</style>