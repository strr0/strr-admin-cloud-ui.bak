<template>
  <el-dialog :title="title" :visible.sync="addModalVisible" :before-close="close" width="60%">
    <el-form :model="properties" ref="properties" :rules="rules" label-position="left">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="application" label="应用">
            <el-input v-model="properties.application" placeholder="请输入应用"
              prefix-icon="el-icon-edit" style="width: 80%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="profile" label="环境">
            <el-input v-model="properties.profile" placeholder="请输入环境"
              prefix-icon="el-icon-edit" style="width: 80%" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="content" label="配置">
            <el-input v-model="properties.content" type="textarea" :rows="5" placeholder="请输入配置" style="width: 90%" />
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
  batchSaveProperties
} from '../../../../apis/admin'

export default {
  name: 'PropertiesAdd',
  props: {
    addModalVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    addModalVisible: {
      handler (newV) {
        if (newV) {
          this.empty()
        }
      },
      deep: true
    }
  },
  data() {
    return {
      title: '添加配置信息',
      properties: {
        application: null,
        profile: null,
        content: null
      },
      rules: {
        application: [{required: true, message: '请输入应用', trigger: 'blur'}],
        content: [{required: true, message: '请输入配置', trigger: 'blur'}]
      }
    }
  },
  methods: {
    empty() {
      this.properties = {
        application: null,
        profile: null
      }
    },
    save() {
      let reg = new RegExp(/(.+)=(.+)/, 'gi')
      let application = this.properties.application
      let profile = this.properties.profile
      this.$refs.properties.validate(valid => {
        if(valid) {
          let dataList = []
          this.properties.content.split('\n').forEach(item => {
            item.replace(reg, (match, p1, p2) => {
              dataList.push({
                application: application,
                profile: profile,
                key: p1,
                value: p2
              })
              return null
            })
          })
          batchSaveProperties(dataList).then(resp => {
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
    close() {
      this.$emit('cancel')
    }
  }
}
</script>