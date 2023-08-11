<template>
  <el-dialog :title="title" :visible.sync="showModalVisible" :before-close="close" width="60%">
    <el-descriptions :column="2" border>
      <el-descriptions-item>
        <template slot="label">名称</template>
        <span>{{ authority.name }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">标题</template>
        <span>{{ authority.title }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">菜单类型</template>
        <span v-if="authority.type == '0'">目录</span>
        <span v-else-if="authority.type == '1'">菜单</span>
        <span v-else-if="authority.type == '2'">按钮</span>
        <span v-else-if="authority.type == '3'">子路由</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">父菜单</template>{{ authority.parentTitle }}
      </el-descriptions-item>
      <el-descriptions-item v-if="authority.type == '1' || authority.type == '3'">
        <template slot="label">路由地址</template>
        <span>{{ authority.path }}</span>
      </el-descriptions-item>
      <el-descriptions-item v-if="authority.type == '1' || authority.type == '3'">
        <template slot="label">组件路径</template>
        <span>{{ authority.url }}</span>
      </el-descriptions-item>
      <el-descriptions-item v-if="authority.type == '2' || authority.type == '3'">
        <template slot="label">颜色</template>
        <span>{{ authority.color }}</span>
      </el-descriptions-item>
      <el-descriptions-item v-if="authority.type == '2' || authority.type == '3'">
        <template slot="label">图标</template>
        <i :class="authority.icon" />
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script>
export default {
  name: 'AuthorityShow',
  props: {
    authority: {
      type: Object,
      default: {
        id: '',
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
    },
    showModalVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    showModalVisible: {
      handler (newV) {
        //
      }
    }
  },
  data() {
    return {
      title: '查看权限信息'
    }
  },
  methods: {
    close() {
      this.$emit('cancel')
    }
  }
}
</script>