<template>
  <div>
    <template v-for="(item, index) in items">
      <el-submenu :key="index" :index="index+''" v-if="item.children && item.children.length > 0">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{ item.title }}</span>
        </template>
        <s-sidebar :items="item.children" class="nest-menu" />
      </el-submenu>
      <el-menu-item :key="index" :index="index+''" :route="{path: item.path}" v-else>
        <i class="el-icon-setting"></i>
        <span>{{ item.title }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SSidebar',
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    items: {
      handler (newV) {
        // 切换菜单勾选第一个二级菜单
        if (newV && newV.length > 0) {
          this.$router.push({path: newV[0].path})
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>