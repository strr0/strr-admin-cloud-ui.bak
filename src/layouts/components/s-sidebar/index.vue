<template>
  <div>
    <template v-for="item in items">
      <el-submenu :key="item.id" :index="item.id+''" v-if="item.children && item.children.length > 0">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{ item.title }}</span>
        </template>
        <s-sidebar :items="item.children" class="nest-menu" />
      </el-submenu>
      <el-menu-item :key="item.id" :index="item.id+''" :route="{path: item.path}" v-else-if="item.type == '1'">
        <i class="el-icon-setting"></i>
        <span>{{ item.title }}</span>
      </el-menu-item>
      <el-menu-item :key="item.id" :index="item.id+''" v-else>
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
  }
}
</script>