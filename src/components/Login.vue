<template>
  <el-form :rules="rules" :model="loginForm" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="loginname">
      <el-input type="text" v-model="loginForm.loginname" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" @click.native.prevent="submitClick" style="width: 100%">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>

export default {
  name: 'Login',
  data () {
    return {
      rules: {
        loginname: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      },
      loginForm: {
        loginname: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    submitClick: function () {
      // var datas = '<?xml version="1.0" encoding="utf-8"?>\n' +
      //   '<string xmlns="http://tempuri.org/">[{"UserID":"LC2015120004","UserName":"陆人贤","LoginName":"13331932927","PassWord":null,"Phone":"13331932927","OrganizationID":"7d70294a-ca34-410d-82cc-f8b7e07f5a11","OrganizationName":"长青组","ParentOrgnizationName":"大卫区","ParentOrgnizationID":"63f9f004-c737-475e-a365-65efd688543d","GrandFatherName":"福鹰","GrandFatherID":"e3656461-4dbf-45da-a4f5-cf9bd1b64aef","RoleName":"组长","OtherRoleName":null,"RoleType":null}]</string>'
      var datas = '<?xml version="1.0" encoding="utf-8"?>\n' +
        '<string xmlns="http://tempuri.org/">[{"StringID":"长青组-2018-03-04","StringText":"长青组"},{"StringID":"长青组-2018-03-11","StringText":"长青组"},{"StringID":"长青组-2018-03-18","StringText":"长青组"},{"StringID":"长青组-2018-03-25","StringText":"长青组"},{"StringID":"长青组-2018-04-01","StringText":"长青组"},{"StringID":"长青组-2018-04-08","StringText":"长青组"},{"StringID":"长青组-2018-04-15","StringText":"长青组"},{"StringID":"长青组-2018-04-22","StringText":"长青组"},{"StringID":"长青组-2018-04-29","StringText":"长青组"},{"StringID":"长青组-2018-05-06","StringText":"长青组"},{"StringID":"长青组-2018-05-13","StringText":"长青组"},{"StringID":"长青组-2018-05-20","StringText":"长青组"},{"StringID":"长青组-2018-05-27","StringText":"长青组"},{"StringID":"长青组-2018-06-03","StringText":"长青组"},{"StringID":"长青组-2018-06-10","StringText":"长青组"},{"StringID":"长青组-2018-06-17","StringText":"长青组"},{"StringID":"长青组-2018-06-24","StringText":"长青组"},{"StringID":"长青组-2018-07-01","StringText":"长青组"},{"StringID":"长青组-2018-07-08","StringText":"长青组"},{"StringID":"长青组-2018-07-15","StringText":"长青组"},{"StringID":"长青组-2018-07-22","StringText":"长青组"},{"StringID":"长青组-2018-07-29","StringText":"长青组"},{"StringID":"长青组-2018-08-05","StringText":"长青组"},{"StringID":"长青组-2018-08-12","StringText":"长青组"},{"StringID":"长青组-2018-08-19","StringText":"长青组"},{"StringID":"长青组-2018-08-26","StringText":"长青组"},{"StringID":"长青组-2018-09-02","StringText":"长青组"},{"StringID":"长青组-2018-09-09","StringText":"长青组"},{"StringID":"长青组-2018-09-16","StringText":"长青组"},{"StringID":"长青组-2018-09-23","StringText":"长青组"},{"StringID":"长青组-2018-09-30","StringText":"长青组"},{"StringID":"长青组-2018-10-07","StringText":"长青组"},{"StringID":"长青组-2018-10-14","StringText":"长青组"},{"StringID":"长青组-2018-10-21","StringText":"长青组"},{"StringID":"长青组-2018-10-28","StringText":"长青组"},{"StringID":"长青组-2018-11-04","StringText":"长青组"}]</string>'
      this.$xtjConverter.xmlDataToJSON(datas).then(json => {
        // console.log(JSON.parse(json.string._))
      })
      // http://192.168.1.102:8080/WebServiceBasic.asmx/GetLoginInfo
      var _this = this
      this.loading = true
      this.postRequest('/login', {
        loginname: this.loginForm.loginname,
        password: this.loginForm.password
      }).then(resp => {
        _this.loading = false
        if (resp && resp.status === 200) {
          var data = resp.data
          console.log(data.msg)
          _this.$store.commit('login', data.msg)
          _this.$router.replace({path: '/'})
        } else {
          this.$message({
            message: resp.data.status,
            center: true
          })
        }
      })
    }
  }
}
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    max-width: 350px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

</style>
