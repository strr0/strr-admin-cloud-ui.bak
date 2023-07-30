<template>
  <el-dialog :title="title" :visible.sync="editModalVisible" :before-close="close" width="50%">
    <el-form :model="user" ref="user" :rules="rules" label-position="right" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="username" label="用户名">
            <el-input type="text" v-model="user.username" placeholder="请输入用户名"
              prefix-icon="el-icon-edit" style="width: 80%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="nickname" label="昵称">
            <el-input type="text" v-model="user.nickname" placeholder="请输入昵称"
              prefix-icon="el-icon-edit" style="width: 80%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="email" label="电子邮箱">
            <el-input type="text" v-model="user.email" placeholder="请输入电子邮箱"
              prefix-icon="el-icon-message" style="width: 80%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色">
            <el-select v-model="newRids" multiple placeholder="请选择" style="width: 80%">
              <el-option v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item prop="avatar" label="用户头像">
          <el-input v-model="user.avatar" placeholder="请上传用户头像" style="width: 90%" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item prop="remark" label="个人说明">
          <el-input type="textarea" v-model="user.remark" placeholder="请输入个人说明"
            style="width: 90%" />
        </el-form-item>
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
  listRole,
  saveUser,
  listRelByUid
} from '../../../../apis/admin'

export default {
  name: 'RoleEdit',
  props: {
    user: {
      type: Object,
      default: {
        id: '',
        username: '',
        //password: '',
        nickname: '',
        email: '',
        avatar: '',
        remark: '',
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
        if (newV) {
          if (this.user.id) {
            this.title = '修改用户信息'
            listRelByUid(this.user.id).then(resp => {
              if(resp && resp.success) {
                this.newRids = resp.data
                this.oldRids = resp.data
              }
            })
          } else {
            this.title = '添加用户信息'
            this.newRids = []
            this.oldRids = []
          }
        }
      },
      deep: true
    }
  },
  data() {
    return {
      title: null,
      roleList: [],
      oldRids: [],
      newRids: [],
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 4, max: 16, message: '长度必须是4-16个字符'}
        ],
        password: null,
        nickname: [{required: true, message: '请输入昵称', trigger: 'blur'}],
        email: [{required: true, message: '请输入电子邮箱', trigger: 'blur'},
          {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
        ],
        avatar: null,
        remark: null
      }
    }
  },
  mounted() {
    this.initRole()
  },
  methods: {
    initRole() {
      listRole().then(resp => {
        if(resp && resp.success) {
          this.roleList = resp.data
        }
      })
    },
    save() {
      this.$refs.user.validate(valid => {
        if(valid) {
          let form = this.user
          delete form.loginTime
          form.oldRids = this.oldRids
          form.newRids = this.newRids
          saveUser(form).then(resp => {
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
      })
    },
    close(done) {
      this.$emit('cancel')
    }
  }
}
</script>