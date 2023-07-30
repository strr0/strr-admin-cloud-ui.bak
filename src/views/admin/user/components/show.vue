<template>
  <el-dialog :title="title" :visible.sync="showModalVisible" :before-close="close" width="50%">
    <el-descriptions :column="2" border>
      <el-descriptions-item>
        <template slot="label">用户名</template>{{ user.username }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">昵称</template>{{ user.nickname }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">电子邮箱</template>{{ user.email }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">角色</template>
        <el-tag size="small"
          v-for="item in currentRoleList"
          :key="item.id"
        >
          {{ item.name }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">用户头像</template>{{ user.avatar }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">个人说明</template>{{ user.remark }}
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script>
import {
  listRole,
  listRelByUid
} from '../../../../apis/admin'

export default {
  name: 'UserShow',
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
    showModalVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    showModalVisible: {
      handler (newV) {
        if (newV && this.user.id) {
          listRelByUid(this.user.id).then(resp => {
            if(resp && resp.success) {
              this.roleIds = resp.data
            }
          })
        }
      },
      deep: true
    }
  },
  data() {
    return {
      title: '查看用户信息',
      roleList: [],
      roleIds: []
    }
  },
  computed: {
    currentRoleList() {
      return this.roleList.filter(item => this.roleIds.indexOf(item.id) != -1)
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
    close(done) {
      this.$emit('cancel')
    }
  }
}
</script>