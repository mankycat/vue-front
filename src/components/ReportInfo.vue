<template>
  <el-container>
    <el-main style="padding: 10px">
      <span>{{username}}</span><span v-if="alias"> ({{alias}})</span><span>活动纪录</span>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="小組" prop="isGroup">
          <!--<el-input v-if="isEdit" v-model="ruleForm.loginname"></el-input>-->
          <!--<div v-else style="text-align: left"><span>:   {{ruleForm.loginname}}</span></div>-->
          <el-switch v-model="ruleForm.isGroup"></el-switch>
        </el-form-item>
        <el-form-item label="主日" prop="isChurch">
          <el-switch v-model="ruleForm.isChurch"></el-switch>
        </el-form-item>
        <el-form-item label="LD" prop="isLD">
          <el-switch v-model="ruleForm.isLD"></el-switch>
        </el-form-item>
        <!--<el-form-item v-if="isNew == false" label="垒包" prop="coursename">-->
          <!--<div style="text-align: left"><span>:   {{ruleForm.coursename}}</span></div>-->
        <!--</el-form-item>-->
        <el-form-item  label="垒包" prop="isCourse">
          <el-switch v-model="ruleForm.isCourse"></el-switch>
          <!--<div style="text-align: left;">-->
            <!--<el-radio-group  v-if="isEdit" v-model="ruleForm.gender">-->
              <!--<el-radio label="男"></el-radio>-->
              <!--<el-radio label="女"></el-radio>-->
            <!--</el-radio-group >-->
            <!--<div v-else style="text-align: left"><span>:   {{ruleForm.gender}}</span></div>-->
          <!--</div>-->
        </el-form-item>
        <el-form-item label="TD" prop="isTD">
          <el-switch v-model="ruleForm.isTD"></el-switch>
        </el-form-item>
        <el-form-item label="灵修次数" prop="SpiritualGrowth">
          <el-input-number v-model="ruleForm.SpiritualGrowth"></el-input-number>
        </el-form-item>
        <el-form-item label="关怀" prop="PhoneCare">
          <el-input-number v-model="ruleForm.PhoneCare"></el-input-number>
        </el-form-item>
        <el-form-item label="探访" prop="ByVisiting">
          <el-input-number v-model="ruleForm.ByVisiting"></el-input-number>
        </el-form-item>
        <el-form-item label="小组日期" required>
          <el-col>
            <el-form-item prop="GroupDate">
              <el-date-picker v-if="isEdit" type="date" placeholder="选择日期" v-model="ruleForm.GroupDate" style="width: 100%;"></el-date-picker>
              <div v-else style="text-align: left"><span>:   {{ruleForm.GroupDate | formatDate}}</span></div>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-button @click.native.prevent="">返回</el-button>
        <el-button @click.native.prevent="">下一步</el-button>
        <el-button type="primary" @click.native.prevent="" >提交</el-button>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'ReportInfo',
  data () {
    return {
      username: '誰誰誰',
      alias: '',
      isEdit: true,
      attendanceObj: {},
      FiveWObj: {},
      WeekRptObj: {},
      ruleForm: {
        isGroup: 0,
        isChurch: 0,
        isLD: 0,
        isCourse: 0,
        GroupDate: '',
        SpiritualGrowth: 0,
        PhoneCare: 0,
        ByVisiting: 0
      },
      rules: {

      }
      // rules: {
      //   loginname: [
      //     { required: true, message: '请输入用户名', trigger: 'blur' }
      //   ],
      //   phone: [
      //     { required: true, message: '请输入手机号', trigger: 'blur' }
      //   ],
      //   username: [
      //     { required: true, message: '请输入姓名', trigger: 'blur' }
      //   ],
      //   date: [
      //     { type: 'date', required: true, message: '请选择加入日期', trigger: 'blur' }
      //   ],
      //   password: [
      //     { required: true, message: '请输入用户名', trigger: 'blur' }
      //   ]
      // }
    }
  },
  methods: {
    preStep () {
      console.log('')
    },
    nextStep () {
      console.log('')
    },
    submitReport () {
      console.log('')
    }
  }
}
</script>

<style scoped>

</style>
