<template>
  <el-container>
    <el-main style="padding: 10px;">
      <el-select @change="changeArea" v-if="openArea" style="margin:5px; float: left;" v-model="cArea" placeholder="请选择区">
        <el-option
          v-for="item in areaOpt"
          :key="item.id"
          :label="item.organizationname"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select @change="changeTeam" v-if="openTeam" style="margin:5px; float: left;" v-model="cTeam" placeholder="请选择小组">
        <el-option
        v-for="item in teamOpt"
        :key="item.id"
        :label="item.organizationname"
        :value="item.id">
        </el-option>
      </el-select>
      <el-button @click.native.prevent="newForm" style="margin-bottom: 5px;float: right;" type="primary">新增</el-button>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="username"
          min-width="65"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="nickname"
          min-width="65"
          label="昵称">
        </el-table-column>
        <el-table-column
          prop="courseName"
          min-width="45"
          label="垒包">
        </el-table-column>
        <el-table-column
          fixed="right"
          min-width="80"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row , false)" type="info" size="small">查看</el-button>
            <el-button style="margin: 0px" @click="handleClick(scope.row , true)" type="danger" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'MemberList',
  methods: {
    handleClick (row, isEdit) {
      this.$router.push(
        {name: 'MemberInfo',
          params: {loginname: row.loginname,
            phone: row.phone,
            username: row.username,
            isEdit: isEdit,
            courseName: row.courseName,
            gender: row.gender,
            date: row.joinchurchdate,
            userid: row.userid,
            isNew: false
          }})
    },
    newForm: function () {
      this.$router.push({name: 'MemberInfo', params: {isNew: true}})
    },
    changeArea: function () {
      this.postRequest('/org/getChildTeams',
        {
          aId: this.cArea
        }).then(resp => {
        if (resp && resp.status === 200 && resp.data.status === 'success') {
          this.$store.commit('initTeams', resp.data.data)
          this.cTeam = this.teamOpt[0].id
          this.changeTeam()
        }
      })
    },
    changeTeam: function () {
      let _this = this
      this.postRequest('/user/getMembers',
        {
          gId: this.cTeam
        }).then(resp => {
        if (resp && resp.status === 200 && resp.data.status === 'success') {
          console.log('.....123')
          this.$store.commit('initMemberList', resp.data.data)
          this.initReportList(_this.cTeam, this.$store)
          this.initReportListEdit(_this.cTeam, this.$store)
        }
      })
    }
  },
  computed: {
    tableData () {
      return this.$store.state.members
    },
    areaOpt () {
      return this.$store.state.areas
    },
    teamOpt () {
      return this.$store.state.teams
    },
    cTeam: {
      get: function () {
        return this.$store.state.cTeam
      },
      set: function (newValue) {
        this.$store.commit('setCTeam', newValue)
      }
    },
    cArea: {
      get: function () {
        return this.$store.state.cArea
      },
      set: function (newValue) {
        this.$store.commit('setCArea', newValue)
      }
    },
    openArea () {
      if (this.$store.state.rolename === '区牧') {
        return true
      } else {
        return false
      }
    },
    openTeam () {
      if (this.$store.state.rolename === '区牧' || this.$store.state.rolename === '区长') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
