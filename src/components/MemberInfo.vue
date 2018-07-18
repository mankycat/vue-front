<template>
  <el-container>
    <el-main style="padding: 10px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="loginname">
          <el-input v-if="isEdit" v-model="ruleForm.loginname"></el-input>
          <div v-else style="text-align: left"><span>:   {{ruleForm.loginname}}</span></div>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-if="isEdit" v-model="ruleForm.phone"></el-input>
          <div v-else style="text-align: left"><span>:   {{ruleForm.phone}}</span></div>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-if="isEdit" v-model="ruleForm.username"></el-input>
          <div v-else style="text-align: left"><span>:   {{ruleForm.username}}</span></div>
        </el-form-item>
        <el-form-item label="加入时间" required>
          <el-col :span="11">
            <el-form-item prop="date">
              <el-date-picker v-if="isEdit" type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
              <div v-else style="text-align: left"><span>:   {{ruleForm.date | formatDate}}</span></div>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button v-if="isEdit" type="primary" @click.native.prevent="submitChange" >提交</el-button>
          <el-button @click.native.prevent="goBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'MemberInfo',
  data () {
    return {
      userid: '',
      isEdit: false,
      isNew: false,
      ruleForm: {
        loginname: '',
        phone: '',
        username: '',
        date: ''
      },
      rules: {
        loginname: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        date: [
          { type: 'date', required: true, message: '请选择加入日期', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    cTeam () {
      return this.$store.state.cTeam
    }
  },
  methods: {
    goBack: function () {
      this.$router.back()
    },
    submitChange: function () {
      var _this = this
      this.postRequest('/user/updateMember',
        {
          userId: this.userid,
          mobile: this.ruleForm.phone,
          username: this.ruleForm.username,
          loginname: this.ruleForm.loginname
        }).then(resp => {
        if (resp && resp.status === 200 && resp.data.status === 'success') {
          _this.$message({
            message: resp.data.msg,
            center: true
          })
          _this.postRequest('/user/getMembers',
            {
              gId: this.cTeam
            }).then(resp => {
            if (resp && resp.status === 200 && resp.data.status === 'success') {
              this.$store.commit('initMemberList', resp.data.data)
            }
          })
          _this.$router.push({name: 'Home'})
        }
      })
    }
  },
  mounted: function () {
    if (this.$route.params.isNew) {
      this.isNew = true
      this.isEdit = true
    } else {
      this.ruleForm.loginname = this.$route.params.loginname
      this.ruleForm.phone = this.$route.params.phone
      this.ruleForm.username = this.$route.params.username
      this.ruleForm.date = this.formatDate(this.$route.params.date)
      this.userid = this.$route.params.userid
      this.isEdit = this.$route.params.isEdit
    }
  }
}
</script>

<style scoped>

</style>
