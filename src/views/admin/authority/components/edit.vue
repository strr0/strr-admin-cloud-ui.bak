<template>
  <el-dialog :title="title" :visible.sync="editModalVisible" :before-close="close" width="60%">
    <el-form :model="authority" ref="authority" :rules="rules" label-position="right" label-width="20%">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="name" label="名称">
            <el-input v-model="authority.name" placeholder="请输入名称"
              prefix-icon="el-icon-edit" style="width: 80%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="title" label="标题">
            <el-input v-model="authority.title" placeholder="请输入标题"
              prefix-icon="el-icon-edit" style="width: 80%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="type" label="类型">
            <el-select v-model="authority.type" placeholder="请选择" style="width: 80%">
              <el-option
                v-for="(item, index) in typeOptions"
                :key="index"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="父菜单">
            <el-input v-model="authority.parentTitle" style="width: 80%" readonly />
            <input v-model="authority.parentId" type="hidden" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-show="authority.type == '1'">
          <el-form-item prop="path" label="路由地址">
            <el-input v-model="authority.path" placeholder="请输入路由地址"
              prefix-icon="el-icon-edit" style="width: 80%" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-show="authority.type == '1'">
          <el-form-item prop="url" label="组件路径">
            <el-input v-model="authority.url" placeholder="请输入组件路径"
              prefix-icon="el-icon-edit" style="width: 80%" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-show="authority.type == '2'">
          <el-form-item prop="color" label="颜色">
            <el-select v-model="authority.color" placeholder="请选择" style="width: 80%">
              <el-option
                v-for="(item, index) in colorOptions"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-show="authority.type == '2'">
          <el-form-item prop="icon" label="图标">
            <el-select v-model="authority.icon" placeholder="请选择" style="width: 80%">
              <el-option
                v-for="(item, index) in iconOptions"
                :key="index"
                :label="item"
                :value="item"
              >
                <span class="span-l">{{ item }}</span><span class="span-r"><i :class="item" /></span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editModalVisible = false">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  saveAuthority,
  updateAuthority
} from '../../../../apis/admin'

export default {
  name: 'AuthorityEdit',
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
    editModalVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    editModalVisible: {
      handler (newV) {
        if (this.authority.id) {
          this.title = '修改权限信息'
        } else {
          this.title = '添加权限信息'
        }
      }
    }
  },
  data() {
    return {
      title: null,
      typeOptions: [{name: '目录', code: '0'}, {name: '菜单', code: '1'}, {name: '按钮', code: '2'}],
      colorOptions: ['primary', 'success', 'warning', 'danger'],
      iconOptions: ['el-icon-view', 'el-icon-plus', 'el-icon-edit', 'el-icon-delete'],
      rules: {
        name: [{required: true, message: '请输入名称', trigger: 'blur'}],
        title: [{required: true, message: '请输入标题', trigger: 'blur'}],
        url: null,
        path: null,
        icon: null,
        parentId: null
      }
    }
  },
  methods: {
    save() {
      this.$refs.authority.validate(valid => {
        if(valid) {
          let form = this.authority
          delete form.children
          if (form.id) {
            updateAuthority(this.authority).then(resp => {
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
            saveAuthority(this.authority).then(resp => {
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