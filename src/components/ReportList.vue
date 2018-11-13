<template>
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
  <el-table
    :data="tableData"
    border
    @row-click="rowClick"
    style="width: 100%">
    <el-table-column
      prop="StringID"
      min-width="120"
      label="">
    </el-table-column>
  </el-table>
  </el-main>
</template>

<script>
export default {
  name: 'ReportList',
  methods: {
    rowClick: function (row, event, column) {
      console.log(row.StringID)
      this.$router.push({name: 'ReportInfo',
        params: {reportName: row.StringID, isEdit: false}})
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
      return this.$store.state.reports
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
  },
  mounted: function () {
  }
}
</script>

<style scoped>

</style>
