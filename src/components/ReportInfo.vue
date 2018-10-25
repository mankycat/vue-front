<template>
  <el-container>
    <el-main style="padding: 10px">
      <div v-if="stepStatus===0"><span>{{currentMember.username}}</span><span v-if="currentMember.nickname"> ({{currentMember.nickname}})</span><span>活动纪录</span></div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <div v-if="stepStatus===0">
        <el-form-item label="小組" prop="isGroup">
          <!--<el-input v-if="isEdit" v-model="ruleForm.loginname"></el-input>-->
          <!--<div v-else style="text-align: left"><span>:   {{ruleForm.loginname}}</span></div>-->
          <el-switch width=60 v-model="ruleForm.isGroup"></el-switch>
        </el-form-item>
        <el-form-item label="主日" prop="isChurch">
          <el-switch width=60 v-model="ruleForm.isChurch"></el-switch>
        </el-form-item>
        <el-form-item label="LD" prop="isLD">
          <el-switch width=60 v-model="ruleForm.isLD"></el-switch>
        </el-form-item>
        <!--<el-form-item v-if="isNew == false" label="垒包" prop="coursename">-->
          <!--<div style="text-align: left"><span>:   {{ruleForm.coursename}}</span></div>-->
        <!--</el-form-item>-->
        <el-form-item  label="垒包" prop="isCourse">
          <el-switch width=60 v-model="ruleForm.isCourse"></el-switch>
          <!--<div style="text-align: left;">-->
            <!--<el-radio-group  v-if="isEdit" v-model="ruleForm.gender">-->
              <!--<el-radio label="男"></el-radio>-->
              <!--<el-radio label="女"></el-radio>-->
            <!--</el-radio-group >-->
            <!--<div v-else style="text-align: left"><span>:   {{ruleForm.gender}}</span></div>-->
          <!--</div>-->
        </el-form-item>
        <el-form-item label="TD" prop="isTD">
          <el-switch width=60 v-model="ruleForm.isTD"></el-switch>
        </el-form-item>
        <el-form-item label="灵修次数" prop="spiritualGrowth">
          <el-input-number v-model="ruleForm.spiritualGrowth"></el-input-number>
        </el-form-item>
        <el-form-item label="关怀" prop="phoneCare">
          <el-input-number v-model="ruleForm.phoneCare"></el-input-number>
        </el-form-item>
        <el-form-item label="探访" prop="byVisiting">
          <el-input-number v-model="ruleForm.byVisiting"></el-input-number>
        </el-form-item>
      </div>
        <div v-if="stepStatus===1">
        <el-form-item label="主日正常" prop="isSunday">
          <el-switch v-model="ruleForm.isSunday"></el-switch>
        </el-form-item>
        <el-form-item label="小组正常" prop="isParty">
          <el-switch v-model="ruleForm.isParty"></el-switch>
        </el-form-item>
        <el-form-item v-if="ruleForm.isParty" label="小组日期" required>
          <el-col>
            <el-form-item prop="groupDate">
              <el-date-picker v-if="isEdit" type="date" placeholder="选择日期" v-model="ruleForm.groupDate" style="width: 80%;"></el-date-picker>
              <div v-else style="text-align: left"><span>:   {{ruleForm.groupDate | formatDate}}</span></div>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item v-if="ruleForm.isParty" label="内容" prop="groupContent" placeholder="请选择">
          <el-select v-model="ruleForm.groupContent">
            <el-option value="讲台联动"></el-option>
            <el-option value="查经"></el-option>
            <el-option value="专题讲道"></el-option>
            <el-option value="外展"></el-option>
            <el-option value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="ruleForm.isParty" prop="contentDetails" label="内容详情">
          <el-input v-model="ruleForm.contentDetails" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item v-if="ruleForm.isParty" prop="introspectionNum" label="检讨人数">
          <el-input-number v-model="ruleForm.introspectionNum"></el-input-number>
        </el-form-item>
        <el-form-item v-if="ruleForm.description" prop="contentDetails" label="备注说明">
          <el-input v-model="ruleForm.description" placeholder="请输入内容"></el-input>
        </el-form-item>
        </div>
        <div v-if="stepStatus===2">
        <el-form-item label="开始时间" prop="beginTime">
          <el-time-select editable="false" clearable="false" v-model="ruleForm.beginTime" default-value="ruleForm.beginTime" :picker-options="{start: ruleForm.beginTime , step: '00:05'}"></el-time-select>
        </el-form-item>
        <el-form-item label="祷告" prop="prayTime">
          <el-select style="width: 35%;" v-model="ruleForm.prayer">
            <el-option
            v-for="item in memberData"
            :key="item.userid"
            :label="item.username"
            :value="item.userid">
            </el-option>
          </el-select>
          <el-time-select style="width: 35%;" editable="false" clearable="false" v-model="ruleForm.prayTime" default-value="ruleForm.prayTime" :picker-options="{start: ruleForm.prayTime , step: '00:05'}"></el-time-select>
        </el-form-item>
        <el-form-item label="破冰" prop="iceBreakTime">
          <el-select style="width: 35%;" v-model="ruleForm.iceBreaker">
            <el-option
              v-for="item in memberData"
              :key="item.userid"
              :label="item.username"
              :value="item.userid">
            </el-option>
          </el-select>
          <el-time-select style="width: 35%;" editable="false" clearable="false" v-model="ruleForm.iceBreakTime" default-value="ruleForm.iceBreakTime" :picker-options="{start: ruleForm.iceBreakTime , step: '00:05'}"></el-time-select>
        </el-form-item>
        <el-form-item label="敬拜" prop="singTime">
          <el-select style="width: 35%;" v-model="ruleForm.singer">
            <el-option
              v-for="item in memberData"
              :key="item.userid"
              :label="item.username"
              :value="item.userid">
            </el-option>
          </el-select>
          <el-time-select style="width: 35%;" editable="false" clearable="false" v-model="ruleForm.singTime" default-value="ruleForm.singTime" :picker-options="{start: ruleForm.singTime , step: '00:05'}"></el-time-select>
        </el-form-item>
        <el-form-item label="见证" prop="witnessTime">
          <el-select style="width: 35%;" v-model="ruleForm.witnesser">
            <el-option
              v-for="item in memberData"
              :key="item.userid"
              :label="item.username"
              :value="item.userid">
            </el-option>
          </el-select>
          <el-time-select style="width: 35%;" editable="false" clearable="false" v-model="ruleForm.witnessTime" default-value="ruleForm.witnessTime" :picker-options="{start: ruleForm.witnessTime , step: '00:05'}"></el-time-select>
        </el-form-item>
        <el-form-item label="话语" prop="speakTime">
          <el-select style="width: 35%;" v-model="ruleForm.speaker">
            <el-option
              v-for="item in memberData"
              :key="item.userid"
              :label="item.username"
              :value="item.userid">
            </el-option>
          </el-select>
          <el-time-select style="width: 35%;" editable="false" clearable="false" v-model="ruleForm.speakTime" default-value="ruleForm.speakTime" :picker-options="{start: ruleForm.speakTime , step: '00:05'}"></el-time-select>
        </el-form-item>
        <el-form-item label="服事" prop="serveTime">
          <el-select style="width: 35%;" v-model="ruleForm.server">
            <el-option
              v-for="item in memberData"
              :key="item.userid"
              :label="item.username"
              :value="item.userid">
            </el-option>
          </el-select>
          <el-time-select style="width: 35%;" editable="false" clearable="false" v-model="ruleForm.serveTime" default-value="ruleForm.serveTime" :picker-options="{start: ruleForm.serveTime , step: '00:05'}"></el-time-select>
        </el-form-item>
        <el-form-item label="报告" prop="reportTime">
          <el-select style="width: 35%;" v-model="ruleForm.reporter">
            <el-option
              v-for="item in memberData"
              :key="item.userid"
              :label="item.username"
              :value="item.userid">
            </el-option>
          </el-select>
          <el-time-select style="width: 35%;" editable="false" clearable="false" v-model="ruleForm.reportTime" default-value="ruleForm.reportTime" :picker-options="{start: ruleForm.reportTime , step: '00:05'}"></el-time-select>
        </el-form-item>
        </div>
        <el-button v-if="step===0 && stepStatus===0" @click.native.prevent="leave">返回</el-button>
        <el-button v-if="step>0" @click.native.prevent="preStep">上一步</el-button>
        <el-button v-if="stepStatus<2" @click.native.prevent="nextStep">下一步</el-button>
        <el-button v-if="stepStatus === 2" type="primary" @click.native.prevent="submitReport" >提交</el-button>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'ReportInfo',
  data () {
    return {
      currentMember: '',
      isEdit: true,
      step: 0,
      stepStatus: 0, // 0 = 組員 , 1 = 活動 , 2 = 5week
      attendanceObj: [],
      FiveWObj: [],
      WeekRptObj: {},
      ruleForm: {
        isGroup: 0,
        isChurch: 0,
        isLD: 0,
        isTD: 0,
        isCourse: 0,
        groupDate: '',
        spiritualGrowth: 0,
        phoneCare: 0,
        byVisiting: 0,
        isParty: 0,
        isSunday: 0,
        groupContent: '',
        contentDetails: '',
        introspectionNum: 0,
        description: '',
        beginTime: this.getCurrentTime(),
        prayTime: this.getCurrentTime(),
        singTime: this.getCurrentTime(),
        iceBreakTime: this.getCurrentTime(),
        witnessTime: this.getCurrentTime(),
        speakTime: this.getCurrentTime(),
        serveTime: this.getCurrentTime(),
        reportTime: this.getCurrentTime(),
        prayer: '',
        singer: '',
        iceBreaker: '',
        witnesser: '',
        speaker: '',
        server: '',
        reporter: ''
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
    leave () {
      let _this = this
      this.$confirm('作废操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.$router.back()
      })
    },
    preStep () {
      this.step--
      if (this.step < (this.memberData.length - 1)) {
        this.currentMember = this.memberData[this.step]
      } else {
        this.stepStatus--
      }
      if (this.step <= (this.memberData.length - 1) && this.step >= 0) {
        this.ruleForm.isGroup = this.attendanceObj[this.step].IsGroup
        this.ruleForm.isChurch = this.attendanceObj[this.step].IsChurch
        this.ruleForm.isLD = this.attendanceObj[this.step].IsLD
        this.ruleForm.isCourse = this.attendanceObj[this.step].IsCourse
        this.ruleForm.isTD = this.attendanceObj[this.step].isTD
        this.ruleForm.spiritualGrowth = this.attendanceObj[this.step].SpiritualGrowth
        this.ruleForm.phoneCare = this.attendanceObj[this.step].PhoneCare
        this.ruleForm.byVisiting = this.attendanceObj[this.step].ByVisiting
      }
    },
    nextStep () {
      if (this.step < (this.memberData.length - 1)) {
        let attendanceData = {}
        attendanceData.ID = null
        attendanceData.UserID = this.currentMember.userid
        attendanceData.IsGroup = this.ruleForm.isGroup
        attendanceData.IsChurch = this.ruleForm.isChurch
        attendanceData.IsLD = this.ruleForm.isLD
        attendanceData.IsCourse = this.ruleForm.isCourse
        attendanceData.isTD = this.ruleForm.isTD
        attendanceData.SpiritualGrowth = this.ruleForm.spiritualGrowth
        attendanceData.PhoneCare = this.ruleForm.phoneCare
        attendanceData.ByVisiting = this.ruleForm.byVisiting
        this.attendanceObj[this.step] = attendanceData
      }
      this.step++
      if (this.step > (this.memberData.length - 1)) {
        this.stepStatus++
      } else {
        this.currentMember = this.memberData[this.step]
      }
      this.resetFormMemberValue()
    },
    submitReport () {
      console.log('')
    },
    getCurrentTime () {
      var nowTime = new Date()
      var nowHour = nowTime.getHours()
      var nowMin = nowTime.getMinutes()
      nowHour = nowHour < 10 ? '0' + nowHour : nowHour
      nowMin = nowMin < 10 ? '0' + nowMin : nowMin
      return nowHour + ':' + nowMin
    },
    resetFormMemberValue () {
      this.ruleForm.isGroup = 0
      this.ruleForm.isChurch = 0
      this.ruleForm.isLD = 0
      this.ruleForm.isCourse = 0
      this.ruleForm.isTD = 0
      this.ruleForm.spiritualGrowth = 0
      this.ruleForm.phoneCare = 0
      this.ruleForm.byVisiting = 0
    }
  },
  computed: {
    memberData () {
      return this.$store.state.members
    }
  },
  mounted: function () {
    this.currentMember = this.memberData[0]
  }
}
</script>

<style scoped>

</style>
