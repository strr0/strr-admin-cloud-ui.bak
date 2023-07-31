<template>
  <el-dialog :title="title" :visible.sync="editModalVisible" :before-close="close" width="60%">
    <el-form :model="role" ref="role" :rules="rules" label-position="left">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="name" label="角色名称">
            <el-input v-model="role.name" placeholder="请输入角色名称"
              prefix-icon="el-icon-edit" style="width: 80%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="title" label="角色描述">
            <el-input v-model="role.title" placeholder="请输入角色描述"
              prefix-icon="el-icon-edit" style="width: 80%" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  saveRole,
  updateRole
} from '../../../../apis/admin'

export default {
  name: 'RoleEdit',
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
    editModalVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    editModalVisible: {
      handler (newV) {
        if (this.role.id) {
          this.title = '修改角色信息'
        } else {
          this.title = '添加角色信息'
        }
      },
      deep: true
    }
  },
  data() {
    return {
      title: null,
      rules: {
        name: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
        title: [{required: true, message: '请输入角色描述', trigger: 'blur'}]
      }
    }
  },
  methods: {
    save() {
      this.$refs.role.validate(valid => {
        if(valid) {
          if (this.role.id) {
            updateRole(this.role).then(resp => {
              if(resp && resp.success) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.$emit('refresh')
                this.close()
              }
            })
          } else {
            saveRole(this.role).then(resp => {
              if(resp && resp.success) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.$emit('refresh')
                this.close()
              }
            })
          }
        }
      })
    },
    close() {
      this.$emit('cancel')
    }
  }
}
</script>