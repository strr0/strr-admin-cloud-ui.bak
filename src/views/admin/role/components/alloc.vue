<template>
  <el-dialog :title="title" :visible.sync="allocModalVisible" :before-close="close" width="60%">
    <el-tree
      show-checkbox
      node-key="id"
      ref="tree"
      default-expand-all
      :default-checked-keys="newAids"
      :data="treeData"
      :props="{ label: 'title', children: 'children' }" />
    <div style="display: flex; justify-content: flex-end">
      <el-button @click="close">取消修改</el-button>
      <el-button type="primary" @click="updateRel">确认修改</el-button>
    </div>  
  </el-dialog>
</template>

<script>
import {
  listAuthority,
  listRelByRid,
  updateRel
} from '../../../../apis/admin'

export default {
  name: 'RoleAlloc',
  props: {
    role: {
      type: Object,
      default: {
        id: '',
        name: '',
        title: '',
        status: false
      }
    },
    allocModalVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    allocModalVisible: {
      handler (newV) {
        if (newV) {
          if (this.role.id) {
            this.treeData = []
            listRelByRid(this.role.id).then(resp => {
              if (resp && resp.success) {
                this.treeData = this.authorityList
                this.newAids = resp.data
                this.oldAids = resp.data
              }
            })
          } else {
            this.newAids = []
            this.oldAids = []
          }
        }
      },
      deep: true
    }
  },
  data() {
    return {
      title: '权限控制',
      authorityList: [],
      treeData: [],
      oldAids: [],
      newAids: []
    }
  },
  mounted() {
    this.initAuthority()
  },
  methods: {
    initAuthority() {
      listAuthority().then(resp => {
        if(resp && resp.success) {
          this.authorityList = resp.data
        }
      })
    },
    //修改权限
    updateRel() {
      let tree = this.$refs.tree
      let halfChecked = tree.getHalfCheckedKeys()
      let checked = tree.getCheckedKeys()
      let form = {}
      form.rid = this.role.id
      form.oldAids = this.oldAids
      form.newAids = halfChecked.concat(checked)
      updateRel(form).then(resp => {
        if(resp && resp.success) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
      })
    },
    close() {
      this.$emit('cancel')
    }
  }
}
</script>