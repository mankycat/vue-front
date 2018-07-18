<template>
  <el-container>
    <el-main>
      <el-form :rules="rules" status-icon ref="pForm" :model="pForm" label-position="left"
               label-width="0px" v-loading="loading">
        <el-form-item prop="oPassword">
          <el-input type="password" v-model="pForm.oPassword" auto-complete="off" placeholder="原密码"></el-input>
        </el-form-item>
        <el-form-item prop="nPassword">
          <el-input type="password" v-model="pForm.nPassword" auto-complete="off" placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item prop="cPassword">
          <el-input type="password" v-model="pForm.cPassword" auto-complete="off" placeholder="再次输入新密码"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="primary"  @click.native.prevent="submitClick" style="width: 100%">修改</el-button>
          <el-button type="warning" style="width: 100%;margin: 0px" @click="restForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'UpdatePwd',
  data () {
    var validateNPassword = (rule, value, callback) => {
      if (value === '' || value === '123456' || value.length < 6) {
        callback(new Error('请输入密码,且不可过于简单!'))
      } else {
        if (this.pForm.cPassword !== '') {
          this.$refs.pForm.validateField('cPassword')
        }
        callback()
      }
    }
    var validateCPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pForm.nPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        oPassword: [{required: true, min: 6, message: '请输入正确密码', trigger: 'blur'}],
        nPassword: [{validator: validateNPassword, trigger: 'blur'}],
        cPassword: [{validator: validateCPassword, trigger: ['blur', 'change']}]
      },
      pForm: {
        oPassword: '',
        nPassword: '',
        cPassword: ''
      },
      loading: false
    }
  },
  methods: {
    restForm: function () {
      this.$refs.pForm.resetFields()
    },
    submitClick: function () {
      var _this = this
      this.loading = true
      this.$refs.pForm.validate((valid) => {
        if (valid) {
          _this.postRequest('/user/updatepassword', {
            userId: _this.$store.state.user.userid,
            oPassword: _this.pForm.oPassword,
            nPassword: _this.pForm.nPassword
          }).then(resp => {
            _this.loading = false
            if (resp && resp.status === 200) {
              _this.$message({
                message: resp.data.msg,
                center: true
              })
              _this.$router.replace({path: '/'})
            } else {
              _this.$router.replace({name: 'Login'})
            }
          })
          this.loading = false
        } else {
          _this.$message({
            message: '请输入正确内容',
            center: true
          })
          this.loading = false
          return false
        }
      })
    }
  }
}
</script>

<style>
</style>
